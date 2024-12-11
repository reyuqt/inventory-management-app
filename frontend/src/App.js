import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LogoutUser from "./components/LogoutUser.jsx";
import Dashboard from "./components/Dashboard";
import {ItemsProvider} from "./contexts/ItemsContext";

function App() {
  return (
    <Router>
      <ItemsProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<LogoutUser/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </ItemsProvider>
    </Router>
  );
}

export default App;
