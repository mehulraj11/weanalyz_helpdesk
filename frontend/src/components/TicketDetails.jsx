import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa"; // For the close icon

function TicketDetails({ ticket, onClose, role }) {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // If ticket is null, don't render anything
  if (!ticket) return null;

  const isUser = role === "user"; // Determine if the current user is a 'user' role

  const handleUpdateClick = async () => {
    setMessage("");
    setMessageType("");
    try {
      // API call to update the ticket status (e.g., resolve it)
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/resolve/${
          ticket.ticketNo
        }`,
        {}, // Empty body if only status is updated via URL param
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message || "Ticket updated successfully!");
      setMessageType("success");
      // Optionally, you might want to call a prop function to refresh the parent list
      // and then close the modal after a short delay.
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Ticket update failed:", err);
      setMessage(err.response?.data?.message || "Failed to update ticket.");
      setMessageType("error");
    }
  };

  return (
    // Modal Overlay - fixed position, covers entire screen with a semi-transparent background
    <div className="w-1/2 h-1/2 fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal Content Card */}
      <div
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg relative
                      transform transition-all duration-300 scale-100 opacity-100
                      max-h-[90vh] overflow-y-auto"
      >
        {" "}
        {/* Added max-height and overflow for long content */}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
          title="Close"
        >
          <FaTimes size={24} />
        </button>
        {/* Title */}
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4 border-gray-200">
          Ticket Details
        </h3>
        {/* Ticket Information Display */}
        <div className="space-y-3 text-lg text-gray-700 mb-6">
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
            <strong>Category:</strong> {ticket.category || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {ticket.type || "N/A"}
          </p>
          <p>
            <strong>Priority:</strong> {ticket.priority || "N/A"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full
                          ${
                            ticket.status === "Resolved"
                              ? "bg-green-500"
                              : ticket.status === "In Progress"
                              ? "bg-blue-500"
                              : ticket.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          } text-white`}
            >
              {ticket.status || "N/A"}
            </span>
          </p>
          <p>
            <strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            <span className="block mt-1 p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
              {ticket.description}
            </span>
          </p>
        </div>
        {/* Message Display */}
        {message && (
          <p
            className={`text-center font-medium mb-4 ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-700 font-semibold border border-gray-300
                       hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Close
          </button>
          {!isUser && (
            <button
              onClick={handleUpdateClick}
              className="px-6 py-2 rounded-lg text-white font-semibold
                         bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700
                         focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2
                         transition duration-300 ease-in-out transform hover:-translate-y-0.5
                         shadow-md"
            >
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
