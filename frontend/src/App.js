import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import { Navigate } from "react-router-dom";


// Add a route for the registration page
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />}  />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
