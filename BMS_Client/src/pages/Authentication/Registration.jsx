import React, { useState } from "react";
import { useContext } from "react";
import Lottie from "lottie-react";
import signUp from "../../assets/Animation/signUp.json";
import ball from "../../assets/Animation/ball.json";
import axiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const [isFocused, setIsFocused] = useState(false);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  //handle sign up
  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    // The overflow-hidden here is important to contain the overlapping design
    <div className="bg-[#352F44] min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* This parent div MUST be relative for the absolute child to be positioned correctly */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-transparent relative">
        {/* Left: Animation and Heading */}
        {/* This div sets the height for the parent container because it's in the normal document flow */}
        <div className="bg-[#5C5470] text-white rounded-l-2xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center items-start relative">
          {/* Ball Animation */}
          <div className="absolute top-4 left-4 w-20 h-20 z-10">
            <Lottie animationData={ball} loop={true} />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-6 mt-20 playwrite-de-grund-font z-20">
            Getting <br />
            Started With <br />
            HeavenCraft
          </h1>

          <div className="w-full flex justify-center">
            <Lottie animationData={signUp} className="w-3/4 h-auto max-w-xs" />
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-2xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center mt-8 md:mt-0 md:absolute md:top-0 md:bottom-0 md:right-5">
          <h2 className="text-2xl font-extrabold text-[#5C5470] mb-6 lora">
            Create Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

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
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter your photo URL"
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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {isFocused && (
                <p className="text-sm/tight text-[#5C5470] work-sans mt-2">
                  Must have an Uppercase letter, a lowercase letter, and be at
                  least 6 characters long.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#5C5470] text-white py-2 rounded-md hover:bg-[#443d5b] transition"
            >
              Register
            </button>
          </form>
          {/* Link to Registration Page */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/signIn"
              className="font-medium text-[#5C5470] hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
