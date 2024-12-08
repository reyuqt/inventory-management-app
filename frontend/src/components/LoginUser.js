import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../services/authService";
import {TextField, Button, Container, Typography, Box} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";


function LoginUser() {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.username, formData.password);
      if (response && response.access_token) {
        // Successfully logged in
        loginContext()
        localStorage.setItem("accessToken", response.access_token); // Store token
        setErrorMessage(""); // Clear error message
        navigate("/inventory"); // Redirect to inventory
      } else {
        // Handle unexpected responses
        setErrorMessage("Unexpected response. Please try again.");
      }
    } catch (error) {
      // Check if the error has a response and a status code
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password."); // Specific error message for 401
      } else {
        setErrorMessage("An error occurred. Please try again later."); // General error message
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{mt: 8, display: "flex", flexDirection: "column", gap: 2}}
      >
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <TextField
          label="Username"
          name="username"
          defaultValue="testuser"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          efaultValue="testpassword"
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




