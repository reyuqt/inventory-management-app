import React, { useContext, useRef } from "react";
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
import SpeedDialMenu from "./SpeedDialMenu";
function Navbar() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const searchInputRef = useRef(null);  // Declaring the ref

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();  // Focus the input when called
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <SearchBar ref={searchInputRef} />  {/* Pass the ref here */}
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
      <SpeedDialMenu onSearchClick={handleSearchFocus} />  {/* Pass the callback */}
    </div>
  );
}

export default Navbar;