import { useState, useEffect } from "react";
import { IoNotifications, IoPerson } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Navabar({ onSelect }) {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Optional: lock background scroll when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = openConfirm ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openConfirm]);

  return (
    <>
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
            onClick={() => setOpenConfirm(true)}
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
            title="Logout"
          >
            <TbLogout size={22} color="white" />
          </li>
        </ul>
      </div>

      {openConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-logout-title"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenConfirm(false)}
          />
          <div className="relative z-10 w-[90vw] max-w-md bg-white rounded-xl shadow-2xl">
            <div className="px-6 py-5">
              <h2
                id="confirm-logout-title"
                className="text-xl font-bold text-gray-900"
              >
                Confirm Logout
              </h2>
            </div>
            <div className="px-6 py-5 text-gray-700">
              Are you sure want to logout?
            </div>
            <div className="px-6 py-4  flex justify-end gap-3">
              <button
                onClick={() => setOpenConfirm(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navabar;
