import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the stored token on logout
    localStorage.removeItem("accessToken");
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
