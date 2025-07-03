import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import Database from "../components/Database";
import MyTicket from "../components/MyTicket";
import Navabar from "../components/Navabar";
import NewTicket from "../components/NewTicket";
import Performance from "../components/Performance";
import Setting from "../components/Setting";
import TicketApproval from "../components/TicketApproval";
import UserLogHistory from "../components/UserLogHistory";
import "../styles/mainpage.css";

function MainPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selected, setSelected] = useState("dashboard");

  if (!user) {
    return <p>Please login to continue.</p>;
  }

  const { role } = user;

  // Define accessible components based on role
  const componentsMap = {
    dashboard: <Dashboard />,
    newticket: <NewTicket />,
    myticket: <MyTicket />,
    ticketapproval: <TicketApproval />,
    performance: <Performance />,
    setting: <Setting />,
    database: <Database />,
    userlog: <UserLogHistory />,
  };

  const roleOptions = {
    user: ["dashboard", "newticket", "myticket"],
    operation: ["dashboard", "ticketapproval", "myticket", "performance"],
    technical: ["dashboard", "myticket", "performance"],
    admin: ["dashboard", "setting", "userlog", "database"],
  };

  return (
  <div className="main-wrapper">
    <Navabar />
    <div className="content-area">
      {/* Sidebar */}
      <div className="sidebar">
        {roleOptions[role].map((key) => (
          <button
            key={key}
            className="side-btn"
            onClick={() => setSelected(key)}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Display Area with Footer */}
      <div className="main-section">
        <div className="main-content">{componentsMap[selected]}</div>
        <footer className="footer">Footer Area</footer>
      </div>
    </div>
  </div>
);
}

export default MainPage;
