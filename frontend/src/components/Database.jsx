import { useState, useMemo } from "react";
import {
  FaUsers,
  FaUserShield,
  FaCogs,
  FaDatabase,
  FaSearch,
} from "react-icons/fa";
import { MdStorage } from "react-icons/md";
import { IoServerOutline } from "react-icons/io5";
import DatabaseList from "./DatabaseList";

const TABS_CONFIG = [
  { label: "Users", value: "user", icon: FaUsers, color: "blue" },
  {
    label: "Operation Team",
    value: "operation",
    icon: FaUserShield,
    color: "purple",
  },
  { label: "Tech Support", value: "technical", icon: FaCogs, color: "green" },
  {
    label: "Administrators",
    value: "admin",
    icon: FaDatabase,
    color: "yellow",
  },
];

const ENTRIES_OPTIONS = [10, 25, 50, 100];

function Database() {
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].value);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Memoize active tab info to prevent unnecessary recalculations
  const activeTabInfo = useMemo(
    () => TABS_CONFIG.find((tab) => tab.value === activeTab),
    [activeTab]
  );

  // Handle tab change and reset search
  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setSearchTerm("");
  };

  // Get color classes for styling
  const getColorClasses = (color, variant = "default") => {
    const colorMap = {
      blue: {
        default: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        active: "bg-blue-600 text-white",
        accent: "text-blue-600",
      },
      purple: {
        default: "bg-purple-100 text-purple-700 hover:bg-purple-200",
        active: "bg-purple-600 text-white",
        accent: "text-purple-600",
      },
      green: {
        default: "bg-green-100 text-green-700 hover:bg-green-200",
        active: "bg-green-600 text-white",
        accent: "text-green-600",
      },
      yellow: {
        default: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        active: "bg-yellow-600 text-white",
        accent: "text-yellow-600",
      },
    };
    return colorMap[color]?.[variant] || "";
  };

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {TABS_CONFIG.map((tab) => {
              const isActive = activeTab === tab.value;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? getColorClasses(tab.color, "active")
                      : getColorClasses(tab.color, "default")
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTabInfo?.label.toLowerCase()}...`}
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Entries per page */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Show:</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className=" rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ENTRIES_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm font-medium text-gray-700">entries</span>
            </div>
          </div>
        </div>

        {/* Database List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div
            className={`p-4 ${getColorClasses(activeTabInfo?.color, "active")}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center space-x-2">
                {activeTabInfo?.icon && (
                  <activeTabInfo.icon className="w-5 h-5" />
                )}
                <span>{activeTabInfo?.label} Database</span>
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <DatabaseList
              activeTab={activeTab}
              searchTerm={searchTerm}
              entriesPerPage={entriesPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Database;
