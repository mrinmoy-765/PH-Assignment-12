import React from "react";
import dashboard from "../../assets/Animation/dashboard.json";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import { CiUser } from "react-icons/ci";

const UserDashboard = () => {
  const { user,mongoUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  return (
    <div className="px-4 py-0 sm:px-6 lg:px-12 xl:px-20 bg-[#F9F9FC] min-h-screen]">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="space-y-6 w-full lg:w-1/2">
          <div className="flex items-center space-x-3">
            <div className="badge badge-soft badge-accent">
              {mongoUser.role} <CiUser className="text-lg" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#605772] lora">
            Welcome in, <span className="text-[#7c6f9c]">{user.displayName}</span>{" "}
            👋
          </h1>

          <p className="text-gray-600 text-lg playwrite-de-grund-font">
            Step into your dashboard to explore new features, track updates,
            announcements, and more! Make your experience meaningful.
          </p>

          <ul className="list-disc ml-6 text-[#5C5470] work-sans">
            <li>Check out new announcements and community news</li>
            <li>Review your activity and engagement</li>
            <li>Make an agreement to unlock full member features</li>
            <li>Bring your family & friends into our Heaven Craft community</li>
          </ul>

          <p className="text-sm text-gray-500 italic">
            Ready to enjoy all the perks of our digital neighborhood? Let’s get
            started! 🚀
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="w-full max-w-lg mx-auto lg:w-1/2">
          <Lottie animationData={dashboard} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
