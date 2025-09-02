import { useState, useEffect } from "react";
import { FaTicketAlt, FaSpinner, FaCheckCircle, FaClock } from "react-icons/fa";
import axios from "axios";

function Dashboard() {
  const [ticketCount, setTicketCount] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const token = localStorage.getItem("token");
  console.log(user.role);

  useEffect(() => {
    const fetchTicketCount = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/${
            user.role === "operation" || user.role === "technical"
              ? "assignedcount"
              : "count"
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setTicketCount({
          total: res.data.totalTickets || 0,
          resolved: res.data.resolvedTickets || 0,
          pending: res.data.pendingTickets || 0,
          inProgress: res.data.inProgressTickets || 0,
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

  const statsCards = [
    {
      label: "Total Tickets",
      value: ticketCount.total,
      icon: FaTicketAlt,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Resolved",
      value: ticketCount.resolved,
      icon: FaCheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      label: "Pending",
      value: ticketCount.pending,
      icon: FaClock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      label: "In Progress",
      value: ticketCount.inProgress,
      icon: FaSpinner,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow border max-w-sm text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 text-sm">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.username}! Here's your ticket overview.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map(({ label, value, icon: Icon, color, bg, border }) => (
            <div
              key={label}
              className={`bg-white rounded-lg shadow border p-4 hover:shadow-md transition-shadow ${border}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${bg}`}>
                  <Icon className={`text-lg ${color}`} />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {label}
                </p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
              {label !== "Total Tickets" && ticketCount.total > 0 && (
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${
                      label === "Resolved"
                        ? "bg-green-500"
                        : label === "Pending"
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (value / ticketCount.total) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
