import { FaCheck, FaTimes, FaChevronDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "../styles/ticketApproval.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AssignedTo from "./AssignedTo";

function TicketApproval({ tickets, setTickets }) {
  const token = localStorage.getItem("token");

  const [approvalAssignRole, setApprovalAssignRole] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/getalltickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTickets(res.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);
  const handleSubmit = async (ticketNo, ticketId) => {
    const assignedTo = approvalAssignRole[ticketId];
    if (!assignedTo) {
      alert("Please select a team first!");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/op_approvals`,
        { assignedTo, ticketNo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert("Assigned successfully!");
    } catch (error) {
      console.error("Error assigning:", error);
      alert("Failed to assign.");
    }
  };

  const handleDelete = (ticketNo) => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket.ticketNo !== ticketNo
    );
    setTickets(updatedTickets);
  };

  return (
    <div className="approval-wrapper">
      <h2 className="approval-heading">Ticket Approval</h2>
      <div className="approval-controls">
        <div className="search-bar">
          <input type="text" placeholder="Find ticket" />
          <button>
            <FaSearch color="black" />
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
                <button
                  style={{ padding: "0px 10px" }}
                  onClick={() => handleSubmit(ticket.ticketNo, ticket._id)}
                >
                  <FaCheck className="approve" />
                </button>

                <button
                  className="reject"
                  onClick={() => handleDelete(ticket.ticketNo)}
                >
                  X
                </button>
              </td>
              <td>
                <AssignedTo
                  value={approvalAssignRole[ticket._id] || ""}
                  onChange={(newValue) =>
                    setApprovalAssignRole((prev) => ({
                      ...prev,
                      [ticket._id]: newValue,
                    }))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketApproval;
