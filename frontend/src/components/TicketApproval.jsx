import { FaCheck, FaTimes, FaChevronDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import AssignedTo from "./AssignedTo";

function TicketApproval({ tickets, setTickets }) {
  const token = localStorage.getItem("token");

  const [approvalAssignRole, setApprovalAssignRole] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/getalltickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const pendingTickets = res.data.filter(
          (ticket) =>
            ticket.status === "Pending" || ticket.status === "Awaiting Approval"
        );
        setTickets(pendingTickets);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to fetch tickets for approval. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTickets();
    } else {
      setError("Authentication token missing. Please log in.");
      setLoading(false);
    }
  }, [token, setTickets]);

  const handleSubmit = async (ticketNo, ticketId) => {
    setMessage("");
    setMessageType("");
    const assignedTo = approvalAssignRole[ticketId];
    if (!assignedTo) {
      setMessage("Please select a team to assign the ticket.");
      setMessageType("error");
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

      setMessage("Ticket assigned successfully!");
      setMessageType("success");
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      );
      setApprovalAssignRole((prev) => {
        const newState = { ...prev };
        delete newState[ticketId];
        return newState;
      });
    } catch (err) {
      console.error("Error assigning ticket:", err);
      setMessage(
        err.response?.data?.message ||
          "Failed to assign ticket. Please try again."
      );
      setMessageType("error");
    }
  };

  const handleDelete = async (ticketId) => {
    setMessage("");
    setMessageType("");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setMessage("Ticket deleted successfully!");
      setMessageType("success");
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      );
    } catch (err) {
      console.error("Error deleting ticket:", err);
      setMessage(
        err.response?.data?.message ||
          "Failed to delete ticket. Please try again."
      );
      setMessageType("error");
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticketNo.toString().includes(searchTerm) ||
      (ticket.category &&
        ticket.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.status &&
        ticket.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.priority &&
        ticket.priority.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusColors = {
    "In Progress": "bg-blue-500",
    "On hold": "bg-yellow-500",
    Closed: "bg-gray-500",
    Pending: "bg-red-500",
    "Awaiting Approval": "bg-orange-500",
    Resolved: "bg-green-500",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700 text-lg">
        Loading tickets for approval...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-600 text-lg font-medium">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
        Ticket Approval
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Find ticket by number, category, or status..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <span>Show:</span>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none bg-white pr-8"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>Entries</span>
        </div>
      </div>
      {message && (
        <p
          className={`text-center font-medium mb-4 ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          {" "}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assign to
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.slice(0, entriesPerPage).map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    <a href="#" className="hover:underline">
                      {ticket.ticketNo}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {ticket.category || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[ticket.status] || "bg-gray-500"
                      } text-white`}
                    >
                      {ticket.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                      ${
                                        ticket.priority === "High"
                                          ? "bg-red-100 text-red-800"
                                          : ticket.priority === "Urgent"
                                          ? "bg-purple-100 text-purple-800"
                                          : ticket.priority === "Medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                    >
                      {ticket.priority || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {ticket.date
                      ? new Date(ticket.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        title="Approve and Assign"
                        onClick={() =>
                          handleSubmit(ticket.ticketNo, ticket._id)
                        }
                        className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out transform hover:scale-110"
                      >
                        <FaCheck size={18} />
                      </button>
                      <button
                        title="Reject Ticket"
                        onClick={() => handleDelete(ticket._id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out transform hover:scale-110"
                      >
                        <FaTimes size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <AssignedTo
                      value={approvalAssignRole[ticket._id] || ""}
                      onChange={(newValue) =>
                        setApprovalAssignRole((prev) => ({
                          ...prev,
                          [ticket._id]: newValue,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No tickets awaiting approval.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TicketApproval;
