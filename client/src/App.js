import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/login" element = {<Login/>} />

        {/* protected routes */}
        <Route path="/feed" element = {
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
  );
}

export default App;
