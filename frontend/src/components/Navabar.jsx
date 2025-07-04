import { IoNotifications, IoPerson } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navabar({ onSelect }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <div className="wrapper">
      <div className="title">Helpdesk</div>
      <ul className="nav-icons">
        <li id="bmbi"> 
          <p style={{backgroundColor:"black", color:"white"}}>BM</p>
          <p>BI</p>
        </li>
        <li>
          <IoNotifications size={22} color="black" />
        </li>
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
