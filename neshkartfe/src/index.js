import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Q3CwaBFx1kYifsYu4lW1RSLOr1siIXmTwqNH6kNOIkApsNybIoXgYYpbGAipngLZ1T6koWROhtlcHJyx03KJKay00FYulYgqk")

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

      <React.StrictMode>

        <Elements stripe={stripePromise}> 
          <SearchProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SearchProvider>

        </Elements>


  </React.StrictMode>

);

