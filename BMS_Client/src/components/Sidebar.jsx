import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Import all the icons you'll need
import { AiTwotoneProfile } from "react-icons/ai";
import { MdCampaign, MdOutlineManageAccounts, MdPayment } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { FaFileSignature } from "react-icons/fa";

const Sidebar = () => {
  const { mongoUser, loading } = useAuth();

  if (loading) {
    // A simple loading state while waiting for the user data
    return (
      <div className="w-64 bg-[#5C5470] min-h-screen p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-500 rounded w-3/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-500 rounded"></div>
            <div className="h-4 bg-gray-500 rounded w-5/6"></div>
            <div className="h-4 bg-gray-500 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  // Define links with icons for all roles for a consistent UI
  const commonLinks = [
    {
      to: "/dashboard/userProfile",
      icon: <AiTwotoneProfile className="text-xl" />, // text-xl is a good size
      label: "Profile",
    },
    {
      to: "/dashboard/announcements",
      icon: <MdCampaign className="text-xl" />,
      label: "Announcements",
    },
  ];

  const memberLinks = [
    {
      to: "/dashboard/my-agreement",
      icon: <FaFileSignature className="text-xl" />,
      label: "My Agreement",
    },
    {
      to: "/dashboard/payment",
      icon: <MdPayment className="text-xl" />,
      label: "Make Payment",
    },
  ];

  const adminLinks = [
    {
      to: "/dashboard/manage-users",
      icon: <MdOutlineManageAccounts className="text-xl" />,
      label: "Manage Users",
    },
    {
      to: "/dashboard/post-announcement",
      icon: <GrAnnounce className="text-xl" />,
      label: "Post Announcement",
    },
  ];

  // Using optional chaining `mongoUser?.role` to prevent errors if mongoUser is null
  const renderLinks = [
    ...commonLinks,
    ...(mongoUser?.role === "member" ? memberLinks : []),
    ...(mongoUser?.role === "admin" ? [...memberLinks, ...adminLinks] : []),
  ];

  return (
    <div className="w-64 bg-[#5C5470] text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
      <ul className="space-y-2">
        {renderLinks.map((link) => (
          <li key={link.to}>
            {/* 
              FIXES APPLIED HERE:
              1. Changed <Link> to a flex container to hold the icon and label.
              2. Added `items-center` to vertically align them.
              3. Added `gap-3` to create space between them.
              4. Rendered `{link.icon}` before the label.
            */}
            <Link
              to={link.to}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#353041] transition-colors duration-200"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
