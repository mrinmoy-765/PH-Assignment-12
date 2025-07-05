// DashboardRouter.jsx
import { useContext } from "react";
import useAuth from "../hooks/useAuth";

import UserDashboard from "../pages/Dashboard/UserDashboard";
import MemberDashboard from "../pages/Dashboard/MemberDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

const DashboardRouter = () => {
  const { mongoUser, loading } = useAuth();

  if (loading || !mongoUser || !mongoUser.role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-accent"></span>
        <span className="text-cyan-500 text-lg">Refresh Page...</span>
      </div>
    );
  }

  switch (mongoUser?.role) {
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
