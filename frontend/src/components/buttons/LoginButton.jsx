import React from 'react';
import { Button, IconButton } from '@mui/material';
import { LockOpen as LoginIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const LoginButton = ({ isMobile, isLoggedIn }) => (
  !isLoggedIn ? (
    isMobile ? (
      <IconButton color="inherit" component={Link} to="/login">
        <LoginIcon />
      </IconButton>
    ) : (
      <Button color="inherit" component={Link} to="/login">Login</Button>
    )
  ) : (
    isMobile ? (
      <IconButton color="inherit" component={Link} to="/logout">
        <LogoutIcon />
      </IconButton>
    ) : (
      <Button color="inherit" component={Link} to="/logout">Logout</Button>
    )
  )
);

export default LoginButton;