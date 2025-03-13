import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import API from '../api/axiosInstance.js';

const BatchAttendanceSummary = () => {
  const { batchId, batchName } = useParams();
  const [latestDates, setLatestDates] = useState([]);
  const [students, setStudents] = useState([]);

  console.log(batchId, batchName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datesRes = await API.get(`/api/dates/${batchId}`);
        console.log('Latest Dates API Response:', datesRes.data);

        // Ensure dates are properly formatted (YYYY-MM-DD)
        const formattedDates = datesRes.data.latestDates.map(
          (date) => new Date(date).toISOString().split('T')[0]
        );

        setLatestDates(formattedDates);

        const studentsRes = await API.get(`/api/batches/students/${batchId}`);
        console.log('Students API Response:', studentsRes.data);
        setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [batchId]);

  return (
    <div className="p-6">
      {/* Centered and Styled Heading with Batch Name */}
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Attendance Summary of
      </h2>
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
        {batchName}
      </h2>

      {students.length === 0 ? (
        <p className="text-red-500 text-center text-lg">
          No students found in this batch or no Attendance Record found in this batch.
        </p>
      ) : (
        <div className="relative w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="p-3 text-left sticky left-0 bg-blue-500">
                    Student Name
                  </th>
                  {latestDates.map((date) => (
                    <th key={date} className="p-3 text-center">
                      {new Date(date).toLocaleDateString()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student._id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    {/* Sticky Student Name Column */}
                    <td className="p-3 border border-gray-200 sticky left-0 bg-white font-semibold">
                      {student.name}
                    </td>
                    {latestDates.map((date) => {
                      const attendance = student.attendanceSummary?.find(
                        (att) =>
                          new Date(att.date).toISOString().split('T')[0] ===
                          date
                      );

                      return (
                        <td
                          key={date}
                          className="p-3 border border-gray-200 text-center"
                        >
                          {attendance ? (
                            attendance.status.toLowerCase() === 'present' ? (
                              <FaCheckCircle className="text-green-500 text-xl mx-auto" />
                            ) : (
                              <FaTimesCircle className="text-red-500 text-xl mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchAttendanceSummary;
