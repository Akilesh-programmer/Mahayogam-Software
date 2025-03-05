import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus, FaMicrophone } from 'react-icons/fa';
import AdminHomeImage from '../assets/images/AdminHomeImage.png';

const AdminBatches = () => {
  const { city } = useParams(); // Get city from URL
  const navigate = useNavigate(); // For navigation
  const [search, setSearch] = useState('');

  // List of batches (For now, dummy data with numbers)
  const batches = [
    { id: 1, number: '101' },
    { id: 2, number: '102' },
    { id: 3, number: '103' },
    { id: 4, number: '104' },
  ];

  return (
    <div className="h-screen flex flex-col items-center px-4 py-8 md:hidden">
      {/* Logo Image */}
      <img src={AdminHomeImage} alt="Logo" className="w-80 h-auto mb-6" />

      {/* Enhanced City Title with Added Spacing */}
      <h2 className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text mb-8">
        Batches in {city}
      </h2>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search batch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-12 text-black border border-gray-300 bg-white rounded-full shadow-md focus:outline-none text-lg"
        />
        {/* Search Icon */}
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
          🔍
        </span>
        {/* Microphone Icon */}
        <FaMicrophone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 text-lg cursor-pointer" />
      </div>

      {/* Batch List */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {batches
          .filter((batch) => batch.number.includes(search))
          .map((batch) => (
            <button
              key={batch.id}
              onClick={() => navigate(`/admin-attendance/${batch.number}`)}
              className="w-full py-3 bg-white text-black rounded-lg shadow-md text-lg font-semibold hover:bg-gray-100 transition"
            >
              Batch {batch.number}
            </button>
          ))}
      </div>

      {/* Add New Batch Button */}
      <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition">
        <FaPlus /> Add New Batch
      </button>
    </div>
  );
};

export default AdminBatches;
