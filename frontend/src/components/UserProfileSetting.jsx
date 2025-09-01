import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./utility/Loader";
import Input from "./utility/Input";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaCog,
} from "react-icons/fa";

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
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
      requirements: { minLength, hasUpper, hasLower, hasNumber, hasSpecial },
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    // Validation
    const isPasswordChange =
      formData.newPassword ||
      formData.currentPassword ||
      formData.confirmNewPassword;

    if (isPasswordChange) {
      if (!formData.currentPassword) {
        setMessage("Current password is required to change password.");
        setMessageType("error");
        setIsSubmitting(false);
        return;
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        setMessage("New passwords do not match.");
        setMessageType("error");
        setIsSubmitting(false);
        return;
      }

      const passwordValidation = validatePassword(formData.newPassword);
      if (!passwordValidation.isValid) {
        setMessage("New password does not meet requirements.");
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
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessage("Profile updated successfully!");
      setMessageType("success");

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Clear password fields
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 ">
      <div className="max-w-2xl mx-auto">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              messageType === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow ">
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Level / Role
                  </label>
                  <Input
                    type="text"
                    name="accessLevel"
                    value={formData.accessLevel}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Contact your administrator to change access level
                  </p>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Requirements */}
                {formData.newPassword && (
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Password Requirements:
                    </h4>
                    <div className="space-y-1 text-sm">
                      {(() => {
                        const validation = validatePassword(
                          formData.newPassword
                        );
                        return Object.entries({
                          "At least 8 characters":
                            validation.requirements.minLength,
                          "Uppercase letter": validation.requirements.hasUpper,
                          "Lowercase letter": validation.requirements.hasLower,
                          Number: validation.requirements.hasNumber,
                          "Special character":
                            validation.requirements.hasSpecial,
                        }).map(([requirement, met]) => (
                          <div
                            key={requirement}
                            className={`flex items-center ${
                              met ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            <span className="mr-2">{met ? "✓" : "✗"}</span>
                            {requirement}
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex justify-center">
              <Loader
                label="Update Profile"
                loadingLabel=" Updating..."
                type="submit"
                disabled={isSubmitting}
                icon={FaSave}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center min-w-[140px] justify-center cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfileSetting;
