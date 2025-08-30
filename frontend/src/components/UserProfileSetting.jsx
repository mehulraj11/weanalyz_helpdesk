import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaCog,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { MdSecurity, MdVerified } from "react-icons/md";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
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

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    if (
      formData.newPassword ||
      formData.currentPassword ||
      formData.confirmNewPassword
    ) {
      if (!formData.currentPassword) {
        setMessage("Current password is required to change password.");
        setMessageType("error");
        setIsSubmitting(false);
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setMessage("New password and confirm password do not match.");
        setMessageType("error");
        setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading user data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Update your personal information and security settings
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
              messageType === "success"
                ? "bg-green-50/80 border-green-200 text-green-800"
                : "bg-red-50/80 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {messageType === "success" ? (
                <FaCheck className="mr-3 text-lg" />
              ) : (
                <FaTimes className="mr-3 text-lg" />
              )}
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <MdSecurity className="mr-3" />
              Account Security & Information
            </h2>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaUser className="mr-2 text-blue-600" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                    >
                      <FaUser className="mr-2 text-blue-600" />
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-white hover:shadow-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                    >
                      <FaEnvelope className="mr-2 text-blue-600" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-white hover:shadow-lg pr-12"
                      />
                      <MdVerified className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 text-xl" />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="accessLevel"
                      className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                    >
                      <FaShieldAlt className="mr-2 text-blue-600" />
                      Access Level / Role
                    </label>
                    <input
                      type="text"
                      id="accessLevel"
                      name="accessLevel"
                      placeholder="Enter access level"
                      value={formData.accessLevel}
                      onChange={handleChange}
                      disabled
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-sm text-gray-500 flex items-center mt-2">
                      <FaInfoCircle className="mr-2" />
                      Contact your administrator to change your access level
                    </p>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaLock className="mr-2 text-red-600" />
                  Password Security
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="currentPassword"
                      className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                    >
                      <FaLock className="mr-2 text-red-600" />
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Enter current password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 bg-white hover:shadow-lg pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                    >
                      <FaLock className="mr-2 text-green-600" />
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 bg-white hover:shadow-lg pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmNewPassword"
                      className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                    >
                      <FaLock className="mr-2 text-green-600" />
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm new password"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 bg-white hover:shadow-lg pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <FaInfoCircle className="mr-2" />
                    Password Requirements:
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1 ml-6">
                    <li>• At least 8 characters long</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                    <li>• Include at least one special character</li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-3" />
                      Updating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaSave className="mr-3" />
                      Update Profile
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSetting;
