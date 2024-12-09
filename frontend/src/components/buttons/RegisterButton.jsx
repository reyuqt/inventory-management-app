import React from 'react';
import { Button, IconButton } from '@mui/material';
import { PersonAdd as RegisterIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const RegisterButton = ({ isMobile }) => (
  isMobile ? (
    <IconButton color="inherit" component={Link} to="/register">
      <RegisterIcon />
    </IconButton>
  ) : (
    <Button color="inherit" component={Link} to="/register">Register</Button>
  )
);

export default RegisterButton;