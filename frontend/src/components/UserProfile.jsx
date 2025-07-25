import { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";

function UserProfile({ setSelected }) {
  const [userProfile, setUserProfile] = useState({
    username: "Loading...",
    contactNumber: "Loading...",
    email: "Loading...",
    department: "Loading...",
    role: "Loading...",
  });
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserProfile({
        username: parsedUser.username || "N/A",
        contactNumber: parsedUser.contactNumber || "N/A",
        email: parsedUser.email || "N/A",
        department: parsedUser.department || "N/A",
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

  const handleFeedbackSubmit = async () => {
    setMessage("");
    setMessageType("");
    const token = localStorage.getItem("token");

    if (!feedback.trim() || rating === 0) {
      setMessage("Please provide feedback and a rating.");
      setMessageType("error");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/feedback/submit`,
        { feedback, rating, userId: userProfile.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessage(res.data.message || "Feedback submitted successfully!");
      setMessageType("success");
      setFeedback("");
      setRating(0);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setMessage(
        err.response?.data?.message ||
          "Failed to submit feedback. Please try again."
      );
      setMessageType("error");
    }
  };

  const renderStars = (currentRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-3xl transition-colors duration-200 ${
            i <= currentRating ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => setRating(i)}
        >
          {i <= currentRating ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return <div className="flex justify-center space-x-1">{stars}</div>;
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
            {/* Larger icon */}
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {userProfile.username}
            </p>
          </div>

          <div className="space-y-3 text-lg text-gray-700">
            <p>
              <strong>Role:</strong> {userProfile.role}
            </p>
            <p>
              <strong>Contact Number:</strong> {userProfile.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p>
              <strong>Department:</strong> {userProfile.department}
            </p>
          </div>
        </div>

        <div
          className="flex-1 bg-white rounded-xl shadow-lg p-6 lg:p-8 flex flex-col justify-between
                        transform transition-transform duration-200 hover:scale-105"
        >
          <div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Give Your Feedback
            </h4>
            <textarea
              placeholder="Share your thoughts or suggestions..."
              rows="6"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y mb-4"
            ></textarea>

            <div className="mb-6">{renderStars(rating)}</div>
          </div>

          {message && (
            <p
              className={`text-center font-medium mt-4 ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            onClick={handleFeedbackSubmit}
            className="w-full py-3 rounded-lg text-white font-semibold text-lg
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2
                       transition duration-300 ease-in-out transform hover:-translate-y-1
                       shadow-lg hover:shadow-xl mt-6"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
