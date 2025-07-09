import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Database from "../components/Database";
import MyTicket from "../components/MyTicket";
import Navabar from "../components/Navabar";
import NewTicket from "../components/NewTicket";
import Performance from "../components/Performance";
import Setting from "../components/Setting";
import TicketApproval from "../components/TicketApproval";
import UserLogHistory from "../components/UserLogHistory";
import UserProfile from "../components/UserProfile";
import UserProfileSetting from "../components/UserProfileSetting";
import "../styles/mainpage.css";

function MainPage({ fetchTickets, tickets, setTickets }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selected, setSelected] = useState("dashboard");

  if (!user) {
    return <p>Please login to continue.</p>;
  }

  const { role } = user;

  const componentsMap = {
    dashboard: <Dashboard />,
    newticket: <NewTicket />,
    myticket: (
      <MyTicket
        fetchTickets={fetchTickets}
        tickets={tickets}
        setTickets={setTickets}
      />
    ),
    ticketapproval: (
      <TicketApproval
        fetchTickets={fetchTickets}
        tickets={tickets}
        setTickets={setTickets}
      />
    ),
    performance: <Performance />,
    setting: <Setting />,
    database: <Database />,
    userlog: <UserLogHistory />,
    userprofile: <UserProfile setSelected={setSelected} />,
    userprofilesetting: <UserProfileSetting />,
  };

  const roleOptions = {
    user: ["dashboard", "newticket", "myticket"],
    operation: ["dashboard", "ticketapproval", "myticket", "performance"],
    technical: ["dashboard", "myticket", "performance"],
    admin: ["dashboard", "setting", "userlog", "database"],
  };

  return (
    <div className="main-wrapper">
      <Navabar onSelect={setSelected} />
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

        {/* Main Display Area */}
        <div className="main-section">
          <div className="main-content">{componentsMap[selected]}</div>
          <footer className="footer">Footer Area</footer>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
