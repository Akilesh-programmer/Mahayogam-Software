import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Install using: npm install jwt-decode

const ProtectedRoute = () => {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem('jwtToken'); // Token expired, remove it
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    localStorage.removeItem('jwtToken'); // Invalid token, remove it
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
