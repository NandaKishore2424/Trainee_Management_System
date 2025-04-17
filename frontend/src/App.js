import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';
import TraineeDetails from './components/TraineeDetails';
import TraineeForm from './components/TraineeForm';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar currentUser={currentUser} logOut={logOut} />
        <div className="py-6">
          <Routes>
            {/* Root path redirects to home when logged in, login when not */}
            <Route path="/" element={<LandingPage />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes - no role checks, just authenticated */}
            <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/trainees" element={currentUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/add-trainee" element={currentUser ? <TraineeForm /> : <Navigate to="/login" />} />
            <Route path="/trainees/:id" element={currentUser ? <TraineeDetails /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
