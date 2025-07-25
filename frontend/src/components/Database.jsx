import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DatabaseList from "./DatabaseList";

const Database = () => {
  const tabs = [
    { label: "User", value: "user" },
    { label: "Operation Team", value: "operation" },
    { label: "Technical Support", value: "technical" },
    { label: "Admin", value: "admin" },
  ];

  const [activeTab, setActiveTab] = useState("user");
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleTabSelect = (tabValue) => {
    setActiveTab(tabValue);
    setSearchTerm("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
        Database Management
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabSelect(tab.value)}
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 ease-in-out
                        ${
                          activeTab === tab.value
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-blue-700"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder={`Find ${activeTab} by ID, Name, etc.`}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2 text-gray-700">
          <span>Show:</span>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none bg-white pr-8"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      <DatabaseList
        activeTab={activeTab}
        searchTerm={searchTerm}
        entriesPerPage={entriesPerPage}
      />
    </div>
  );
};

export default Database;
