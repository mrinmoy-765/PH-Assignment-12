import { Link } from "react-router-dom";
import "../css/custom.css";

const Navbar = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/apartment", label: "Apartment" },
  ];

  return (
    <div>
      <div className="navbar bg-[#5C5470]">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="text-[#DBD8E3] hover:bg-[#2A2438] p-3 rounded-xl mx-2 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Small screen dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {routes.map((item, index) => (
                <li key={index} className="custom-menu-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <a className="pacifico-regular text-3xl text-white">Heaven Craft</a>
        </div>

        {/* Large screen menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white playwrite-de-grund-navItems">
            {routes.map((item, index) => (
              <li key={index} className="navItems">
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Avatar section */}
        <div className="navbar-end">
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
