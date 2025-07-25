import axios from "axios";

function TicketDetails({ ticket, onClose, role }) {
  const token = localStorage.getItem("token");
  if (!ticket) return null;

  const isUser = role === "user";

  const hanldeUpdateClick = async () => {
    console.log(ticket.ticketNo);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/resolve/${
          ticket.ticketNo
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("update failed" + error);
    }
  };
  return (
    <div>
      <div>
        <h3>Ticket Details</h3>
        <p>
          <strong>Ticket No:</strong> {ticket.ticketNo}
        </p>
        <p>
          <strong>Name:</strong> {ticket.name}
        </p>
        <p>
          <strong>Department:</strong> {ticket.department}
        </p>
        <p>
          <strong>Subject:</strong> {ticket.subject}
        </p>
        <p>
          <strong>Category:</strong> {ticket.category}
        </p>
        <p>
          <strong>Type:</strong> {ticket.type}
        </p>
        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>
        <p>
          <strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Description:</strong> {ticket.description}
        </p>
        <div>
          <button onClick={onClose}>Close</button>
          {!isUser && <button onClick={hanldeUpdateClick}>Update</button>}
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
