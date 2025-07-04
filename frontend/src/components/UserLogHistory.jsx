import React from "react";
import "../styles/userlog.css";

const logData = [
  {
    dateIn: "130821 / 0800",
    staffId: "XL000001",
    department: "OT",
    activity: "Create Team",
    dateOut: "130821 / 0815",
  },
  {
    dateIn: "130821 / 0805",
    staffId: "",
    department: "",
    activity: "",
    dateOut: "130821 / 0810",
  },
  {},
  {},
  {},
];

function UserLogHistory() {
  return (
    <div className="log-history-wrapper">
      <h2 className="log-title">User Log History</h2>

      <div className="log-controls">
        <label>
          Show:
          <select className="log-entries-dropdown">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          Entries
        </label>
      </div>

      <table className="log-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date/Sign InTime</th>
            <th>Staff ID</th>
            <th>Department</th>
            <th>Activity</th>
            <th>Date/Sign Out time</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((log, index) => (
            <tr key={index} className={index % 2 === 1 ? "gray-row" : ""}>
              <td>{index + 1}.</td>
              <td>{log.dateIn || ""}</td>
              <td>{log.staffId || ""}</td>
              <td>{log.department || ""}</td>
              <td>{log.activity || ""}</td>
              <td>{log.dateOut || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="log-footer">
        <span>Showing 1 to 5 of 5 entries</span>
        <div className="pagination">&laquo;&lt; 1 &gt;&raquo;</div>
      </div>
    </div>
  );
}

export default UserLogHistory;
