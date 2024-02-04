import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./css/index.css";
import routes from "./router";

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
