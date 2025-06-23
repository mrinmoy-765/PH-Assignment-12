import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();

  const {
    user,
    mongoUser,
    updateUserProfile,
    reauthenticateAndUpdateEmail,
    reauthenticateAndUpdatePassword,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }
  // Local states for editing
  const [isEditing, setIsEditing] = useState({
    displayName: false,
    photoURL: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    email: user.email || "",
    password: "", // for new password change
    currentPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSave = async () => {
    try {
      if (isEditing.displayName || isEditing.photoURL) {
        await updateUserProfile(formData.displayName, formData.photoURL);
      }

      if (isEditing.email) {
        await reauthenticateAndUpdateEmail(
          formData.email,
          formData.currentPassword
        );
      }

      if (
        isEditing.password &&
        formData.password &&
        formData.currentPassword &&
        isValidPassword(formData.password)
      ) {
        await reauthenticateAndUpdatePassword(
          formData.currentPassword,
          formData.password
        );
      }

      //updating mongodb data
      await axiosSecure.put("/users/update", {
        email: formData.email.toLowerCase(),
        name: formData.displayName,
        previousEmail: mongoUser.email.toLowerCase(),
      });

      alert("Profile updated successfully!");
      setIsEditing({
        displayName: false,
        photoURL: false,
        email: false,
        password: false,
      });
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-12 xl:px-20 bg-[#F9F9FC] min-h-screen">
      <div className="flex flex-col items-center">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={`${user.displayName || "User"}'s avatar`}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4"
            style={{ borderColor: "#5C5470" }}
          />
        ) : (
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center mb-4 text-5xl"
            style={{ backgroundColor: "#5C5470", color: "#DBD8E3" }}
          >
            ?
          </div>
        )}

        {/* Display Name */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1">Display Name:</label>
          {isEditing.displayName ? (
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              className="border rounded w-full p-2"
            />
          ) : (
            <div className="flex justify-between items-center">
              <span>{user.displayName || "No display name"}</span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, displayName: true }))
                }
              >
                <AiOutlineEdit className="text-2xl" />
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1">Email:</label>
          {isEditing.email ? (
            <>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border rounded w-full p-2 mb-2"
                placeholder="Enter new email"
              />
              <input
                type="password"
                value={formData.currentPassword || ""}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="border rounded w-full p-2 mb-2"
                placeholder="Enter your current password"
              />
            </>
          ) : (
            <div className="flex justify-between items-center">
              <span>{user.email || "No email provided"}</span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({
                    ...prev,
                    email: true,
                  }))
                }
              >
                <AiOutlineEdit className="text-2xl" />
              </button>
            </div>
          )}
        </div>

        {/* URL */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1">Image url:</label>
          {isEditing.photoURL ? (
            <input
              type="text"
              value={formData.photoURL}
              onChange={(e) => handleInputChange("photoURL", e.target.value)}
              className="border rounded w-full p-2"
            />
          ) : (
            <div className="flex justify-between items-center">
              <span>{user.photoURL || "No url provided"}</span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, photoURL: true }))
                }
              >
                <AiOutlineEdit className="text-2xl" />
              </button>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1">Change Password:</label>
          {isEditing.password ? (
            <>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="border rounded w-full p-2 mb-2"
                placeholder="Enter new password"
              />
              <input
                type="password"
                value={formData.currentPassword || ""}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="border rounded w-full p-2"
                placeholder="Enter your current password"
              />
            </>
          ) : (
            <div className="flex justify-between items-center">
              <span>********</span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, password: true }))
                }
              >
                <AiOutlineEdit className="text-2xl" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          className="mt-4 bg-[#5C5470] text-white py-2 px-6 rounded hover:bg-[#433d56]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
