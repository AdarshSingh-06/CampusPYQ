import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./style/style.css";
import "./style/navbar.css";
import "./style/home.css";
import "./style/card.css";
import "./style/dashboard.css";
import "./style/footer.css";
import "./style/main.css";
import "./style/sidebar.css";
import "./style/topbar.css";
import "./style/login.css";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);