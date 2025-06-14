import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import signUp from "../../assets/Animation/signUp.json";
import ball from "../../assets/Animation/ball.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile, loading } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                toast.success("User created successfully!");
                reset(); // If using react-hook-form
                navigate("/signIn");
              }
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to update profile");
          });
      })
      .catch((error) => {
        console.log(error);
        // ✅ Show Firebase errors in a toast
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email is already in use.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters.");
        } else {
          toast.error(error.message);
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2A2438]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-[#352F44] min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-transparent relative">
        {/* Left Panel */}
        <div className="bg-[#5C5470] text-white rounded-l-2xl shadow-lg w-full md:w-1/2 p-8 flex flex-col justify-center items-start relative">
          <div className="absolute top-4 left-4 w-20 h-20 z-10">
            <Lottie animationData={ball} loop={true} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 mt-20 playwrite-de-grund-font z-20">
            Getting <br />
            Started With <br />
            HeavenCraft
          </h1>
          <div className="w-full flex justify-center">
            <Lottie animationData={signUp} className="w-3/4 h-auto max-w-xs" />
          </div>
        </div>

        {/* Right Panel: Form */}
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
                {...register("name", { required: "Name is required" })}
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
                {...register("email", { required: "Email is required" })}
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
                {...register("photoURL")}
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasUppercase: (v) =>
                      /[A-Z]/.test(v) ||
                      "Must contain at least one uppercase letter",
                    hasLowercase: (v) =>
                      /[a-z]/.test(v) ||
                      "Must contain at least one lowercase letter",
                  },
                })}
                type="password"
                placeholder="Enter your password"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {isFocused && (
                <p className="text-sm text-[#5C5470] mt-2">
                  Must have an Uppercase letter, a lowercase letter, and be at
                  least 6 characters.
                </p>
              )}
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
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

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/signIn"
              className="font-medium text-[#5C5470] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
