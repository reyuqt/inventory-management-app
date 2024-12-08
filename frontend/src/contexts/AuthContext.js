import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// @TODO Extremely insecure, ok for testing, but add more security
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedState = localStorage.getItem("isLoggedIn");
    return storedState === "true";
  });


  const loginContext = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    // Optionally set accessToken here
    // localStorage.setItem("accessToken", "your-token");
  };

  const logoutContext = () => {
    console.log("Logout context called");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("accessToken");
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
