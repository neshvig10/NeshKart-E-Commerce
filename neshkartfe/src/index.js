import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

      <React.StrictMode>
        <SearchProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </SearchProvider>

  </React.StrictMode>

);

