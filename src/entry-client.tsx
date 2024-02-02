import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Router from "./router";

import "./css/index.css";

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
);
