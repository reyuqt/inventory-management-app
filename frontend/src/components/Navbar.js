import React, {useContext} from "react";
import {AppBar, Toolbar, Button, Typography, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {ThemeContext} from "../contexts/ThemeContext";
import {Brightness4, Brightness7} from "@mui/icons-material";

function Navbar() {
    const {mode, toggleTheme} = useContext(ThemeContext);
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/inventory">
                    Inventory
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Register
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/logout">
                    Logout
                </Button>
                <IconButton color="inherit" onClick={toggleTheme}>
                    {mode === "light" ? <Brightness4/> : <Brightness7/>}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
