import {
  FaCheck,
  FaTimes,
  FaSearch,
  FaEye,
  FaClipboardCheck,
} from "react-icons/fa";
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

  // Fetch pending tickets
  useEffect(() => {
    fetchPendingTickets();
  }, [token]);

  const fetchPendingTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/verifyticket`,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  // Handle ticket approval and assignment
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
          headers: { Authorization: `Bearer ${token}` },
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

  // Handle ticket rejection
  const handleDelete = async (ticketId) => {
    if (!confirm("Are you sure you want to reject this ticket?")) return;

    setMessage("");
    setMessageType("");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessage("Ticket rejected successfully!");
      setMessageType("success");
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      );
    } catch (err) {
      console.error("Error deleting ticket:", err);
      setMessage(
        err.response?.data?.message ||
          "Failed to reject ticket. Please try again."
      );
      setMessageType("error");
    }
  };

  // Filter tickets based on search
  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ticket.ticketNo.toString().includes(searchTerm) ||
      (ticket.category &&
        ticket.category.toLowerCase().includes(searchLower)) ||
      (ticket.status && ticket.status.toLowerCase().includes(searchLower)) ||
      (ticket.priority &&
        ticket.priority.toLowerCase().includes(searchLower)) ||
      (ticket.subject && ticket.subject.toLowerCase().includes(searchLower))
    );
  });

  // Status styling helper
  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-red-100 text-red-800 border-red-200",
      "Awaiting Approval": "bg-orange-100 text-orange-800 border-orange-200",
      "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Priority styling helper
  const getPriorityStyle = (priority) => {
    const styles = {
      High: "bg-red-100 text-red-800 border-red-200",
      Urgent: "bg-purple-100 text-purple-800 border-purple-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return styles[priority] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tickets for approval...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow border max-w-sm text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchPendingTickets}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg  ${
              messageType === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow  p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Entries per page */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show:</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className=" rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          {/* Stats */}
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ticket #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Assign To
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.slice(0, entriesPerPage).map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                        #{ticket.ticketNo}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {ticket.subject || "No subject"}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {ticket.category || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityStyle(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority || "Low"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded border ${getStatusStyle(
                          ticket.status
                        )}`}
                      >
                        {ticket.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {ticket.date
                        ? new Date(ticket.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="w-40">
                        <AssignedTo
                          value={approvalAssignRole[ticket._id] || ""}
                          onChange={(newValue) =>
                            setApprovalAssignRole((prev) => ({
                              ...prev,
                              [ticket._id]: newValue,
                            }))
                          }
                          className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() =>
                            handleSubmit(ticket.ticketNo, ticket._id)
                          }
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="Approve and Assign"
                        >
                          <FaCheck size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(ticket._id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Reject Ticket"
                        >
                          <FaTimes size={14} />
                        </button>
                        <button
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          title="View Details"
                        >
                          <FaEye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center">
                      <div className="text-gray-400">
                        <FaClipboardCheck className="mx-auto text-4xl mb-4" />
                        <p className="text-lg font-medium text-gray-600 mb-2">
                          All caught up!
                        </p>
                        <p className="text-sm text-gray-500">
                          No tickets awaiting approval
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketApproval;
