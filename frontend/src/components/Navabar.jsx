import React from "react";
import { IoNotifications, IoPerson } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navabar({ onSelect }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Or redirect to login
  };

  return (
    <div className="wrapper">
      <div className="title">Helpdesk</div>
      <ul className="nav-icons">
        <li>
          <IoNotifications size={22} color="black" />
        </li>

        {/* 👇 Update this icon to switch to 'userprofile' view */}
        <li onClick={() => onSelect("userprofile")} style={{ cursor: "pointer" }}>
          <IoPerson size={22} color="black" />
        </li>

        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          <TbLogout size={22} color="black" />
        </li>
      </ul>
    </div>
  );
}

export default Navabar;
