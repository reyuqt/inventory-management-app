import React, {useContext, useRef, useState} from "react";
import {AppBar, Toolbar, Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ThemeContext} from "../contexts/ThemeContext";
import {useAuth} from "../contexts/AuthContext";
import SearchBar from "./SearchBar";
import HomeButton from "./buttons/HomeButton";
import RegisterButton from "./buttons/RegisterButton";
import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import ThemeToggleButton from "./buttons/ThemeToggleButton";
import ScannerControl from './ScannerControl';
import SpeedDialMenu from './SpeedDialMenu';
import {searchItems} from '../services/searchService'; // Import the search service

function Navbar() {
  const [searchResults, setSearchResults] = useState([]);

  const {mode, toggleTheme} = useContext(ThemeContext);
  const {isLoggedIn} = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const searchInputRef = useRef(null);  // Ref for SearchBar input
  const scannerControlRef = useRef(null);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }


    try {
      const response = await searchItems(query);
      setSearchResults(response.data);
      console.log(searchResults)
    } catch (err) {
      console.error(err);
    } finally {
      console.log('finally')
    }
  };
  const handleScanClick = () => {
    if (scannerControlRef.current) {
      scannerControlRef.current.startScanner();
    }
  };

  const handleScanResult = (result) => {
    console.log('Scanned Result:', result);
    // Set the scanned result into the SearchBar input
    if (searchInputRef.current) {
      searchInputRef.current.value = result;    // Set the input's value
      searchInputRef.current.focus();           // Optionally focus the input
    }
  };

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <SearchBar ref={searchInputRef} onSearch={handleSearch}/> {/* This ref refers to the actual input element inside SearchBar */}
          <Box sx={{flexGrow: 1}}/>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <HomeButton isMobile={isMobile}/>
            <RegisterButton isMobile={isMobile} isLoggedIn={isLoggedIn}/>
            <LoginButton isMobile={isMobile} isLoggedIn={isLoggedIn}/>
            <LogoutButton isMobile={isMobile} isLoggedIn={isLoggedIn}/>
            <ThemeToggleButton mode={mode} toggleTheme={toggleTheme}/>
          </Box>
        </Toolbar>
      </AppBar>
      <SpeedDialMenu onSearchClick={handleSearchFocus} onScanClick={handleScanClick}/>
      <ScannerControl ref={scannerControlRef} onScanResult={handleScanResult}/>
    </div>
  );
}

export default Navbar;
