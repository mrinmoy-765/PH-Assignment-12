import React from "react";
import Lottie from "lottie-react";
import login from "../../assets/Animation/login.json";
import ball from "../../assets/Animation/ball.json";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2A2438]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>HC | Login</title>
      </Helmet>
      <div className="bg-[#352F44] min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-transparent relative">
          {/* Left: Animation and Heading */}
          <div className="bg-[#5C5470] text-white rounded-l-2xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center items-start relative">
            <div className="absolute top-4 left-4 w-20 h-20 z-10">
              <Lottie animationData={ball} loop={true} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-6 mt-20 playwrite-de-grund-font z-20">
              Welcome Back, <br />
              Sign in to <br />
              Continue
            </h1>
            <div className="w-full flex justify-center">
              <Lottie animationData={login} className="w-3/4 h-auto max-w-xs" />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center mt-8 md:mt-0 md:absolute md:top-0 md:bottom-0 md:right-5">
            <h2 className="text-2xl font-extrabold text-[#5C5470] mb-6 lora">
              Login to Your Account
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email" // ✅ Added
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password" // ✅ Added
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-[#5C5470] text-white py-2 rounded-md hover:bg-[#443d5b] transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="font-medium text-[#5C5470] hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
