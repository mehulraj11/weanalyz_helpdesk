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
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(res.data);

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
  }, [token]);

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
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center
                        transform transition-transform duration-200 hover:scale-105"
        >
          <div className="text-lg font-semibold text-gray-600 mb-2">
            Total Tickets
          </div>
          <div className="text-4xl font-bold text-blue-600">
            {ticketCount.total}
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center
                        transform transition-transform duration-200 hover:scale-105"
        >
          <div className="text-lg font-semibold text-gray-600 mb-2">Solved</div>
          <div className="text-4xl font-bold text-green-600">
            {ticketCount.resolved}
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center
                        transform transition-transform duration-200 hover:scale-105"
        >
          <div className="text-lg font-semibold text-gray-600 mb-2">
            Awaiting Approval
          </div>
          <div className="text-4xl font-bold text-yellow-600">
            {ticketCount.pending}
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 text-center
                        transform transition-transform duration-200 hover:scale-105"
        >
          <div className="text-lg font-semibold text-gray-600 mb-2">
            In Progress
          </div>
          <div className="text-4xl font-bold text-purple-600">
            {ticketCount.inProgress}
          </div>
        </div>
      </div>

      {role !== "user" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center
                          transform transition-transform duration-200 hover:scale-105"
          >
            <img
              src={graph}
              alt="Ticket Distribution Graph"
              className="max-w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x300/e0e0e0/555555?text=Graph+Placeholder";
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center
                            transform transition-transform duration-200 hover:scale-105"
            >
              <img
                src={technical}
                alt="Technical Team Icon"
                className="w-20 h-20 mb-4 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/80x80/e0e0e0/555555?text=Tech";
                }}
              />
              <p className="text-xl font-bold text-gray-800 mb-1">
                {ticketCount.tech_team}
              </p>
              <p className="text-md text-gray-600">Technical Supports</p>
            </div>

            <div
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center
                            transform transition-transform duration-200 hover:scale-105"
            >
              <img
                src={opertaion}
                alt="Operation Team Icon"
                className="w-20 h-20 mb-4 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/80x80/e0e0e0/555555?text=Ops";
                }}
              />
              <p className="text-xl font-bold text-gray-800 mb-1">
                {ticketCount.op_team}
              </p>
              <p className="text-md text-gray-600">Operation Team</p>
            </div>

            <div
              className="bg-white rounded-xl shadow-lg p-6 col-span-1 sm:col-span-2 text-center
                            transform transition-transform duration-200 hover:scale-105"
            >
              <div className="text-lg font-semibold text-gray-600 mb-4">
                Customer Feedback
              </div>
              <div className="flex justify-center items-center text-yellow-500 text-3xl space-x-1">
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
