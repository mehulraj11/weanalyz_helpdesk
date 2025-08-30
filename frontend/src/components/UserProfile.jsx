import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaEnvelope,
  FaUserTag,
  FaShieldAlt,
  FaCrown,
  FaUser,
  FaCamera,
  FaCog,
} from "react-icons/fa";
import { MdVerified, MdWorkOutline } from "react-icons/md";

function UserProfile({ setSelected }) {
  const [userProfile, setUserProfile] = useState({
    username: "Loading...",
    email: "Loading...",
    role: "Loading...",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile({
        username: parsedUser.username || "N/A",
        email: parsedUser.email || "N/A",
        role: parsedUser.role || "N/A",
      });
    }
  }, []);

  const handleEditClick = () => {
    setSelected("userprofilesetting");
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <FaCrown className="text-yellow-500" />;
      case "manager":
        return <FaShieldAlt className="text-purple-500" />;
      case "user":
        return <FaUser className="text-blue-500" />;
      default:
        return <FaUserTag className="text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case "manager":
        return "bg-gradient-to-r from-purple-400 to-purple-600 text-white";
      case "user":
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
    }
  };

  const isLoading = userProfile.username === "Loading...";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-600">
            Manage your account information and settings
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>

          {/* Header Section with Edit Button */}

          {/* Profile Information */}
          <div className="relative p-8">
            <div className="space-y-6">
              {/* Email Section */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl text-white shadow-lg">
                      <FaEnvelope size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Email Address
                      </p>
                      {isLoading ? (
                        <div className="animate-pulse h-5 bg-gray-200 rounded w-48 mt-1"></div>
                      ) : (
                        <p className="text-lg font-semibold text-gray-900 break-all">
                          {userProfile.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <MdVerified className="text-green-500 text-2xl" />
                </div>
              </div>

              {/* Role Section */}
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl text-white shadow-lg">
                      <MdWorkOutline size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                        User Role
                      </p>
                      {isLoading ? (
                        <div className="animate-pulse h-5 bg-gray-200 rounded w-24 mt-1"></div>
                      ) : (
                        <div className="flex items-center mt-1">
                          {getRoleIcon(userProfile.role)}
                          <p className="text-lg font-semibold text-gray-900 ml-2 uppercase">
                            {userProfile.role}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl text-white shadow-lg">
                      <FaShieldAlt size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                        Account Status
                      </p>
                      <p className="text-lg font-semibold text-green-700 mt-1">
                        Active & Verified
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEditClick}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                <div className="flex items-center justify-center">
                  <FaEdit className="mr-3" />
                  Edit Profile
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
