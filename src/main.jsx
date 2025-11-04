import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/_reset.css";
import "./styles/_tokens.css";
import "./styles/_utilities.css";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);