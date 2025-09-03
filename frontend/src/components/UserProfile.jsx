import { useState, useEffect } from "react";
import { FaEdit, FaEnvelope, FaUser, FaShieldAlt } from "react-icons/fa";

function UserProfile({ setSelected }) {
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserProfile({
          username: parsedUser.username || "N/A",
          email: parsedUser.email || "N/A",
          role: parsedUser.role || "N/A",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow ">
          <div className="p-6 space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaEnvelope className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </h3>
                <p className="text-gray-900 break-all">{userProfile.email}</p>
                <div className="flex items-center mt-2"></div>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaUser className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Role</h3>
                <p className="text-gray-900 capitalize">{userProfile.role}</p>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSelected("userprofilesetting")}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
              >
                <FaEdit className="mr-2" size={14} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
