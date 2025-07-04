import React, { useState } from "react";
import { FaSearch, FaTrash, FaPen } from "react-icons/fa";
import "../styles/database.css";

const Database = () => {
  const [activeTab, setActiveTab] = useState("User");

  const data = [
    { id: "ABC123", name: "Abu", department: "IT", specialty: "Software" },
    { id: "ABC124", name: "Ahmad", department: "Software", specialty: "Networking" },
    { id: "ABC125", name: "Ali", department: "Technical", specialty: "Hardware" },
  ];

  return (
    <div className="database-wrapper">
      <h2 className="database-title">Database</h2>

      <div className="database-tabs">
        {["User", "Operation Team", "Technical Support"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="database-controls">
        <div className="search-bar">
          <input type="text" placeholder="Find ticket" />
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

      <table className="database-table">
        <thead>
          <tr>
            <th></th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Speciality</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={entry.id} className={index % 2 === 0 ? "light-row" : "dark-row"}>
              <td><input type="checkbox" /></td>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.department}</td>
              <td>{entry.specialty}</td>
              <td className="actions">
                {/* <FaPen className="edit-icon" /> */}
                {/* <FaTrash className="delete-icon" /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="database-footer">
        <span>Showing 1 to 3 of 3 entries</span>
        <span className="pagination">&laquo; &lt; 1 &gt; &raquo;</span>
      </div>
    </div>
  );
};

export default Database;
