import React from "react";
import { IoNotifications, IoPerson } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import ico from "../images/Vector(1).png"
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // or "/login" if that's your route
  };

  return (
    <div className="wrapper">
      <div className="title">Helpdesk</div>
      <ul className="nav-icons">
        {/* <li><img src={ico} /></li> */}
        <li><IoNotifications size={22} color="black" /></li>
        <li><IoPerson size={22} color="black" /></li>
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          <TbLogout size={22} color="black" />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
