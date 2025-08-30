import { useState, useEffect } from "react";
import {
  IoNotifications,
  IoPerson,
  IoClose,
  IoWarning,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { TbLogout, TbBell, TbUser, TbMenu2 } from "react-icons/tb";
import { FaHeadset, FaUserShield, FaBell, FaSignOutAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Navbar({ onSelect }) {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  // Get user data
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = openConfirm ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openConfirm]);

  const getRoleColor = () => {
    switch (user?.role?.toLowerCase()) {
      case "admin":
        return "from-yellow-400 to-yellow-600";
      case "operation":
        return "from-purple-400 to-purple-600";
      case "technical":
        return "from-green-400 to-green-600";
      default:
        return "from-blue-400 to-blue-600";
    }
  };

  const mockNotifications = [
    { id: 1, title: "New ticket assigned", time: "2 min ago", type: "info" },
    {
      id: 2,
      title: "Ticket #1234 resolved",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 3,
      title: "System maintenance",
      time: "3 hours ago",
      type: "warning",
    },
  ];

  return (
    <>
      {/* Enhanced Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-xl">
        <div className="px-4 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <MdSupportAgent className="text-2xl text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Helpdesk
                  </h1>
                  <p className="text-sm text-gray-500 -mt-1">Support System</p>
                </div>
              </div>
            </div>

            {/* Center - User Welcome (Hidden on mobile) */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-3 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-sm">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      Welcome back, {user?.username || "User"}!
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role || "User"} Account
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                  title="Notifications"
                >
                  <IoNotifications className="text-xl text-blue-600" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 z-60">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800">
                          Notifications
                        </h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <IoClose className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {mockNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`p-2 rounded-lg ${
                                notif.type === "success"
                                  ? "bg-green-100 text-green-600"
                                  : notif.type === "warning"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {notif.type === "success" ? (
                                <IoCheckmarkCircle />
                              ) : notif.type === "warning" ? (
                                <IoWarning />
                              ) : (
                                <IoNotifications />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800">
                                {notif.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <button
                onClick={() => onSelect("userprofile")}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30"
                title="User Profile"
              >
                <IoPerson className="text-xl text-purple-600" />
              </button>

              {/* Logout */}
              <button
                onClick={() => setOpenConfirm(true)}
                className="p-3 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/30"
                title="Logout"
              >
                <TbLogout className="text-xl text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Logout Confirmation Modal */}
      {openConfirm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-logout-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setOpenConfirm(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-3xl">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <FaSignOutAlt className="text-2xl text-white" />
                </div>
                <div>
                  <h2
                    id="confirm-logout-title"
                    className="text-2xl font-bold text-white"
                  >
                    Confirm Logout
                  </h2>
                  <p className="text-red-100 text-sm">
                    Are you sure you want to sign out?
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-2xl border border-red-200 mb-6">
                <div className="flex items-start space-x-3">
                  <IoWarning className="text-red-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">
                      Important Notice
                    </h4>
                    <p className="text-red-700 text-sm">
                      You will be signed out of your current session and
                      redirected to the login page. Any unsaved changes may be
                      lost.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setOpenConfirm(false)}
                  className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </>
  );
}

export default Navbar;
