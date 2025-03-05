import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminCities from './pages/AdminCities';
import AdminBatches from './pages/AdminBatches';
import AdminAttendancePage from './pages/AdminAttendancePage';
import StudentDetails from './pages/StudentDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-cities" element={<AdminCities />} />
        <Route path="/admin/batches/:city" element={<AdminBatches />} />
        <Route
          path="/admin-attendance/:batchNumber"
          element={<AdminAttendancePage />}
        />
        <Route path="/student-details/:studentName" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
