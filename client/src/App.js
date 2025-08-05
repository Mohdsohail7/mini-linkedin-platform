import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <ToastContainer position="top-center" />
      <Routes>
        {/* public routes */}
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/login" element = {<Login/>} />

        {/* protected routes */}
        <Route path="/" element = {
          <ProtectedRoute>
            <Feed/>
          </ProtectedRoute>
        } />
        <Route path="/profile/:id" element = {
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
