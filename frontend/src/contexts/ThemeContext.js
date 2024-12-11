import React, { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const getInitialMode = () => {
    const savedMode = localStorage.getItem("theme");
    return savedMode ? savedMode : "light";
  };

  const [mode, setMode] = useState(getInitialMode);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#0d1117", // Background for the whole page
                  paper: "#161b22",  // Background for cards or surfaces
                },
                text: {
                  primary: "#c9d1d9",  // Primary text
                  secondary: "#8b949e", // Secondary text
                },
                primary: {
                  main: "#58a6ff",  // Accent color
                },
                divider: "#30363d",  // Divider and border colors
              }
            : {
                // Light theme (default Material-UI colors)
                background: {
                  default: "#ffffff",
                  paper: "#f5f5f5",
                },
                text: {
                  primary: "#000000",
                  secondary: "#4d4d4d",
                },
              }),
        },
        typography: {
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        },
        spacing: 8, // Default spacing unit
      }),
    [mode]
  );

  useEffect(() => {
    const savedMode = getInitialMode();
    setMode(savedMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
