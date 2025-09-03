import { useEffect, useState } from "react";
import TicketDetails from "./TicketDetails";
import { FaSearch, FaTrash, FaEye, FaTicketAlt } from "react-icons/fa";
import axios from "axios";

function MyTicket({ tickets, setTickets }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, [token]);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/my-tickets`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const ticketsData = res.data.tickets || res.data || [];
      setTickets(ticketsData);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Failed to fetch tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/deleteticket/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket. Please try again.");
    }
  };

  // Filter tickets based on search term
  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ticket.ticketNo.toString().includes(searchTerm) ||
      ticket.subject.toLowerCase().includes(searchLower) ||
      ticket.status.toLowerCase().includes(searchLower) ||
      (ticket.category &&
        ticket.category.toLowerCase().includes(searchLower)) ||
      (ticket.priority &&
        ticket.priority.toLowerCase().includes(searchLower)) ||
      (ticket.assignedTo?.name &&
        ticket.assignedTo.name.toLowerCase().includes(searchLower))
    );
  });

  // Status styling helper
  const getStatusStyle = (status) => {
    const styles = {
      "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
      "On hold": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Closed: "bg-gray-100 text-gray-800 border-gray-200",
      Pending: "bg-red-100 text-red-800 border-red-200",
      Resolved: "bg-green-100 text-green-800 border-green-200",
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tickets...</p>
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
            onClick={fetchTickets}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6">
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 p-4">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedTicket(null)}
          />
          <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <TicketDetails
              ticket={selectedTicket}
              onClose={() => setSelectedTicket(null)}
            />
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow  p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-10 pr-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {/* Results counter */}
        <div className="mt-3 text-sm text-gray-600">
          Showing {Math.min(entriesPerPage, filteredTickets.length)} of{" "}
          {entriesPerPage} tickets
        </div>
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
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                {role !== "user" && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Assignee
                    </th>
                  </>
                )}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.slice(0, entriesPerPage).map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      #{ticket.ticketNo}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {ticket.subject}
                    </div>
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

                  {role !== "user" && (
                    <>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityStyle(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority || "Low"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                            {ticket.assignedTo?.name
                              ? ticket.assignedTo.name.charAt(0).toUpperCase()
                              : "?"}
                          </div>
                          <span className="truncate max-w-20">
                            {ticket.assignedTo?.name || "Unassigned"}
                          </span>
                        </div>
                      </td>
                    </>
                  )}

                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicket(ticket);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </button>
                      {role !== "user" && (
                        <button
                          onClick={(e) => handleDelete(ticket._id, e)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Delete Ticket"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td
                    colSpan={role === "user" ? 5 : 7}
                    className="px-4 py-12 text-center"
                  >
                    <div className="text-gray-400">
                      <FaTicketAlt className="mx-auto text-4xl mb-4" />
                      <p className="text-lg font-medium text-gray-600 mb-2">
                        No tickets found
                      </p>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search criteria
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
  );
}

export default MyTicket;
