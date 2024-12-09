import React from 'react';
import { Button, IconButton } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomeButton = ({ isMobile }) => (
  isMobile ? (
    <IconButton color="inherit" component={Link} to="/">
      <HomeIcon />
    </IconButton>
  ) : (
    <Button color="inherit" component={Link} to="/">Home</Button>
  )
);

export default HomeButton;