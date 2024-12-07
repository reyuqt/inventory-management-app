import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./components/Logout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Default blue color
    },
    secondary: {
      main: "#dc004e", // Pink color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
