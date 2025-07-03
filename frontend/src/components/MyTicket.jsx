import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myTicket.css";

function MyTicket() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tickets/getalltickets");
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
            <tr key={ticket._id}>
              <td>
                <a href="#" style={{ color: "blue" }}>
                  {ticket.ticketNo}
                </a>
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
              <td>{ticket.createdBy?.role || "User"}</td> {/* Fallback */}
              <td>
                {ticket.date ? new Date(ticket.date).toLocaleDateString() : "-"}
              </td>
              <td>{renderStars(ticket.rating || 0)}</td>{" "}
              {/* Will render 0 stars for now */}
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

      <footer className="footer-area">Footer Area</footer>
    </div>
  );
}

export default MyTicket;
