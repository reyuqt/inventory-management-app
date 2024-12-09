// Import statements
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

// Functional Component: LoginUser
function LoginUser() {
  // State for form data and error messages
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Hooks
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await login(formData.username, formData.password);
      if (response && response.access_token) {
        loginContext(); // Update auth context
        localStorage.setItem("accessToken", response.access_token);
        setErrorMessage(""); // Clear any previous errors
        navigate("/inventory"); // Redirect on successful login
      } else {
        setErrorMessage("Unexpected response. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  // Component render
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 8, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h4" align="center">Login</Typography>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default LoginUser;