import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router, RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
