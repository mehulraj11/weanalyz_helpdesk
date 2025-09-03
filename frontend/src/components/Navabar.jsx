import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaHeadset,
} from "react-icons/fa";

function Navbar({ onSelect }) {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [notifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = openConfirm ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openConfirm]);

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

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-600" />;
      case "warning":
        return <FaExclamationTriangle className="text-yellow-600" />;
      default:
        return <FaInfoCircle className="text-blue-600" />;
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FaHeadset className="text-white text-lg" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Helpdesk</h1>
                <p className="text-xs text-gray-600">Support System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <FaBell className="text-gray-600 text-lg" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-60">
                    <div className="p-3 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          Notifications
                        </h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          <FaTimes className="text-gray-500 text-sm" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {mockNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-1">
                              {getNotificationIcon(notif.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
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
              <button
                onClick={() => onSelect("userprofile")}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                title="Profile"
              >
                <FaUser className="text-gray-600 text-lg" />
              </button>
              <button
                onClick={() => setOpenConfirm(true)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                title="Logout"
              >
                <FaSignOutAlt className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {openConfirm && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-opacity-100"
            onClick={() => setOpenConfirm(false)}
          />

          <div className="relative z-10 w-full max-w-sm bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaSignOutAlt className="text-red-600 text-2xl" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Confirm Logout
                  </h2>
                  <p className="text-sm text-gray-600">
                    Are you sure you want to sign out?
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
                <div className="flex items-start space-x-2">
                  <FaExclamationTriangle className="text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    You will be signed out and redirected to the login page.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setOpenConfirm(false)}
                  className="cursor-pointer flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
