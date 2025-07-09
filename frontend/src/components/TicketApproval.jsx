import { FaCheck, FaTimes, FaChevronDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "../styles/ticketApproval.css";
import { useEffect, useState } from "react";
import axios from "axios";

function TicketApproval({ fetchTickets, tickets }) {
  const [approvalAssignRole, setApprovalAssignRole] = useState({
    assignedTo: "",
  });
  useEffect(() => {
    fetchTickets();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApprovalAssignRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    if (!approvalAssignRole) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/op_approvals`,
        approvalAssignRole,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      alert("Assigned successfully!");
    } catch (error) {
      console.error("Error assigning:", error.response?.data || error.message);
      alert("Failed to assign.");
    }
  };

  return (
    <div className="approval-wrapper">
      <h2 className="approval-heading">Ticket Approval</h2>

      {/* Controls */}
      <div className="approval-controls">
        {/* Search Section */}
        <div className="search-bar">
          <input type="text" placeholder="Find ticket" />
          <button>
            <FaSearch color="black" />
          </button>
        </div>

        {/* Show Entries Section */}
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

      {/* Table */}
      <table className="approval-table">
        <thead>
          <tr>
            <th>Ticket No.</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Action</th>
            <th>Assign to</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>
                <a href="#" className="ticket-link">
                  {ticket.ticketNo}
                </a>
              </td>
              <td>{ticket.subject}</td>
              <td>{ticket.category}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.date.split("T")[0]}</td>
              <td className="action-icons">
                <button style={{ padding: "0px 10px" }} onClick={handleSubmit}>
                  <FaCheck className="approve" />
                </button>
                <button className="reject">X</button>
              </td>
              <td>
                <select
                  name="assignedTo"
                  value={approvalAssignRole.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="technical">Technical Team</option>
                  <option value="operation">Operation Team</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="approval-footer">
        <span>
          Showing 1 to {tickets.length} of {tickets.length} entries
        </span>
        <span className="pagination">≪ 1 ≫</span>
      </div>
    </div>
  );
}

export default TicketApproval;
