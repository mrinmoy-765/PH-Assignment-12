import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Registration from "../pages/Authentication/Registration";
import LogIn from "../pages/Authentication/Login";
import FetchApartment from "../pages/Apartment/FetchApartment";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/Dashboard/UserProfile";
import Review from "../pages/Dashboard/Review";
import DashboardRouter from "../components/DashboardRouter";
import ManageUsers from "../pages/Dashboard/ManageMembers";
import PostAnnouncement from "../pages/Dashboard/PostAnnouncement";
import GetAnnouncements from "../pages/Dashboard/GetAnnouncements";

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
    element: <DashboardLayout />, // wrapper layout with sidebar
    children: [
      {
        path: "/dashboard",
        element: <DashboardRouter />, // dynamic component based on role
      },
      {
        path: "/dashboard/userProfile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/review",
        element: <Review />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/post-announcement",
        element: <PostAnnouncement />
      },
      {
        path:"/dashboard/get-announcement",
        element: <GetAnnouncements/>
      }
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
