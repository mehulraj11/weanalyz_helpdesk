import { useState, useEffect } from "react";
import "../styles/dashboard.css";
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
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setTicketCount({
          total: res.data.totalTickets,
          resolved: res.data.resolvedTickets,
          pending: res.data.pendingTickets,
          inProgress: res.data.inProgressTickets,
        });
      } catch (err) {
        console.error("Error fetching ticket count:", err.message);
      }
    };

    fetchTicketCount();
  }, []);

  console.log(ticketCount);

  return (
    <div className="containerDash">
      <div className="oneDash">Dashboard</div>

      <div className="twoDash">
        <div className="act twoDash1" style={{ backgroundColor: "blue" }}>
          <div className="act-title">Total Tickets</div>
          <div className="act-count">{ticketCount.total}</div>
        </div>
        <div className="act twoDash2" style={{ backgroundColor: "#01ff1da6" }}>
          <div className="act-title">Total Solved</div>
          <div className="act-count">{ticketCount.resolved}</div>
        </div>
        <div className="act twoDash3" style={{ backgroundColor: "red" }}>
          <div className="act-title">Total Awaiting Approval</div>
          <div className="act-count">{ticketCount.pending}</div>
        </div>
        <div className="act twoDash4" style={{ backgroundColor: "yellow" }}>
          <div className="act-title">Total in Progress</div>
          <div className="act-count">{ticketCount.inProgress}</div>
        </div>
      </div>
      {role !== "user" && (
        <div className="threeDash">
          <div className="threeDash1">
            <img
              src={graph}
              alt="Graph"
              style={{ width: "", height: "auto" }}
            />
          </div>

          <div className="dashboard-container">
            <div className="right-content">
              <div className="team-info">
                <div className="team-card">
                  <img src={technical} />
                  <p>
                    <strong>3</strong>
                    <br />
                    Technical Supports
                  </p>
                </div>
                <div className="team-card">
                  <img src={opertaion} />
                  <p>
                    <strong>4</strong>
                    <br />
                    Operation Team
                  </p>
                </div>
              </div>

              <div className="feedback-section">
                <div className="feedback-title">Customer Feedback</div>
                <div className="stars">
                  <FaStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaStar />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
