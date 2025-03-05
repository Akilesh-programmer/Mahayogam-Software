import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminCities from './pages/AdminCities';
import AdminBatches from './pages/AdminBatches';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-cities" element={<AdminCities />} />
        <Route path="/admin/batches/:city" element={<AdminBatches />} />
      </Routes>
    </Router>
  );
}

export default App;
