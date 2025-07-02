import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AiOutlineEdit } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [mongoNeedsUpdate, setMongoNeedsUpdate] = useState(false);
  const {
    user,
    mongoUser,
    updateUserProfile,
    reauthenticateAndUpdateEmail,
    reauthenticateAndUpdatePassword,
    loading,
  } = useAuth();

  // Local states for editing
  const [isEditing, setIsEditing] = useState({
    displayName: false,
    photoURL: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    email: user?.email || "",
    password: "",
    currentPassword: "",
  });

  // Update formData when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        email: user?.email || "",
        password: "",
        currentPassword: "",
      });
    }
  }, [user]);

  useEffect(() => {
    const updateMongo = async () => {
      if (!mongoNeedsUpdate) return;

      try {
        await axiosSecure.put("/users/update", {
          email: formData.email.toLowerCase(),
          name: formData.displayName,
          image: formData.photoURL,
          uid: mongoUser?.uid,
        });
        toast.success("Profile information updated in database!");
      } catch (error) {
        console.error("MongoDB update failed:", error);
        toast.error("Failed to update profile in database");
      } finally {
        setMongoNeedsUpdate(false);
      }
    };

    updateMongo();
  }, [
    mongoNeedsUpdate,
    formData.email,
    formData.displayName,
    mongoUser?.email,
    axiosSecure,
  ]);

  // Add this useEffect to debug user loading
  useEffect(() => {
    console.log("user from useAuth:", user);
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  // Add this check to handle missing user
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg text-gray-500">
          No user data found. Please ensure you are logged in and Firebase Auth is configured correctly.
        </span>
      </div>
    );
  }

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
        if(isEditing.displayName) {
          setMongoNeedsUpdate(true);
        }
        toast.success("Profile information updated successfully!");
      }

      if (isEditing.email) {
        if (!formData.currentPassword) {
          toast.error("Current password is required to update email");
          return;
        }
        try {
          await reauthenticateAndUpdateEmail(
            formData.email,
            formData.currentPassword
          );
          setMongoNeedsUpdate(true);
          toast.success("Email updated successfully!");
        } catch (error) {
          toast.error(error.message || "Failed to update email");
          return;
        }
      }

      if (isEditing.password) {
        if (!formData.currentPassword) {
          toast.error("Current password is required");
          return;
        }
        if (!formData.password) {
          toast.error("New password is required");
          return;
        }
        if (!isValidPassword(formData.password)) {
          toast.error(
            "Password must contain at least 6 characters, one uppercase and one lowercase letter"
          );
          return;
        }

        try {
          await reauthenticateAndUpdatePassword(
            formData.currentPassword,
            formData.password
          );
          toast.success("Password updated successfully!");
          setFormData((prev) => ({ ...prev, password: "", currentPassword: "" }));
        } catch (error) {
          toast.error(error.message || "Failed to update password");
          return;
        }
      }

      // Reset editing states
      setIsEditing({
        displayName: false,
        photoURL: false,
        email: false,
        password: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-12 xl:px-20 bg-[#F9F9FC] h-auto overflow-x-hidden">
      <div className="flex flex-col items-center lg:gap-2 md:gap-2 gap-4">
        <div className="relative lg:mt-0 md:mt-0 mt-18 mb-8">
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
          <div className="absolute ml-27 -mt-12">
            <div className="badge bg-[#5C5470] text-white work-sans">
              {mongoUser?.role}
            </div>
          </div>
        </div>

        {/* Display Name */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1 text-[#534a65] lora">
            Display Name:
          </label>
          {isEditing.displayName ? (
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              className="border border-[#5C5470] rounded w-full p-2"
            />
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-[#666075f9] work-sans">
                {user.displayName || "No display name"}
              </span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, displayName: true }))
                }
              >
                <AiOutlineEdit className="text-2xl text-[#5C5470]" />
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1 text-[#534a65]  lora">
            Email:
          </label>
          {isEditing.email ? (
            <>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border border-[#5C5470] rounded w-full p-2 mb-2"
                placeholder="Enter new email"
              />
              <input
                type="password"
                value={formData.currentPassword || ""}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="border rounded border-[#5C5470] w-full p-2 mb-2"
                placeholder="Enter your current password"
              />
            </>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-blue-400 work-sans">
                {user.email || "No email provided"}
              </span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({
                    ...prev,
                    email: true,
                  }))
                }
              >
                <AiOutlineEdit className="text-2xl text-[#5C5470]" />
              </button>
            </div>
          )}
        </div>

        {/* URL */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1 text-[#534a65]  lora">
            Image url:
          </label>
          {isEditing.photoURL ? (
            <input
              type="text"
              value={formData.photoURL}
              onChange={(e) => handleInputChange("photoURL", e.target.value)}
              className="border border-[#5C5470] rounded w-full p-2"
            />
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-[#666075f9] work-sans">
                {user.photoURL || "No url provided"}
              </span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, photoURL: true }))
                }
              >
                <AiOutlineEdit className="text-2xl text-[#5C5470]" />
              </button>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 w-full max-w-md">
          <label className="block font-semibold mb-1 text-[#534a65]  lora">
            Change Password:
          </label>
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
                className="border border-[#5C5470] rounded w-full p-2"
                placeholder="Enter your current password"
              />
            </>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-[#666075f9]">********</span>
              <button
                className="text-sm text-blue-500"
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, password: true }))
                }
              >
                <AiOutlineEdit className="text-2xl text-[#5C5470]" />
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
