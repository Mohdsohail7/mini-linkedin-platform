import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <route path = "/register" element = {<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
