import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Database from "../components/Database";
import MyTicket from "../components/MyTicket";
import Navabar from "../components/Navabar";
import NewTicket from "../components/NewTicket";
import TicketApproval from "../components/TicketApproval";
import UserLogHistory from "../components/UserLogHistory";
import UserProfile from "../components/UserProfile";
import UserProfileSetting from "../components/UserProfileSetting";
import {
  FaTachometerAlt,
  FaTicketAlt,
  FaList,
  FaCheckCircle,
  FaUser,
  FaCog,
  FaDatabase,
  FaHistory,
  FaUserCog,
  FaPlus,
  FaChevronRight,
} from "react-icons/fa";
import { MdDashboard, MdSettings, MdAccountCircle } from "react-icons/md";

function MainPage({ tickets, setTickets }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selected, setSelected] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-red-500 to-red-600 p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md text-center border border-white/20">
          <div className="text-red-500 text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to continue accessing the dashboard.
          </p>
          <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const { role } = user;

  const componentsMap = {
    dashboard: <Dashboard />,
    newticket: <NewTicket />,
    myticket: <MyTicket tickets={tickets} setTickets={setTickets} />,
    ticketapproval: (
      <TicketApproval tickets={tickets} setTickets={setTickets} />
    ),
    // performance: <Performance />,
    database: <Database />,
    userlog: <UserLogHistory />,
    userprofile: <UserProfile setSelected={setSelected} />,
    userprofilesetting: <UserProfileSetting />,
  };

  const navigationItems = {
    dashboard: {
      icon: FaTachometerAlt,
      label: "Dashboard",
      gradient: "from-blue-500 to-blue-600",
      description: "Overview & Analytics",
    },
    newticket: {
      icon: FaPlus,
      label: "New Ticket",
      gradient: "from-green-500 to-green-600",
      description: "Create Support Request",
    },
    myticket: {
      icon: FaList,
      label: "My Tickets",
      gradient: "from-purple-500 to-purple-600",
      description: "View All Tickets",
    },
    ticketapproval: {
      icon: FaCheckCircle,
      label: "Approvals",
      gradient: "from-orange-500 to-orange-600",
      description: "Ticket Reviews",
    },
    setting: {
      icon: FaCog,
      label: "Settings",
      gradient: "from-gray-500 to-gray-600",
      description: "System Configuration",
    },
    database: {
      icon: FaDatabase,
      label: "Database",
      gradient: "from-indigo-500 to-indigo-600",
      description: "Data Management",
    },
    userlog: {
      icon: FaHistory,
      label: "User Logs",
      gradient: "from-teal-500 to-teal-600",
      description: "Activity History",
    },
    userprofile: {
      icon: FaUser,
      label: "Profile",
      gradient: "from-pink-500 to-pink-600",
      description: "Account Information",
    },
    userprofilesetting: {
      icon: FaUserCog,
      label: "Profile Settings",
      gradient: "from-red-500 to-red-600",
      description: "Account Settings",
    },
  };

  const roleOptions = {
    user: [
      "dashboard",
      "newticket",
      "myticket",
      "userprofile",
      "userprofilesetting",
    ],
    operation: [
      "dashboard",
      "ticketapproval",
      "myticket",
      // "performance",
      "userprofile",
      "userprofilesetting",
    ],
    technical: [
      "dashboard",
      "myticket",
      // "performance",
      "userprofile",
      "userprofilesetting",
    ],
    admin: [
      "dashboard",
      "userlog",
      "database",
      "userprofile",
      "userprofilesetting",
    ],
  };

  const getRoleBadgeColor = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "operation":
        return "bg-gradient-to-r from-purple-400 to-purple-600";
      case "technical":
        return "bg-gradient-to-r from-green-400 to-green-600";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50">
        <Navabar onSelect={setSelected} />
      </div>

      <div className="flex flex-1 p-4 md:p-6 lg:p-8 gap-6 md:gap-8">
        {/* Enhanced Sidebar */}
        <aside
          className={`${
            sidebarCollapsed ? "w-20" : "w-full md:w-80 lg:w-96"
          } bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 transition-all duration-300 flex-shrink-0 overflow-hidden`}
          aria-label="Main Navigation"
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <MdDashboard className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Navigation
                    </h2>
                    <p className="text-sm text-gray-500">Quick access menu</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 hidden md:block"
                aria-label="Toggle Sidebar"
              >
                <FaChevronRight
                  className={`text-gray-600 transition-transform duration-300 ${
                    sidebarCollapsed ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div
            className={`${
              sidebarCollapsed ? "p-2" : "p-6"
            } space-y-2 flex-1 overflow-y-auto`}
          >
            {roleOptions[role]?.map((key) => {
              const item = navigationItems[key];
              const Icon = item?.icon || FaCog;
              const isActive = selected === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${item?.gradient} text-white shadow-xl scale-105`
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:scale-102"
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/30`}
                >
                  <div
                    className={`flex items-center ${
                      sidebarCollapsed ? "justify-center p-4" : "p-4 space-x-4"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-blue-600"
                      } transition-colors duration-200`}
                    >
                      <Icon className="text-xl" />
                    </div>

                    {!sidebarCollapsed && (
                      <div className="flex-1 text-left min-w-0">
                        <p
                          className={`font-semibold truncate ${
                            isActive
                              ? "text-white"
                              : "text-gray-800 group-hover:text-blue-800"
                          }`}
                        >
                          {item?.label}
                        </p>
                        <p
                          className={`text-sm truncate ${
                            isActive
                              ? "text-blue-100"
                              : "text-gray-500 group-hover:text-blue-600"
                          }`}
                        >
                          {item?.description}
                        </p>
                      </div>
                    )}

                    {!sidebarCollapsed && isActive && (
                      <div className="flex-shrink-0">
                        <FaChevronRight className="text-white/80 text-sm" />
                      </div>
                    )}
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Content Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {navigationItems[selected] && (
                  <>
                    {navigationItems[selected] &&
                      (() => {
                        const IconComponent = navigationItems[selected].icon;
                        return (
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${navigationItems[selected].gradient} shadow-lg`}
                          >
                            <IconComponent className="text-2xl text-white" />
                          </div>
                        );
                      })()}

                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">
                        {navigationItems[selected].label}
                      </h1>
                      <p className="text-gray-600">
                        {navigationItems[selected].description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="h-full overflow-y-auto">
              {componentsMap[selected]}
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                © 2025 Support Dashboard. All rights reserved.
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://portfolio-mhvats.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
                >
                  <span>Developed by Mehul Raj</span>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaChevronRight className="text-white text-xs" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
