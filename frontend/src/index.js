import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {CustomThemeProvider} from "./contexts/ThemeContext"; // Use the ThemeContext provider
import {AuthProvider} from "./contexts/AuthContext";

//import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <AuthProvider>
          <App/>
      </AuthProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);
//reportWebVitals(console.log);
