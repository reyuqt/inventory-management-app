import React from 'react';
import { Button, IconButton } from '@mui/material';
import { ExitToApp as LogoutIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const LogoutButton = ({ isMobile }) => (
  isMobile ? (
    <IconButton color="inherit" component={Link} to="/logout">
      <LogoutIcon />
    </IconButton>
  ) : (
    <Button color="inherit" component={Link} to="/logout">Logout</Button>
  )
);

export default LogoutButton;