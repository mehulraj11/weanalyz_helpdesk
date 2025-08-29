import { useState, useEffect } from "react";
import graph from "../images/Group.png";
import opertaion from "../images/691142.png";
import technical from "../images/soporte-tecnico-icono-png-12.png";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";

function Dashboard() {
  const [ticketCount, setTicketCount] = useState({
    total: "",
    resolved: "",
    pending: "",
    inProgress: "",
    op_team: "",
    tech_team: "",
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicketCount = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/${
            user.role === "admin" ? "count" : "userticketcount"
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setTicketCount({
          total: res.data.totalTickets,
          resolved: res.data.resolvedTickets,
          pending: res.data.pendingTickets,
          inProgress: res.data.inProgressTickets,
          op_team: res.data.op_team,
          tech_team: res.data.tech_team,
        });
      } catch (err) {
        console.error("Error fetching ticket count:", err.message);
        setFetchError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTicketCount();
    } else {
      setFetchError("Authentication token missing. Please log in.");
      setLoading(false);
    }
  }, [token, user.role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700 text-lg">
        Loading dashboard data...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center h-full text-red-600 text-lg font-medium">
        Error: {fetchError}
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 lg:p-12 max-w-screen-xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-sm">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {[
          {
            label: "Total Tickets",
            value: ticketCount.total,
            color: "text-blue-600",
          },
          {
            label: "Solved",
            value: ticketCount.resolved,
            color: "text-green-600",
          },
          {
            label: "Awaiting Approval",
            value: ticketCount.pending,
            color: "text-yellow-600",
          },
          {
            label: "In Progress",
            value: ticketCount.inProgress,
            color: "text-purple-600",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105 cursor-default"
            role="region"
            aria-label={`${label}: ${value}`}
          >
            <p className="text-lg font-semibold text-gray-700 mb-3">{label}</p>
            <p className={`text-5xl font-extrabold ${color} drop-shadow-md`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {role !== "user" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div
            className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center transition-transform duration-300 hover:scale-105"
            aria-label="Ticket Distribution Graph"
          >
            <img
              src={graph}
              alt="Ticket Distribution Graph"
              className="max-w-full h-auto rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x300/e0e0e0/555555?text=Graph+Placeholder";
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                label: "Technical Supports",
                count: ticketCount.tech_team,
                img: technical,
                alt: "Technical Team Icon",
                placeholderText: "Tech",
              },
              {
                label: "Operation Team",
                count: ticketCount.op_team,
                img: opertaion,
                alt: "Operation Team Icon",
                placeholderText: "Ops",
              },
            ].map(({ label, count, img, alt, placeholderText }) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-default"
                aria-label={`${label} count: ${count}`}
              >
                <img
                  src={img}
                  alt={alt}
                  className="w-24 h-24 mb-5 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/96x96/e0e0e0/555555?text=${placeholderText}`;
                  }}
                />
                <p className="text-2xl font-extrabold text-gray-900 mb-2">
                  {count}
                </p>
                <p className="text-md text-gray-600">{label}</p>
              </div>
            ))}

            <div
              className="bg-white rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 hover:scale-105 cursor-default"
              aria-label="Customer Feedback"
            >
              <p className="text-lg font-semibold text-gray-700 mb-6">
                Customer Feedback
              </p>
              <div className="flex justify-center items-center text-yellow-400 text-4xl space-x-1 select-none">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
                <FaRegStar />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
