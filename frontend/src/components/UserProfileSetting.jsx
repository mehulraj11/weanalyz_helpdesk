import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfileSetting() {
  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    accessLevel: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        accessLevel: user.accessLevel || user.role || "",
      }));
      setLoading(false);
    } else {
      setMessage("User data not found. Please log in.");
      setMessageType("error");
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (
      formData.newPassword ||
      formData.currentPassword ||
      formData.confirmNewPassword
    ) {
      if (!formData.currentPassword) {
        setMessage("Current password is required to change password.");
        setMessageType("error");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setMessage("New password and confirm password do not match.");
        setMessageType("error");
        return;
      }
    }

    try {
      const updatePayload = {
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/auth/changepassword`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setMessage(res.data.message || "Profile updated successfully!");
      setMessageType("success");
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
      setMessageType("error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700 text-lg">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
        User Profile Settings
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Current password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="accessLevel"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Access Level
              </label>
              <input
                type="text"
                id="accessLevel"
                name="accessLevel"
                placeholder="Enter access level"
                value={formData.accessLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>
          {message && (
            <p
              className={`text-center font-medium mt-4 ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg text-white font-semibold text-lg
                         bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700
                         focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2
                         transition duration-300 ease-in-out transform hover:-translate-y-1
                         shadow-lg hover:shadow-xl"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfileSetting;
