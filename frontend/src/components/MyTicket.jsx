import { useEffect, useState } from "react";
import TicketDetails from "./TicketDetails";
import TeamCreationModal from "./TeamCreationModal";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlinePersonAdd } from "react-icons/md";
import axios from "axios";
import "../styles/myTicket.css";

function MyTicket({ tickets, setTickets }) {
  // const [tickets, setTickets] = useState([]);
  // console.log(tickets);

  const token = localStorage.getItem("token");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamTicket, setTeamTicket] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const handleTicketSelection = (ticketData) => {
    console.log(ticketData);
    setSelectedTicket(ticketData);
  };
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/my-tickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        // console.log(res.data);
        setTickets(res.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const renderStars = (count) => {
    return "★★★★★".split("").map((star, i) => (
      <span key={i} style={{ color: i < count ? "gold" : "gray" }}>
        {star}
      </span>
    ));
  };

  const statusColors = {
    "In Progress": "green",
    "On hold": "darkblue",
    Closed: "gray",
  };

  return (
    <div className="myticket-wrapper">
      <h2 className="title">List of Ticket</h2>
      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      <div className="controls">
        <div className="search-bar">
          <input type="text" placeholder="Find ticket" />
          <button>
            <FaSearch color="black" />
          </button>
        </div>

        <div className="show-entries">
          Show:
          <select>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          Entries
        </div>
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket No.</th>
            <th>Subject</th>
            {role === "user" ? (
              <>
                <th>Status</th>
                <th>Support by</th>
                <th>Date</th>
                <th>Rate</th>
              </>
            ) : (
              <>
                <th>Category</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
                <th>Person In Charge</th>
                <th>Action</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} onClick={() => handleTicketSelection(ticket)}>
              <td style={{ color: "blue", cursor: "pointer" }}>
                {ticket.ticketNo}
              </td>
              <td style={{ cursor: "pointer" }}>{ticket.subject}</td>

              {role === "user" ? (
                <>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: statusColors[ticket.status] || "gray",
                        color: "white",
                        padding: "2px 10px",
                        borderRadius: "10px",
                      }}
                    >
                      {ticket.status || "Pending"}
                    </span>
                  </td>
                  <td>{ticket.createdBy?.role || "User"}</td>
                  <td>
                    {ticket.date
                      ? new Date(ticket.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{renderStars(ticket.rating || 0)}</td>
                </>
              ) : (
                <>
                  <td>{ticket.category || "-"}</td>
                  <td>{ticket.priority || "-"}</td>
                  <td>
                    {ticket.date
                      ? new Date(ticket.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: statusColors[ticket.status] || "gray",
                        color: "white",
                        padding: "2px 10px",
                        borderRadius: "10px",
                      }}
                    >
                      {ticket.status || "Pending"}
                    </span>
                  </td>
                  <td>{ticket.assignedTo?.username || "unassigned"}</td>
                  <td className="action-icons">
                    <button
                      title="View"
                      onClick={() => {
                        setTeamTicket(ticket);
                        setShowTeamModal(true);
                      }}
                    >
                      <MdOutlinePersonAdd size={20} color="black" />
                    </button>

                    <button
                      title="Edit"
                      onClick={() => console.log("Edit", ticket._id)}
                    >
                      <FaEdit size={14} color="black" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => console.log("Delete", ticket._id)}
                    >
                      <FaTrash size={14} color="black" />
                    </button>
                  </td>
                  {showTeamModal && (
                    <TeamCreationModal
                      ticket={teamTicket}
                      onClose={() => setShowTeamModal(false)}
                    />
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="footer-section">
        <span>
          Showing 1 to {tickets.length} of {tickets.length} entries
        </span>
        <span className="pagination-controls">≪ 1 ≫</span>
      </div> */}
    </div>
  );
}

export default MyTicket;
