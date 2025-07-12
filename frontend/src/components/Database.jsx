import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/database.css";
import DatabaseList from "./DatabaseList";

const Database = () => {
  const tabs = [
    { label: "User", value: "user" },
    { label: "Operation Team", value: "operation" },
    { label: "Technical Support", value: "technical" },
  ];

  const [activeTab, setActiveTab] = useState("user");
  const handleRoleSelect = (tab) => {
    setActiveTab(tab);
    console.log(activeTab);
  };
  return (
    <div className="database-wrapper">
      <h2 className="database-title">Database</h2>

      <div className="database-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab-btn ${activeTab === tab.value ? "active" : ""}`}
            onClick={() => handleRoleSelect(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="database-controls">
        <div className="search-bar">
          <input type="text" placeholder="Find User" />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="entry-control">
          <label>Show:</label>
          <select>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      <DatabaseList activeTab={activeTab} />

      {/* <div className="database-footer">
        <span>Showing 1 to 3 of 3 entries</span>
        <span className="pagination">&laquo; &lt; 1 &gt; &raquo;</span>
      </div> */}
    </div>
  );
};

export default Database;
