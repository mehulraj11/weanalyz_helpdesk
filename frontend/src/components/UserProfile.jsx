import { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";

function UserProfile({ setSelected }) {
  const [userProfile, setUserProfile] = useState({
    username: "Loading...",
    email: "Loading...",
    role: "Loading...",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile({
        username: parsedUser.username || "N/A",
        email: parsedUser.email || "N/A",
        role: parsedUser.role || "N/A",
      });
    }
  }, []);

  const handleEditClick = () => {
    setSelected("userprofilesetting");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-md tracking-tight">
        User Profile
      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8 relative transform transition-transform duration-300 hover:scale-105">
        <button
          onClick={handleEditClick}
          className="absolute top-5 right-5 text-blue-600 hover:text-blue-800 transition-transform duration-200 transform hover:scale-110 focus:outline-none cursor-pointer"
          title="Edit Profile"
          aria-label="Edit Profile"
        >
          <FaEdit size={26} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <FaUserCircle size={120} className="text-gray-400 mb-6 drop-shadow" />
          <p className="text-3xl font-extrabold text-gray-900 tracking-wide">
            {userProfile.username}
          </p>
        </div>

        <div className="space-y-5 text-gray-700 text-lg">
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="font-semibold text-gray-600">Role:</span>
            <span className="uppercase font-semibold">{userProfile.role}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="break-words">{userProfile.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
