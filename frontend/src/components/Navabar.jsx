import { IoNotifications, IoPerson } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Navabar({ onSelect }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className="sticky top-0 z-50 w-full p-4 md:px-8 lg:px-12
                    flex items-center justify-between
                    bg-gradient-to-r from-blue-600 to-purple-600
                    text-white shadow-lg"
    >
      <div className="text-2xl md:text-3xl font-bold tracking-wide">
        Helpdesk
      </div>

      <ul className="flex items-center space-x-4 md:space-x-6">
        <li className="cursor-pointer hover:scale-110 transition-transform duration-200">
          <IoNotifications size={22} color="white" />
        </li>

        <li
          onClick={() => onSelect("userprofile")}
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <IoPerson size={22} color="white" />
        </li>

        <li
          onClick={handleLogout}
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <TbLogout size={22} color="white" />
        </li>
      </ul>
    </div>
  );
}

export default Navabar;
