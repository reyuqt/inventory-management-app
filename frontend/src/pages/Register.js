import React from "react";
import RegisterUser from "../components/RegisterUser.jsx";
import { Container } from "@mui/material";

function Register() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <RegisterUser />
    </Container>
  );
}

export default Register;
