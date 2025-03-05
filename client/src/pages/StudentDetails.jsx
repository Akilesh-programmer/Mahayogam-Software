import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
 // For tick mark icon
import Logo from '../assets/images/AdminHomeImage.png';

const StudentDetails = () => {
  const { studentName } = useParams(); // Get student name from URL parameters

  // Dummy data for fee status and attendance
  const [studentData, setStudentData] = useState([
    { month: 'March', feeStatus: 'Paid', attendance: '92%' },
    { month: 'Feb', feeStatus: 'Unpaid', attendance: '85%' },
    { month: 'Jan', feeStatus: 'Paid', attendance: '90%' },
    { month: 'Dec', feeStatus: 'Unpaid', attendance: '78%' },
  ]);

  // Function to toggle fee status from "Unpaid" to "Paid"
  const toggleFeeStatus = (index) => {
    setStudentData((prevData) =>
      prevData.map((item, i) =>
        i === index && item.feeStatus === 'Unpaid'
          ? { ...item, feeStatus: 'Paid' }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 flex flex-col items-center px-6 py-8">
      {/* Logo */}
      <img src={Logo} alt="Mahayogam" className="w-80 h-auto mb-4" />

      {/* Student Image */}
      <img
        src="https://i.pravatar.cc/150?img=10"
        alt={studentName}
        className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-2 object-cover"
      />

      {/* Student Name */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{studentName}</h2>

      {/* Table Container with Updated Background */}
      <div className="w-full max-w-md bg-red-700 text-white shadow-lg rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-3 text-lg font-bold bg-gray-900 py-3 px-4">
          <span className="text-center">Month</span>
          <span className="text-center">Fee Status</span>
          <span className="text-center">Attendance</span>
        </div>

        {/* Student Data Rows */}
        {studentData.map((data, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center text-lg border-b border-gray-300 py-3 px-4"
          >
            {/* Month */}
            <span className="text-center">{data.month}</span>

            {/* Fee Status with Tick Mark for "Unpaid" */}
            <span className="flex justify-center items-center space-x-2">
              <span
                className={`text-sm font-bold py-1 px-3 rounded-lg ${
                  data.feeStatus === 'Paid'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {data.feeStatus}
              </span>

              {data.feeStatus === 'Unpaid' && (
                <CheckIcon
                  className="w-6 h-6 text-white cursor-pointer"
                  onClick={() => toggleFeeStatus(index)}
                />
              )}
            </span>

            {/* Attendance */}
            <span className="text-center font-semibold">{data.attendance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
