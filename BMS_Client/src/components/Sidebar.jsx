import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Assume user role is available here

const Sidebar = () => {
  const { userRole } = useAuth(); // userRole = "user" | "member" | "admin"

  const commonLinks = [
    { to: "/dashboard/profile", label: "Profile" },
    { to: "/dashboard/announcements", label: "Announcements" },
  ];

  const memberLinks = [
    { to: "/dashboard/my-agreement", label: "My Agreement" },
    { to: "/dashboard/payment", label: "Make Payment" },
  ];

  const adminLinks = [
    { to: "/dashboard/manage-users", label: "Manage Users" },
    { to: "/dashboard/post-announcement", label: "Post Announcement" },
  ];

  const renderLinks = [
    ...commonLinks,
    ...(userRole === "member" ? memberLinks : []),
    ...(userRole === "admin" ? [...memberLinks, ...adminLinks] : []),
  ];

  return (
    <div className="w-64 bg-[#5C5470] text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-2">
        {renderLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="block p-2 rounded hover:bg-[#40394a]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
