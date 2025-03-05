import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, PlusCircle, Eye } from 'lucide-react';
import Logo from '../assets/images/AdminHomeImage.png';
import { useNavigate } from 'react-router-dom';

const AdminAttendancePage = () => {
  const { batchNumber } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([
    { name: 'Praveen', status: null },
    { name: 'Surya', status: null },
    { name: 'Srinisha', status: null },
    { name: 'Manish', status: null },
    { name: 'Kavin Kumar', status: null },
    { name: 'Vijay', status: null },
    { name: 'Karthick', status: null },
  ]);

  // Function to mark attendance
  const markAttendance = (name, status) => {
    setStudents(
      students.map((student) =>
        student.name === name ? { ...student, status } : student
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 flex flex-col items-center px-6 py-8">
      {/* Logo */}
      <img src={Logo} alt="Mahayogam" className="w-80 h-auto mb-4" />

      {/* Batch Name */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-6">
        {`ATTENDANCE - Batch ${batchNumber}`}
      </h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-12 text-black border border-gray-300 bg-white rounded-full shadow-md focus:outline-none text-lg"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          🔍
        </span>
      </div>

      {/* Add Student Button */}
      <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 mb-6">
        <PlusCircle size={20} /> Add Student
      </button>

      {/* Student List */}
      <div className="w-full max-w-md">
        {students
          .filter((student) =>
            student.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((student, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-red-600 text-white text-lg px-4 py-3 my-2 rounded-lg shadow-md whitespace-nowrap gap-2"
            >
              <span className="w-1/3">{student.name}</span>
              <div className="flex gap-2 items-center w-2/3 justify-end">
                <button onClick={() => markAttendance(student.name, 'Present')}>
                  <CheckCircle size={26} className="text-green-400" />
                </button>
                <button onClick={() => markAttendance(student.name, 'Absent')}>
                  <XCircle
                    size={26}
                    className="text-red-300 hover:text-red-500 transition-colors"
                  />
                </button>

                {/* Attendance Status */}
                {student.status && (
                  <span
                    className={`font-bold whitespace-nowrap ${
                      student.status === 'Present'
                        ? 'text-green-400'
                        : 'text-red-500'
                    }`}
                  >
                    {student.status === 'Present' ? '✅ Present' : '❌ Absent'}
                  </span>
                )}

                {/* View Student Details Button */}
                <button
                  onClick={() => navigate(`/student-details/${student.name}`)}
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
