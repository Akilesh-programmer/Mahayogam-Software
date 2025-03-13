import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, PlusCircle, Eye } from 'lucide-react';
import axios from 'axios';
import Logo from '../assets/images/AdminHomeImage.png';
import API from '../api/axiosInstance';
import * as XLSX from 'xlsx';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminAttendancePage = () => {
  const { batchNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const batchName = location.state?.batchName || 'Batch';
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [showBulkAddForm, setShowBulkAddForm] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    API.get(`${VITE_API_BASE_URL}/api/students/batch/${batchNumber}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        const today_date = new Date();
        const formattedDate = `${today_date.getFullYear()}-${(
          today_date.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${today_date
          .getDate()
          .toString()
          .padStart(2, '0')}`;
        const today = formattedDate;

        const updatedStudents = response.data.map((student) => {
          const todayAttendance = student.attendanceSummary?.find(
            (att) => att.date === today
          );
          return {
            ...student,
            status: todayAttendance ? todayAttendance.status : null,
          };
        });
        setStudents(updatedStudents);
      })
      .catch((error) => console.error('Error fetching students:', error));
  }, [batchNumber, showForm, showBulkAddForm]);

  const toggleAttendance = async (studentId, status) => {
    try {
      await API.patch(
        `/api/students/${studentId}`, // Assuming this is the correct API endpoint
        { status } // Sending only required data
      );

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId ? { ...student, status } : student
        )
      );
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const handleCreate = async () => {
    if (!name || !age || !gender) {
      alert('Please enter both name, age and gender.');
      return;
    }
    try {
      const response = await API.post(`/api/students/`, {
        batchId: batchNumber,
        name,
        age,
        gender,
      });
      if (response.status == 201) {
        setShowForm(false);
        setName('');
        setAge('');
        setGender('');
      } else {
        alert('Failed to add student.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while adding student.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(''); // Reset if no file is chosen
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = async (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const formattedData = jsonData.map((student) => ({
          name: student.Name || '', // Ensure it matches column names in Excel
          age: student.Age || 0,
          gender: student.Gender || '',
        }));

        await API.post(`/api/students/bulk-add`, {
          batchId: batchNumber,
          studentsData: formattedData,
        });

        alert('Students uploaded successfully!');
      } catch (error) {
        console.error('Error processing file:', error);
        alert('Failed to upload students.');
      }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 flex flex-col items-center px-6 py-8">
      <img src={Logo} alt="Mahayogam" className="w-80 h-auto mb-4" />
      <h1 className="text-2xl font-bold text-center text-gray-800 mt-4 mb-6">
        ATTENDANCE - {batchName}
      </h1>
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-12 text-black border border-gray-300 bg-white rounded-full shadow-md focus:outline-none text-lg"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
          🔍
        </span>
      </div>
      <div className="flex gap-1">
        <button
          className="w-48 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600"
          onClick={() => setShowForm(!showForm)}
        >
          <PlusCircle size={20} /> Add Student
        </button>
        <button
          className="w-48 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600"
          onClick={() => setShowBulkAddForm(!showBulkAddForm)}
        >
          <PlusCircle size={20} /> Bulk Add
        </button>
      </div>

      {showBulkAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-2">Import Details</h2>
            <p className="text-sm text-gray-600 mb-4">
              Upload Excel files (.xlsx or .xls)
            </p>

            {/* Choose File Button */}
            <label className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer text-center mb-4 hover:bg-blue-600">
              Choose File
              <input
                type="file"
                className="hidden"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
            </label>
            {fileName && (
              <span className="block text-center text-gray-700 font-medium">
                Selected file: {fileName}
              </span>
            )}
            <button
              onClick={handleUpload}
              className="block w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4"
            >
              Upload
            </button>
            <a
              href="/Sample.xlsx"
              download="Sample.xlsx"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-4 text-center block"
            >
              Download Sample File
            </a>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                onClick={() => setShowBulkAddForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setShowBulkAddForm(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-4 mb-8 mt-2 rounded-lg shadow-md w-80 ">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-3"
          />
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-3"
          />
          <input
            type="test"
            placeholder="Enter gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-3"
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-w-md">
        {students
          .filter((student) =>
            student.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((student) => (
            <div
              key={student._id}
              className="flex justify-between items-center bg-red-600 text-white text-lg px-4 py-3 my-2 rounded-lg shadow-md gap-2"
            >
              <span className="w-1/3">{student.name}</span>
              <div className="flex gap-2 items-center w-2/3 justify-end">
                <button
                  onClick={() => toggleAttendance(student._id, 'Present')}
                >
                  <CheckCircle
                    size={26}
                    className={
                      student.status === 'Present'
                        ? 'text-green-500'
                        : 'text-white'
                    }
                  />
                </button>
                <button onClick={() => toggleAttendance(student._id, 'Absent')}>
                  <XCircle
                    size={26}
                    className={
                      student.status === 'Absent'
                        ? 'text-white'
                        : 'text-red-300 hover:text-red-500'
                    }
                  />
                </button>
                {student.status && (
                  <span
                    className={`font-bold px-3 py-1 rounded text-sm ${
                      student.status === 'Present'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    } cursor-pointer`}
                    onClick={() =>
                      toggleAttendance(student._id, student.status)
                    }
                  >
                    {student.status}
                  </span>
                )}
                <button
                  onClick={() =>
                    navigate(`/student-details/${student._id}`, {
                      state: { studentName: student.name },
                    })
                  }
                >
                  <Eye size={26} className="text-white hover:text-gray-300" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminAttendancePage;
