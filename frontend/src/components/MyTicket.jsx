import { useEffect, useState } from "react";
import TicketDetails from "./TicketDetails";
import TeamCreationModal from "./TeamCreationModal";
import { FaSearch, FaTrash } from "react-icons/fa";
import axios from "axios";

function MyTicket({ tickets, setTickets }) {
  const token = localStorage.getItem("token");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamTicket, setTeamTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const handleTicketSelection = (ticketData) => {
    setSelectedTicket(ticketData);
  };

  const handleDelete = async (id) => {
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
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to fetch tickets. Please try again.");
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
    "In Progress": "bg-blue-500",
    "On hold": "bg-yellow-500",
    Closed: "bg-gray-500",
    Pending: "bg-red-500",
    Resolved: "bg-green-500",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700 text-lg">
        Loading tickets...
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
        My Tickets
      </h1>

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      {showTeamModal && (
        <TeamCreationModal
          ticket={teamTicket}
          onClose={() => setShowTeamModal(false)}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Find ticket by number, subject, or status..."
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
                  Subject
                </th>
                {role === "user" ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Support by
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Person In Charge
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.slice(0, entriesPerPage).map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                  onClick={() => handleTicketSelection(ticket)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {ticket.ticketNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {ticket.subject}
                  </td>

                  {role === "user" ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[ticket.status] || "bg-gray-500"
                          } text-white`}
                        >
                          {ticket.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {ticket.createdBy?.role || "User"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {ticket.date
                          ? new Date(ticket.date).toLocaleDateString()
                          : "-"}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {ticket.category || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[ticket.status] || "bg-gray-500"
                          } text-white`}
                        >
                          {ticket.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {ticket.assignedTo?.name || "Unassigned"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-3 justify-center">
                          <button
                            title="Delete"
                            onClick={(e) => handleDelete(ticket._id)}
                            className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out transform hover:scale-110"
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
                    colSpan={role === "user" ? 6 : 8}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No tickets found.
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
