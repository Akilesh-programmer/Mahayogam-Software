import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("jwtToken"); // Check if user is logged in

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
