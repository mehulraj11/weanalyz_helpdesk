import { FaCheck, FaTimes, FaChevronDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "../styles/ticketApproval.css";

function TicketApproval() {
  const tickets = [
    {
      id: 1234,
      subject: "Login issue",
      category: "Access issue",
      priority: "High",
      date: "13/08/21",
    },
    {
      id: 1124,
      subject: "New ticket issue",
      category: "Access issue",
      priority: "Medium",
      date: "14/08/21",
    },
    {
      id: 1224,
      subject: "New request",
      category: "Feedback",
      priority: "Low",
      date: "13/08/21",
    },
    {
      id: 1244,
      subject: "Ticket submission",
      category: "Ticketing",
      priority: "High",
      date: "14/08/21",
    },
    {
      id: 1114,
      subject: "Login issue",
      category: "Access issue",
      priority: "High",
      date: "3/08/21",
    },
  ];

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
            <tr key={ticket.id}>
              <td>
                <a href="#" className="ticket-link">
                  {ticket.id}
                </a>
              </td>
              <td>{ticket.subject}</td>
              <td>{ticket.category}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.date}</td>
              <td className="action-icons">
                <FaCheck className="approve" />
                <FaTimes className="reject" />
              </td>
              <td>
                <button className="assign-btn">
                  <FaChevronDown />
                </button>
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
