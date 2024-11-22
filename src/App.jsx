// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import "bootstrap/dist/css/bootstrap.min.css";
import ShiftSchedule from './pages/ShiftSchedule';

const App = () => {
  const isAuthenticated = () => {
    // Kiểm tra token trong localStorage
    return localStorage.getItem('access_token') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/shiftschedule"
          element={isAuthenticated() ? <ShiftSchedule /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
