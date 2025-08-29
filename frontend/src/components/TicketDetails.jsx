import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

function TicketDetails({ ticket, onClose, role }) {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const dialogRef = useRef(null);

  if (!ticket) return null;

  const isUser = role;

  const handleUpdateClick = async () => {
    setMessage("");
    setMessageType("");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/resolve/${
          ticket.ticketNo
        }`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Ticket updated successfully!");
      setMessageType("success");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update ticket.");
      setMessageType("error");
    }
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-details-title"
    >
      <div className="absolute inset-0  backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-[95vw] max-w-2xl bg-white rounded-xl shadow-2xl outline-none"
      >
        <div className="sticky top-0 bg-white rounded-t-xl px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3
            id="ticket-details-title"
            className="text-2xl font-bold text-gray-900"
          >
            Ticket Details
          </h3>
        </div>

        <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">
          <div className="space-y-3 text-base text-gray-800">
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
                className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
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
              <strong>Date:</strong>{" "}
              {ticket.date ? new Date(ticket.date).toLocaleDateString() : "-"}
            </p>
            <div>
              <strong>Description:</strong>
              <span className="block mt-2 p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
                {ticket.description}
              </span>
            </div>
          </div>

          {message && (
            <p
              className={`text-center font-medium mt-6 ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </div>

        <div className="sticky bottom-0 bg-white rounded-b-xl px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-gray-700 font-semibold border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          >
            Close
          </button>
          {!isUser == "user" && (
            <button
              onClick={handleUpdateClick}
              className="px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition cursor-pointer"
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
