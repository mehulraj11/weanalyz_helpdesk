import { useState, useEffect } from "react";
import {
  FaStar,
  FaRegStar,
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaUsers,
  FaTools,
  FaChartBar,
  FaHeart,
  FaCalendarDay,
} from "react-icons/fa";
import {
  MdTrendingUp,
  MdPending,
  MdCheckCircle,
  MdAnalytics,
} from "react-icons/md";
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

  const statsCards = [
    {
      label: "Total Tickets",
      value: ticketCount.total,
      icon: FaTicketAlt,
      color: "text-blue-600",
      bgGradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "Resolved",
      value: ticketCount.resolved,
      icon: MdCheckCircle,
      color: "text-green-600",
      bgGradient: "bg-gradient-to-r from-green-500 to-green-600",
      bgLight: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      label: "Pending",
      value: ticketCount.pending,
      icon: MdPending,
      color: "text-yellow-600",
      bgGradient: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      bgLight: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      label: "In Progress",
      value: ticketCount.inProgress,
      icon: FaSpinner,
      color: "text-purple-600",
      bgGradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  if (loading && !fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-red-200 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Dashboard Error
          </h2>
          <p className="text-gray-600">{fetchError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map(
            ({
              label,
              value,
              icon: Icon,
              color,
              bgGradient,
              bgLight,
              borderColor,
            }) => (
              <div
                key={label}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 ${borderColor} p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-default group`}
                role="region"
                aria-label={`${label}: ${value}`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${bgLight} p-3 rounded-xl border ${borderColor}`}
                  >
                    <Icon className={`text-2xl ${color}`} />
                  </div>
                  <div className="text-right">
                    <MdTrendingUp className="text-green-500 text-lg" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {label}
                  </p>
                  {loading ? (
                    <div className="animate-pulse">
                      <div className="h-10 bg-gray-200 rounded w-20"></div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <p className={`text-4xl font-black ${color} mr-2`}>
                        {value}
                      </p>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 ${bgGradient} rounded-full transition-all duration-1000`}
                    style={{
                      width: `${Math.min(
                        (value / Math.max(ticketCount.total, 1)) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer Stats for Users */}
        {role === "user" && (
          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Your Support Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {ticketCount.total}
                  </p>
                  <p className="text-sm text-gray-600">Total Submitted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {ticketCount.resolved}
                  </p>
                  <p className="text-sm text-gray-600">Resolved</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {ticketCount.pending}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {ticketCount.inProgress}
                  </p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
