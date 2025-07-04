
import React from "react";
import "../styles/ticketDetails.css";

function TicketDetails({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Ticket Details</h3>
        <p><strong>Ticket No:</strong> {ticket.ticketNo}</p>
        <p><strong>Name:</strong> {ticket.name}</p>
        <p><strong>Department:</strong> {ticket.department}</p>
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Category:</strong> {ticket.category}</p>
        <p><strong>Type:</strong> {ticket.type}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        {ticket.image && (
          <img src={`uploads/${ticket.image}`} alt="Attachment" style={{ width: "100px" }} />
        )}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TicketDetails;
