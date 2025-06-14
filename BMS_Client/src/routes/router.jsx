import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Registration from "../pages/Authentication/Registration";
import LogIn from "../pages/Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/signUp",
    element: <Registration></Registration>,
  },
  {
    path: "/signIn",
    element: <LogIn></LogIn>,
  },
]);

export default router;
