import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggleButton = ({ mode, toggleTheme }) => (
  <IconButton color="inherit" onClick={toggleTheme}>
    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
  </IconButton>
);

export default ThemeToggleButton;