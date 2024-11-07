import React from "react";
import ReactDOM from "react-dom/client"; // React 18 API
import "./styles.css"; // Your CSS styles
import WeatherApp from "./App"; // Import the WeatherApp component

const root = ReactDOM.createRoot(document.getElementById("root")!); // Creating the root using React 18 API

root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);
