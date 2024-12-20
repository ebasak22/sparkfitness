import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OtpLoginPage from './pages/OtpLoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import DefaultPage from './pages/DefaultPage';
import PhoneAuthPage from './pages/PhoneAuthPage'; // Import the new PhoneAuthPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OtpLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/defaultpage" element={<DefaultPage />} />
        <Route path="/phone-auth" element={<PhoneAuthPage />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
