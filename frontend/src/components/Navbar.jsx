import React, { useContext } from "react";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import SearchBar from "./SearchBar";
import HomeButton from "./buttons/HomeButton";
import RegisterButton from "./buttons/RegisterButton";
import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import ThemeToggleButton from "./buttons/ThemeToggleButton";

function Navbar() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        <SearchBar />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeButton isMobile={isMobile} />
          <RegisterButton isMobile={isMobile} isLoggedIn={isLoggedIn} />
          <LoginButton isMobile={isMobile} isLoggedIn={isLoggedIn} />
          <LogoutButton isMobile={isMobile} isLoggedIn={isLoggedIn} />
          <ThemeToggleButton mode={mode} toggleTheme={toggleTheme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;