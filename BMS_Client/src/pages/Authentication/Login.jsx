import React from "react";
import Lottie from "lottie-react";
// NOTE: You will need to find and add a login animation to your project
import login from "../../assets/Animation/login.json";
import ball from "../../assets/Animation/ball.json";

const Login = () => {
  return (
    <div className="bg-[#352F44] min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-transparent relative">
        {/* Left: Animation and Heading */}
        <div className="bg-[#5C5470] text-white rounded-l-2xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center items-start relative">
          {/* Ball Animation */}
          <div className="absolute top-4 left-4 w-20 h-20 z-10">
            <Lottie animationData={ball} loop={true} />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-6 mt-20 playwrite-de-grund-font z-20">
            Welcome Back, <br />
            Sign in to <br />
            Continue
          </h1>

          <div className="w-full flex justify-center">
            {/* Using the new login animation */}
            <Lottie animationData={login} className="w-3/4 h-auto max-w-xs" />
          </div>
        </div>

        {/* Right: Form */}
        {/* This div uses the same classes to ensure its height matches the left div on desktop */}
        <div className="bg-white rounded-2xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center mt-8 md:mt-0 md:absolute md:top-0 md:bottom-0 md:right-5">
          <h2 className="text-2xl font-extrabold text-[#5C5470] mb-6 lora">
            Login to Your Account
          </h2>
          <form className="space-y-6">
            {" "}
            {/* Increased space slightly for a cleaner look */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
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

          {/* Link to Registration Page */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/signUp"
              className="font-medium text-[#5C5470] hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
