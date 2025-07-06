import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Import all the icons you'll need
import { AiTwotoneProfile } from "react-icons/ai";
import { MdCampaign, MdOutlineManageAccounts, MdPayment } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { FaFileSignature } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { MdApartment } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { RiProfileFill } from "react-icons/ri";
import { RiCoupon3Fill } from "react-icons/ri";
import { GoGitPullRequest } from "react-icons/go";
import { BsClockHistory } from "react-icons/bs";

const Sidebar = () => {
  const { mongoUser, loading, logOut } = useAuth();
  const navigate = useNavigate();

  //logout handler
  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire("Logged out!", "", "success");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
  const userLinks = [
    {
      to: "/",
      icon: <MdHome className="text-xl" />,
      label: "Home",
    },
    {
      to: "/dashboard/userProfile",
      icon: <RiProfileFill className="text-xl" />,
      label: "Profile",
    },
    {
      to: "/apartment",
      icon: <MdApartment className="text-xl" />,
      label: "Apartments",
    },
    {
      to: "/dashboard/get-announcement",
      icon: <MdCampaign className="text-xl" />,
      label: "Announcements",
    },
    {
      to: "/dashboard/review",
      icon: <MdOutlineRateReview className="text-xl" />,
      label: "Leave a review",
    },
    {
      icon: <TbLogout2 className="text-xl" />,
      label: "Log out",
      onClick: handleLogout,
    },
  ];

  const memberLinks = [
    {
      to: "/",
      icon: <MdHome className="text-xl" />,
      label: "Home",
    },
    {
      to: "/dashboard/userProfile",
      icon: <RiProfileFill className="text-xl" />,
      label: "Profile",
    },
    {
      to: "/apartment",
      icon: <MdApartment className="text-xl" />,
      label: "Apartments",
    },
    {
      to: "/dashboard/get-announcement",
      icon: <MdCampaign className="text-xl" />,
      label: "Announcements",
    },
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
    {
      to: "/dashboard/payment-history",
      icon: <BsClockHistory className="text-xl" />,
      label: "Payment History",
    },
    {
      to: "/dashboard/review",
      icon: <MdOutlineRateReview className="text-xl" />,
      label: "Leave a review",
    },
    {
      icon: <TbLogout2 className="text-xl" />,
      label: "Log out",
      onClick: handleLogout,
    },
  ];

  const adminLinks = [
    {
      to: "/",
      icon: <MdHome className="text-xl" />,
      label: "Home",
    },
    {
      to: "/dashboard/userProfile",
      icon: <RiProfileFill className="text-xl" />,
      label: "Profile",
    },
    {
      to: "/dashboard/manage-users",
      icon: <MdOutlineManageAccounts className="text-xl" />,
      label: "Manage Members",
    },
    {
      to: "/dashboard/post-announcement",
      icon: <GrAnnounce className="text-xl" />,
      label: "Post Announcement",
    },
    {
      to: "/dashboard/get-announcement",
      icon: <MdCampaign className="text-xl" />,
      label: "Announcements List",
    },
    {
      to: "/dashboard/agreement-requests",
      icon: <GoGitPullRequest className="text-xl" />,
      label: "Agreement Requests",
    },
    {
      to: "/dashboard/manage-coupons",
      icon: <RiCoupon3Fill className="text-xl" />,
      label: "Manage Coupons",
    },
    {
      icon: <TbLogout2 className="text-xl" />,
      label: "Log out",
      onClick: handleLogout,
    },
  ];

  const renderLinks =
    mongoUser?.role === "user"
      ? userLinks
      : mongoUser?.role === "member"
      ? memberLinks
      : mongoUser?.role === "admin"
      ? adminLinks
      : [];

  return (
    <div className="w-64 bg-[#5C5470] text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
      <ul className="space-y-2">
        {renderLinks.map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-[#353041] transition-colors duration-200"
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ) : (
              <Link
                to={link.to}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#353041] transition-colors duration-200"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
