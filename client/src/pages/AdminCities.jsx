import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMicrophone } from 'react-icons/fa';
import AdminHomeImage from '../assets/images/AdminHomeImage.png';

const AdminCities = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // List of cities
  const cities = ['Coimbatore', 'Erode', 'Salem', 'Tiruppur'];

  // Function to handle city selection
  const handleCityClick = (city) => {
    navigate(`/admin/batches/${city}`);
  };

  return (
    <div className="h-screen flex flex-col items-center px-4 py-8 md:hidden">
      {/* Logo Image */}
      <img src={AdminHomeImage} alt="Logo" className="w-80 h-auto mb-6" />

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search city..."
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

      {/* City List */}
      <div className="w-full max-w-md flex flex-col gap-5">
        {cities
          .filter((city) => city.toLowerCase().includes(search.toLowerCase()))
          .map((city, index) => (
            <button
              key={index}
              onClick={() => handleCityClick(city)}
              className="w-full py-4 bg-white text-black rounded-lg shadow-md text-lg font-semibold hover:bg-gray-100 transition"
            >
              {city}
            </button>
          ))}
      </div>

      {/* Add New Button */}
      <button className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition">
        <FaPlus /> Add New
      </button>
    </div>
  );
};

export default AdminCities;
