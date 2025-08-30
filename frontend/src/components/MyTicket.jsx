import { useEffect, useState } from "react";
import TicketDetails from "./TicketDetails";
import {
  FaSearch,
  FaTrash,
  FaEye,
  FaFilter,
  FaTicketAlt,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";

function MyTicket({ tickets, setTickets }) {
  const token = localStorage.getItem("token");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigned, setAssigned] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const handleTicketSelection = (ticketData) => {
    setSelectedTicket(ticketData);
  };

  const getSpecificData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/specificdata/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssigned(res.data.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/deleteticket/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setTickets((prev) => prev.filter((t) => t._id !== id));
      console.log("Ticket deleted:", id);
    } catch (error) {
      console.error("Error deleting ticket:", error.message);
    }
  };

  // In MyTicket.jsx, update the useEffect:
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
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

        // Handle both response structures
        if (res.data.tickets && Array.isArray(res.data.tickets)) {
          // If response has tickets and users structure
          setTickets(res.data.tickets);
          if (res.data.users) {
            setAssigned(res.data.users);
          }
        } else if (Array.isArray(res.data)) {
          // If response is just tickets array
          setTickets(res.data);
        } else {
          setTickets([]);
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to fetch tickets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getSpecificData();
    if (token) {
      fetchTickets();
    } else {
      setError("Authentication token missing. Please log in.");
      setLoading(false);
    }
  }, [token, setTickets]);

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticketNo.toString().includes(searchTerm) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.category &&
        ticket.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.priority &&
        ticket.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.assignedTo?.name &&
        ticket.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusColors = {
    "In Progress": "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200",
    "On hold":
      "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-yellow-200",
    Closed: "bg-gradient-to-r from-gray-500 to-gray-600 shadow-gray-200",
    Pending: "bg-gradient-to-r from-red-500 to-red-600 shadow-red-200",
    Resolved: "bg-gradient-to-r from-green-500 to-green-600 shadow-green-200",
  };

  const priorityColors = {
    High: "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200",
    Urgent:
      "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200",
    Medium:
      "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200",
    Low: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading your tickets...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-red-200 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-2">
          <FaTicketAlt className="text-4xl text-blue-600 mr-4" />
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            My Tickets
          </h1>
        </div>
        <p className="text-center text-gray-600 text-lg">
          Manage and track all your support tickets
        </p>
      </div>

      {/* Modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelectedTicket(null);
          }}
          tabIndex={-1}
        >
          <div
            className="absolute inset-0"
            onClick={() => setSelectedTicket(null)}
          />
          <div className="relative z-10 max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto rounded-2xl">
            <TicketDetails
              ticket={selectedTicket}
              onClose={() => setSelectedTicket(null)}
            />
          </div>
        </div>
      )}

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
              placeholder="Search by ticket number, subject, status, or assignee..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-500"
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
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer font-medium text-gray-700"
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
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="font-semibold">
              Total: {filteredTickets.length}
            </span>
          </div>
          {role === "user" && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-semibold">My Tickets</span>
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Ticket No.
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                {role === "user" ? (
                  <>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Resolved by
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="px-6 py-5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTickets.slice(0, entriesPerPage).map((ticket, index) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group"
                  onClick={() => handleTicketSelection(ticket)}
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        #{ticket.ticketNo}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ticket.subject}
                    </div>
                  </td>

                  {role === "user" ? (
                    <>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full text-white shadow-lg ${
                            statusColors[ticket.status] ||
                            "bg-gradient-to-r from-gray-500 to-gray-600"
                          }`}
                        >
                          {ticket.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                        {ticket.createdBy?.role || "User"}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                        {ticket.date
                          ? new Date(ticket.date).toLocaleDateString()
                          : "-"}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border">
                          {ticket.category || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
                            priorityColors[ticket.priority] ||
                            "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200"
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
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full text-white shadow-lg ${
                            statusColors[ticket.status] ||
                            "bg-gradient-to-r from-gray-500 to-gray-600"
                          }`}
                        >
                          {ticket.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                            {ticket.assignedTo?.name
                              ? ticket.assignedTo.name.charAt(0).toUpperCase()
                              : "?"}
                          </div>
                          {ticket.assignedTo?.name || "Unassigned"}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            title="View Details"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTicketSelection(ticket);
                            }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                          >
                            <FaEye size={14} />
                          </button>
                          <button
                            title="Delete Ticket"
                            onClick={(e) => handleDelete(ticket._id, e)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td
                    colSpan={role === "user" ? 5 : 7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-6xl text-gray-300 mb-4">🎫</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No tickets found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search criteria or create a new
                        ticket.
                      </p>
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
        Showing {Math.min(entriesPerPage, filteredTickets.length)} of{" "}
        {filteredTickets.length} tickets
      </div>
    </div>
  );
}

export default MyTicket;
