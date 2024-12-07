import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Login Route */}
      </Routes>
    </Router>
  );
}
export default App;
