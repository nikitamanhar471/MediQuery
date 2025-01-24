import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot instead of ReactDOM
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Get the root element
const container = document.getElementById("root");

// Create a root and render the app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: report performance
reportWebVitals();
