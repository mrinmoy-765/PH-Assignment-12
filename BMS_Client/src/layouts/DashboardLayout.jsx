import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="min-h-screen h-screen w-full bg-[#DBD8E3] py-4 lg:py-12 px-22">
      {" "}
      {/* Adjusted padding */}
      {/* 1. This container is the positioning context because it has `relative` */}
      <div className="h-full w-full bg-gray-50 rounded-xl overflow-hidden shadow-xl/30 relative flex">
        {/* Drawer Sidebar */}
        <div
          className={`bg-base-200 py-0 pt-0 pr-4 min-h-full w-72 absolute z-10 transition-all duration-300 ${
            isDrawerOpen ? "left-0" : "-left-72" // Corrected the 'left' value to match width
          }`}
        >
          <Sidebar />
        </div>

        {/* 2. Button is now a direct child of the relative container */}
        <button
          className="btn btn-ghost btn-square absolute top-4 right-4 z-20" // Positioned here!
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? <RiCloseLargeLine /> : <RxHamburgerMenu />}
        </button>

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isDrawerOpen ? "ml-72" : "ml-0"
          } overflow-y-auto p-4`}
        >
          {/* Outlet is now the only child here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
