import { Link, useNavigate } from "react-router-dom";
import "../css/custom.css";
import useAuth from "../hooks/useAuth";
import { RiLoginCircleLine } from "react-icons/ri";
import Swal from "sweetalert2";
import LoadingSpinner from "./LoadingSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Navbar = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/apartment", label: "Apartment" },
  ];

  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleLogout = () => {
    logOut() // Firebase signOut
      .then(() => {
        axiosPublic
          .post("/logout", {}) // base URL already in hook
          .then(() => {
            Swal.fire("Logged out!", "", "success");
            navigate("/");
          })
          .catch((err) => {
            console.error("Error clearing cookie:", err);
          });
      })
      .catch((error) => {
        console.error("Firebase logout error:", error);
      });
  };

  return (
    <div>
      <div className="navbar bg-[#5C5470]">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="text-[#DBD8E3] hover:bg-[#2A2438] p-1 md:p-2 lg:p-3 rounded-xl mx-1 md:mx-2 lg:mx-2 lg:hidden"
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
          <a className="pacifico-regular md:text-xl lg:text-3xl text-white">
            Heaven Craft
          </a>
        </div>

        {/* Large screen menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white playwrite-de-grund-font">
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
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="Avatar" src={user.photoURL} />
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
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/signIn"
                className="flex flex-col items-center text-white"
              >
                <RiLoginCircleLine className="text-3xl hover:bg-[#352F44] p-0.5  rounded-lg" />
                <p className="text-sm mt-1 montserrat hover:text-[#5C5470] hover:bg-gray-50 hover:rounded">
                  Log in
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
