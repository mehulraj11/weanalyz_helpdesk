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
    // console.log(storedUser);

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile({
        username: parsedUser.username || "N/A",
        email: parsedUser.email || "N/A",
        role: parsedUser.role || "N/A",
      });
    } else {
      setMessage("User data not found. Please log in.");
      setMessageType("error");
    }
  }, []);

  const handleEditClick = () => {
    setSelected("userprofilesetting");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
        User Profile
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className="flex-1 bg-white rounded-xl shadow-lg p-6 lg:p-8 relative
                        transform transition-transform duration-200 hover:scale-105"
        >
          <button
            onClick={handleEditClick}
            className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 transition duration-200 transform hover:scale-110"
            title="Edit Profile"
          >
            <FaEdit size={24} />
          </button>

          <div className="flex flex-col items-center mb-6">
            <FaUserCircle size={100} className="text-gray-500 mb-4" />{" "}
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {userProfile.username}
            </p>
          </div>

          <div className="space-y-3 text-lg text-gray-700">
            <p>
              <strong>Role:</strong> {userProfile.role.toUpperCase()}
            </p>
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
