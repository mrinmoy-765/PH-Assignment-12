import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router, RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/Authprovider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
