import { useState } from "react";
import {
  FaSearch,
  FaDatabase,
  FaUsers,
  FaUserShield,
  FaUserCog,
  FaUser,
  FaFilter,
  FaCogs,
} from "react-icons/fa";
import {
  MdKeyboardArrowDown,
  MdStorage,
  MdManageAccounts,
  MdSupervisorAccount,
  MdEngineering,
} from "react-icons/md";
import { IoServerOutline, IoPersonOutline } from "react-icons/io5";
import DatabaseList from "./DatabaseList";

const Database = () => {
  const tabs = [
    {
      label: "Users",
      value: "user",
      icon: FaUser,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      count: 0,
    },
    {
      label: "Operations Team",
      value: "operation",
      icon: FaUsers,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      count: 0,
    },
    {
      label: "Technical Support",
      value: "technical",
      icon: FaCogs,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      count: 0,
    },
    {
      label: "Administrators",
      value: "admin",
      icon: FaUserShield,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      count: 0,
    },
  ];

  const [activeTab, setActiveTab] = useState("user");
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleTabSelect = (tabValue) => {
    setActiveTab(tabValue);
    setSearchTerm("");
  };

  const getActiveTabInfo = () => {
    return tabs.find((tab) => tab.value === activeTab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-xl mr-4">
              <MdStorage className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Database Management
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage user accounts, roles, and permissions across all system
            levels
          </p>
        </div>
        {/* Enhanced Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabSelect(tab.value)}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-xl scale-105`
                      : `bg-gradient-to-r ${tab.bgColor} text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg`
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/30`}
                >
                  <div className="flex items-center space-x-3 px-6 py-4">
                    <div
                      className={`p-2 rounded-xl ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-white text-gray-600 group-hover:text-gray-800"
                      } transition-colors duration-200`}
                    >
                      <Icon className="text-lg" />
                    </div>
                    <div className="text-left">
                      <p
                        className={`font-bold text-sm ${
                          isActive
                            ? "text-white"
                            : "text-gray-800 group-hover:text-gray-900"
                        }`}
                      >
                        {tab.label}
                      </p>
                      <p
                        className={`text-xs ${
                          isActive
                            ? "text-white/80"
                            : "text-gray-500 group-hover:text-gray-600"
                        }`}
                      >
                        {tab.count} records
                      </p>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* Enhanced Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search Bar with Enhanced Styling */}
            <div className="relative w-full lg:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                placeholder={`Search ${getActiveTabInfo()?.label.toLowerCase()} by ID, name, email, or role...`}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-500 hover:bg-white hover:shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Enhanced Entries Control */}
            <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-700 font-medium">Show:</span>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer font-medium text-gray-700"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-700 font-medium">entries</span>
            </div>
          </div>

          {/* Active Tab Info */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            {(() => {
              const activeTab = getActiveTabInfo();
              const IconComponent = activeTab?.icon;

              return (
                <div className="mt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div
                    className={`bg-gradient-to-r ${activeTab?.color} text-white px-4 py-2 rounded-full shadow-lg`}
                  >
                    <span className="font-semibold flex items-center space-x-2">
                      {IconComponent && <IconComponent className="text-sm" />}
                      <span>Viewing: {activeTab?.label}</span>
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="font-semibold">
                      Total Records: {activeTab?.count || 0}
                    </span>
                  </div>
                </div>
              );
            })()}

            <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-semibold">
                Total Records: {getActiveTabInfo()?.count || 0}
              </span>
            </div>
          </div>
        </div>
        {/* Database List Component Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Table Header */}

          {/* Option 1: Extract the icon component first */}
          {(() => {
            const activeTab = getActiveTabInfo();
            const IconComponent = activeTab?.icon;
            return (
              <div className={`bg-gradient-to-r ${activeTab?.color} p-6`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    {IconComponent && <IconComponent className="mr-3" />}
                    {activeTab?.label} Database
                  </h3>
                  <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-semibold">
                    Live Data
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Database List Content */}
          <div className="p-6">
            <DatabaseList
              activeTab={activeTab}
              searchTerm={searchTerm}
              entriesPerPage={entriesPerPage}
            />
          </div>
        </div>
        {/* Additional Information Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
                <IoServerOutline className="text-white text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Database Status</h4>
                <p className="text-sm text-gray-600">System Health</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">
                Online & Operational
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
                <MdManageAccounts className="text-white text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">User Management</h4>
                <p className="text-sm text-gray-600">Role Administration</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Manage user roles, permissions, and access levels
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
                <FaDatabase className="text-white text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Data Security</h4>
                <p className="text-sm text-gray-600">Protection & Backup</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Enterprise-grade security with automated backups
            </p>
          </div>
        </div>
        [87]
      </div>
    </div>
  );
};

export default Database;
