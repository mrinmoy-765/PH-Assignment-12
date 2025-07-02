// DashboardRouter.jsx
import { useContext } from "react";
import useAuth from "../hooks/useAuth";

import UserDashboard from "../pages/Dashboard/UserDashboard";
//import MemberDashboard from "./MemberDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

const DashboardRouter = () => {
    const {  mongoUser, loading } = useAuth();

  if (loading) return ;

  switch (mongoUser.role) {
    case "user":
      return <UserDashboard />;
    case "member":
      return <MemberDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>Unauthorized or Unknown Role</div>;
  }
};

export default DashboardRouter;
