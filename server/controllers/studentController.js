const mongoose = require('mongoose');
const Student = require('../models/Student');
const Batch = require('../models/Batch');
const BatchAttendanceSummary = require('../models/BatchAttendanceDates');

exports.getStudentsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const today = new Date().toISOString().split('T')[0];

    const batch = await Batch.findById(batchId).populate('students');
    if (!batch) return res.status(404).json({ error: 'Batch not found' });

    const studentsWithAttendance = batch.students.map((student) => {
      const todayAttendance = student.attendanceSummary.find(
        (att) => att.date.toISOString().split('T')[0] === today
      );

      return {
        ...student._doc,
        todayAttendance: todayAttendance
          ? todayAttendance.status
          : 'Not Marked',
      };
    });

    res.status(200).json(studentsWithAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).lean();

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ error: 'Error fetching student details' });
  }
};

exports.updateStudent = async (req, res) => {
  const { studentId } = req.params; // Extract student ID from URL
  const { status, batchNumber } = req.body; // Extract date & status from request body
  console.log(batchNumber);

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Ensure date format is consistent
    const today_date = new Date("2025-03-13");
    const formattedDate = `${today_date.getFullYear()}-${(
      today_date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${today_date.getDate().toString().padStart(2, '0')}`;

    // Check if attendance for this date already exists
    const existingAttendanceIndex = student.attendanceSummary.findIndex(
      (att) => att.date.toISOString().split('T')[0] === formattedDate
    );

    if (existingAttendanceIndex !== -1) {
      // Update existing attendance entry
      student.attendanceSummary[existingAttendanceIndex].status = status;
    } else {
      // Add new attendance entry
      student.attendanceSummary.push({ date: formattedDate, status });
    }

    await student.save(); // Save changes

    // ✅ Fetch BatchAttendanceSummary using batchNumber
    let batchSummary = await BatchAttendanceSummary.findOne({
      batch: batchNumber,
    });

    if (!batchSummary) {
      batchSummary = new BatchAttendanceSummary({
        batch: batchNumber,
        dates: [today_date], // ✅ Store Date object, not string
      });
      console.log('Creating new batch entry with date:', today_date);
    } else {
      if (!Array.isArray(batchSummary.dates)) {
        batchSummary.dates = [];
      }

      console.log('Existing Dates Before Update:', batchSummary.dates);

      // ✅ Convert all stored dates to 'YYYY-MM-DD' for checking
      const storedDates = batchSummary.dates.map(
        (date) => date.toISOString().split('T')[0]
      );

      if (!storedDates.includes(formattedDate)) {
        batchSummary.dates.unshift(today_date); // ✅ Store Date object, not string
        batchSummary.dates = batchSummary.dates.slice(0, 5);
        console.log('Updated Dates Array:', batchSummary.dates);
      }
    }

    await batchSummary.save();

    return res
      .status(200)
      .json({ message: 'Attendance updated successfully', student });
  } catch (error) {
    console.error('Error updating attendance:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateFeeStatus = async (req, res) => {
  const { studentId } = req.params;
  let { month, year, status } = req.body; // Get month, year, and new status

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    month = parseInt(month, 10);
    month = Number(month);
    year = Number(year);

    // Find existing fee record for the given month & year
    const existingFee = student.feeRecords.find(
      (record) => Number(record.month) === month && Number(record.year) === year
    );

    if (existingFee) {
      // ✅ Update the status if record exists
      existingFee.status = status;
    } else {
      // ✅ Add a new record only if it doesn't exist
      student.feeRecords.push({ month, year, status, amountPaid: 0 }); // Default amountPaid to 0 if not provided
    }

    await student.save(); // Save changes

    return res
      .status(200)
      .json({ message: 'Fee status updated successfully', student });
  } catch (error) {
    console.error('Error updating fee status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { batchId, name, age, gender } = req.body;
    const batch = await Batch.findById(batchId);
    if (!batch) return res.status(404).json({ error: 'Batch not found' });

    const newStudent = new Student({ name, age, gender, batch: batchId });
    await newStudent.save();

    batch.students.push(newStudent._id);
    await batch.save();

    res
      .status(201)
      .json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ error: 'Error adding student' });
  }
};

exports.bulkAdd = async (req, res) => {
  try {
    const { batchId, studentsData } = req.body;

    const formattedStudents = studentsData.map((student) => ({
      name: student.name,
      age: student.age,
      gender: student.gender,
      profile: student.profile || undefined,
      attendanceSummary: [],
      feeRecords: [],
    }));

    const insertedStudents = await Student.insertMany(formattedStudents);
    const studentIds = insertedStudents.map((student) => student._id);

    await Batch.findByIdAndUpdate(batchId, {
      $push: { students: { $each: studentIds } },
    });
    res.status(201).json({ message: 'Students added successfully!' });
  } catch (error) {
    console.error('Error uploading students:', error);
    res.status(500).json({ error: 'Failed to upload students' });
  }
};
