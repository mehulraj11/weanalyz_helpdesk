import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import graph from "../images/Group.png";
import opertaion from "../images/691142.png";
import technical from "../images/soporte-tecnico-icono-png-12.png";
import axios from "axios";

function Dashboard() {
  const [ticketCount, setTicketCount] = useState(0);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tickets/count");
        setTicketCount(res.data.totalTickets);
      } catch (err) {
        console.error("Error fetching ticket count:", err.message);
      }
    };

    fetchTicketCount();
  }, []);

  return (
    <div className="containerDash">
      <div className="oneDash">Dashboard</div>

      <div className="twoDash">
        <div className="act twoDash1" style={{ backgroundColor: "#0000ffad" }}>
          <div className="act-title">Total Tickets</div>
          <div className="act-count">{ticketCount}</div>
        </div>
        <div className="act twoDash2" style={{ backgroundColor: "#01ff1da6" }}>
          <div className="act-title">Total Solved</div>
          <div className="act-count">8</div>
        </div>
        <div className="act twoDash3" style={{ backgroundColor: "#ff0000bf" }}>
          <div className="act-title">Total Awaiting Approval</div>
          <div className="act-count">2</div>
        </div>
        <div className="act twoDash4" style={{ backgroundColor: "#ffff00b2" }}>
          <div className="act-title">Total in Progress</div>
          <div className="act-count">2</div>
        </div>
      </div>

      {/* Conditionally render this section based on role */}
      {role !== "user" && (
        <div className="threeDash">
          <div className="threeDash1">
            <img
              src={graph}
              alt="Graph"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className="threeDash2">
            <div className="d1">
              <div className="team-card">
                <img src={technical} alt="Technical" />
                <p>
                  <strong>3</strong>
                  <br />
                  Technical Supports
                </p>
              </div>
              <div className="team-card">
                <img src={opertaion} alt="Operation" />
                <p>
                  <strong>4</strong>
                  <br />
                  Operation Team
                </p>
              </div>
            </div>
            <div className="d2">
              <div className="feedback-title">Customer Feedback</div>
              <div className="stars">⭐⭐⭐⭐✩</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
