import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

function ProtectedRoute({ children }) {
  //const token = localStorage.getItem("accessToken");
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
