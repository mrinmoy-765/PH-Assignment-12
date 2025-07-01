import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Registration from "../pages/Authentication/Registration";
import LogIn from "../pages/Authentication/Login";
import FetchApartment from "../pages/Apartment/FetchApartment";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import UserProfile from "../pages/Dashboard/UserProfile";
import Review from "../pages/Dashboard/Review";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/apartment",
        element: <FetchApartment></FetchApartment>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/dashboard/userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/dashboard/review",
        element: <Review></Review>,
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
