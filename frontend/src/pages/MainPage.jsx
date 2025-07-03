import React from "react";
import Dashboard from "../components/Dashboard";
import Database from "../components/Database";
import MyTicket from "../components/MyTicket";
import Navabar from "../components/Navabar";
import NewTicket from "../components/NewTicket";
import Performance from "../components/Performance";
import Setting from '../components/Setting';
import TicketApproval from "../components/TicketApproval"
import UserLogHistory from '../components/UserLogHistory';


function MainPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Please login to continue.</p>;
  }

  const { role } = user;

  return (
    <div>
      {/* Always show Dashboard */}
      <Dashboard />

      {/* Role-based rendering */}
      {role === "user" && (
        <>
          <NewTicket />
          <MyTicket />
        </>
      )}

      {role === "operation" && (
        <>
          <TicketApproval />
          <MyTicket />
          <Performance />
        </>
      )}

      {role === "technical" && (
        <>
          <MyTicket />
          <Performance />
        </>
      )}

      {role === "admin" && (
        <>
          <Setting />
          <UserLogHistory />
          <Database />
        </>
      )}
    </div>
  );
}

export default MainPage;
