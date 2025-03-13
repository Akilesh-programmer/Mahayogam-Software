import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import AdminHomeImage from '../assets/images/AdminHomeImage.png';
import API from '../api/axiosInstance';
import { Eye } from 'lucide-react';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminBatches = () => {
  const { city: cityId } = useParams(); // Get city ID from URL
  const location = useLocation();
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]); // Store fetched batches
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [batchName, setBatchName] = useState(''); // New batch name

  // Retrieve the city name from state (passed from AdminCities)
  const cityName = location.state?.place || 'Unknown City';

  // Fetch batches from API
  const fetchBatches = async () => {
    try {
      const response = await API.get(`/api/batches/${cityId}`);
      setBatches(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, [cityId]);

  // Function to create a new batch
  const handleCreateBatch = async () => {
    if (!batchName.trim()) return;

    try {
      await API.post('/api/batches', {
        placeId: cityId,
        name: batchName,
      });

      setBatchName(''); // Clear input
      setShowModal(false); // Close modal
      fetchBatches(); // Reload batches
    } catch (error) {
      if (error.response.status === 500) {
        alert('Duplicate entires are not allowed');
        return;
      }
      console.error(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center px-4 py-8 md:hidden relative">
      <img src={AdminHomeImage} alt="Logo" className="w-80 h-auto mb-6" />
      {/* Display city name */}
      <h2 className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text mb-8">
        Batches in {cityName}
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
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
          🔍
        </span>
      </div>
      {/* Batch List */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {batches
          .filter((batch) =>
            batch.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((batch) => (
            <button
              key={batch._id}
              onClick={() =>
                navigate(`/admin-attendance/${batch._id}`, {
                  state: { batchName: batch.name },
                })
              }
              className="w-full py-3 px-6 bg-yellow-950 text-white rounded-lg shadow-md text-lg font-semibold flex items-center justify-between hover:bg-gray-100 transition"
            >
              <span className="flex-1 text-center">{batch.name}</span>
              <Eye
                size={20}
                className="text-white group-hover:text-yellow-950 transition ml-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering button click
                  navigate(
                    `/batch-attendance-summary/${
                      batch._id
                    }/${encodeURIComponent(batch.name)}`
                  ); // Navigates to another page
                }}
              />
            </button>
          ))}
      </div>
      {/* Add New Batch Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
      >
        <FaPlus /> Add New Batch
      </button>
      {/* Add Batch Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white/95 rounded-lg p-6 w-96 shadow-lg mx-4 border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Create New Batch
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setBatchName(''); // Clear input on cancel
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter batch name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setBatchName(''); // Clear input on cancel
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBatch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBatches;
