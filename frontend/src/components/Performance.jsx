import React from "react";
import { IoMdPerson } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import "../styles/performance.css";

function Performance() {
  const teamMembers = [
    { id: 1, name: "Operation Name 1" },
    { id: 2, name: "Operation Name 2" },
    { id: 3, name: "Operation Name 3" },
  ];

  return (
    <div className="performance-wrapper">
      <h2 className="performance-title">Performance</h2>

      <div className="performance-content">
        {/* Left Side */}
        <div className="left-panel">
          <div className="profile-box">
            <div className="profile-icon">
              <IoMdPerson size={100} />
            </div>
            <div className="profile-info">
              <p className="op-name">Operation Name</p>
              <div className="contact-box">
                <p>Contact No: 0123456789</p>
                <p>Department: ABC</p>
              </div>
            </div>
          </div>

          <div className="stats-box">
            <div className="stats-header">
              <p>Total Ticket Handle</p>
              <span>5</span>
            </div>
            <div className="stat-row"><span>Ticket Solved</span><span>2</span></div>
            <div className="stat-row"><span>Ticket Pending</span><span>1</span></div>
            <div className="stat-row"><span>Ticket in progress</span><span>2</span></div>
            <div className="stat-row">
              <span>Rating</span>
              <span className="stars">
                {[...Array(5)].map((_, i) => <FaStar key={i} color="orange" />)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-panel">
          {teamMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-icon"><IoMdPerson size={40} /></div>
              <div className="member-info">
                <p>{member.name}</p>
                <button className="view-btn">View details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Performance;
