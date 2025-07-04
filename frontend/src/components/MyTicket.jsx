import React, { useEffect, useState } from "react";
import TicketDetails from "./TicketDetails"; // Make sure this path is correct
import axios from "axios";
import "../styles/myTicket.css";

function MyTicket() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/tickets/getalltickets"
        );
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

      {/* Modal when ticket is selected */}
      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      <div className="controls">
        <div className="search-bar">
          <input type="text" placeholder="Find ticket" />
          <div>🔍</div>
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
            <th>Status</th>
            <th>Support by</th>
            <th>Date</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket._id}
              onClick={() => setSelectedTicket(ticket)}
              style={{ cursor: "pointer" }}
            >
              <td>
                <span style={{ color: "blue" }}>{ticket.ticketNo}</span>
              </td>
              <td>{ticket.subject}</td>
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
                {ticket.date ? new Date(ticket.date).toLocaleDateString() : "-"}
              </td>
              <td>{renderStars(ticket.rating || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer-section">
        <span>
          Showing 1 to {tickets.length} of {tickets.length} entries
        </span>
        <span className="pagination-controls">≪ 1 ≫</span>
      </div>
    </div>
  );
}

export default MyTicket;
