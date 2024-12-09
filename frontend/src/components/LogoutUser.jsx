import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

function LogoutUser() {
  const navigate = useNavigate();
  const { logoutContext } = useAuth();
  useEffect(() => {
    logoutContext()
    // Clear the stored token on logout
    localStorage.removeItem("accessToken");
    navigate("/login"); // Redirect to login page
  }, [navigate, logoutContext]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default LogoutUser;
