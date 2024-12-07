import React from "react";
import RegisterUser from "../components/RegisterUser";
import { Container, Typography, Box } from "@mui/material";

function Register() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register Page
        </Typography>
        <Typography variant="subtitle1">
          Create a new account to get started.
        </Typography>
      </Box>
      <RegisterUser />
    </Container>
  );
}

export default Register;
