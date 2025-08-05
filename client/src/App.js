import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/feed" element = {<Feed/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/login" element = {<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
