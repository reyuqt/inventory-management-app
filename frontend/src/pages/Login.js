
import React from "react";
import LoginUser from "../components/LoginUser.jsx";
import { Container } from "@mui/material";

function Login() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <LoginUser />
    </Container>
  );
}

export default Login;
