import { FaCheck, FaTimes, FaSearch, FaTicketAlt, FaFilter, FaEye, FaSpinner, FaClipboardCheck } from "react-icons/fa";
import { 
  MdKeyboardArrowDown, 
  MdApproval, 
  MdAssignmentTurnedIn,
  MdWarning,
  MdCheckCircle 
} from "react-icons/md";
import { IoCheckmarkCircle, IoWarning, IoInformationCircle } from "react-icons/io5";
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
    "In Progress": "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200",
    "On hold": "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-yellow-200",
    Closed: "bg-gradient-to-r from-gray-500 to-gray-600 shadow-gray-200",
    Pending: "bg-gradient-to-r from-red-500 to-red-600 shadow-red-200",
    "Awaiting Approval": "bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-200",
    Resolved: "bg-gradient-to-r from-green-500 to-green-600 shadow-green-200",
  };

  const priorityColors = {
    High: "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200",
    Urgent: "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200",
    Medium: "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200",
    Low: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading tickets for approval...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-red-200 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Tickets</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-2xl shadow-xl mr-4">
              <MdApproval className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Ticket Approval
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review and approve pending support tickets, assign them to appropriate teams
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search by ticket number, category, status, or priority..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 text-gray-700 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Entries Control */}
            <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-700 font-medium">Show:</span>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer font-medium text-gray-700"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-700 font-medium">entries</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-semibold">Pending: {filteredTickets.length}</span>
            </div>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-8 p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
            messageType === "success" 
              ? "bg-green-50/80 border-green-200 text-green-800" 
              : "bg-red-50/80 border-red-200 text-red-800"
          }`}>
            <div className="flex items-center">
              {messageType === "success" ? (
                <IoCheckmarkCircle className="mr-3 text-lg" />
              ) : (
                <IoWarning className="mr-3 text-lg" />
              )}
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Ticket No.
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Assign To
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTickets.slice(0, entriesPerPage).map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          #{ticket.ticketNo}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {ticket.category || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full text-white shadow-lg ${
                          statusColors[ticket.status] || "bg-gradient-to-r from-gray-500 to-gray-600"
                        }`}
                      >
                        {ticket.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
                          priorityColors[ticket.priority] || "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {ticket.priority || "Low"}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                      {ticket.date
                        ? new Date(ticket.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          title="Approve and Assign"
                          onClick={() => handleSubmit(ticket.ticketNo, ticket._id)}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                        >
                          <FaCheck size={14} />
                        </button>
                        <button
                          title="Reject Ticket"
                          onClick={() => handleDelete(ticket._id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                        >
                          <FaTimes size={14} />
                        </button>
                        <button
                          title="View Details"
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                        >
                          <FaEye size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="w-48">
                        <AssignedTo
                          value={approvalAssignRole[ticket._id] || ""}
                          onChange={(newValue) =>
                            setApprovalAssignRole((prev) => ({
                              ...prev,
                              [ticket._id]: newValue,
                            }))
                          }
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 text-gray-700"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-16 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-6xl text-gray-300 mb-4">✅</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">All caught up!</h3>
                        <p className="text-gray-500">No tickets awaiting approval at the moment.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Showing {Math.min(entriesPerPage, filteredTickets.length)} of {filteredTickets.length} tickets awaiting approval
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <IoInformationCircle className="mr-2 text-orange-600" />
            Approval Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <MdCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Approve:</strong> Assign tickets to appropriate teams for resolution</span>
            </div>
            <div className="flex items-start space-x-2">
              <MdWarning className="text-red-500 mt-1 flex-shrink-0" />
              <span><strong>Reject:</strong> Remove invalid or duplicate tickets</span>
            </div>
            <div className="flex items-start space-x-2">
              <MdAssignmentTurnedIn className="text-blue-500 mt-1 flex-shrink-0" />
              <span><strong>Assign:</strong> Select the most suitable team based on ticket category</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketApproval;
