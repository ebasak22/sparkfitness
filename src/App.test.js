import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import NotificationPage from './pages/NotificationPage';
import DefaultPage from './pages/DefaultPage';
import Dashboard from './pages/Dashboard';
import AboutGym from './pages/AboutGym';
import AboutTrainers from './pages/AboutTrainers';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/about-gym" element={<AboutGym />} />
        <Route path="/about-trainers" element={<AboutTrainers />} />
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
        {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
