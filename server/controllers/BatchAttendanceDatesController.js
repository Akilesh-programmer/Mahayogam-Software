const Student = require('../models/Student');
const Batch = require('../models/Batch');
const BatchAttendanceDates = require('../models/BatchAttendanceDates');

exports.updateAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    // Validate input
    if (!studentId || !date || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update student attendance
    student.attendanceSummary.push({ date, status });
    await student.save();

    // Find the batch the student belongs to
    const batch = await Batch.findOne({ students: studentId });
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    // Update the latest 5 attendance dates for the batch
    let batchAttendance = await BatchAttendanceDates.findOne({
      batch: batch._id,
    });

    if (!batchAttendance) {
      // If no record exists, create a new one
      batchAttendance = new BatchAttendanceDates({
        batch: batch._id,
        dates: [date],
      });
    } else {
      // Add new date if it's not already in the list
      if (!batchAttendance.dates.includes(date)) {
        batchAttendance.dates.push(date);
        batchAttendance.dates = batchAttendance.dates
          .sort((a, b) => new Date(b) - new Date(a)) // Sort in descending order
          .slice(0, 5); // Keep only the latest 5 dates
      }
    }

    await batchAttendance.save();

    res.status(200).json({ message: 'Attendance updated successfully!' });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};

exports.getLatestAttendanceDates = async (req, res) => {
  try {
    const { batchId } = req.params;

    const batchAttendance = await BatchAttendanceDates.findOne({
      batch: batchId,
    });

    if (!batchAttendance) {
      return res
        .status(404)
        .json({ error: 'No attendance records found for this batch' });
    }

    res.status(200).json({ latestDates: batchAttendance.dates });
  } catch (error) {
    console.error('Error fetching latest attendance dates:', error);
    res.status(500).json({ error: 'Failed to fetch attendance dates' });
  }
};
