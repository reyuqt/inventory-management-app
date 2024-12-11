import React from 'react';
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dashboard as DashboardIcon } from '@mui/icons-material';


function DashboardButton({ isMobile, isLoggedIn }) {
  return (
    isLoggedIn && (isMobile ? (
      <IconButton color="inherit" component={Link} to="/dashboard">
        <DashboardIcon />
      </IconButton>
    ) : (
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
    ))
  );
}

export default DashboardButton;
