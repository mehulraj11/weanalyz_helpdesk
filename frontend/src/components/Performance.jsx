import { useState, useEffect } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";

function Performance() {
  const [performanceData, setPerformanceData] = useState({
    totalHandle: 0,
    solved: 0,
    pending: 0,
    inProgress: 0,
    rating: 0,
    teamMembers: [],
    currentMember: {
      name: "Select a Team Member",
      contactNo: "N/A",
      department: "N/A",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const overallRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/performance/overall`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const teamRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/performance/team-members`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setPerformanceData({
          totalHandle: overallRes.data.totalHandle || 0,
          solved: overallRes.data.solved || 0,
          pending: overallRes.data.pending || 0,
          inProgress: overallRes.data.inProgress || 0,
          rating: overallRes.data.rating || 0,
          teamMembers: teamRes.data || [],
          currentMember: overallRes.data.currentMember || {
            name: "Overall Performance",
            contactNo: "N/A",
            department: "N/A",
          },
        });
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setError("Failed to load performance data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPerformanceData();
    } else {
      setError("Authentication token missing. Please log in.");
      setLoading(false);
    }
  }, [token]);

  const handleMemberSelect = (member) => {
    setPerformanceData((prev) => ({
      ...prev,
      currentMember: member,
    }));
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= count ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          {i <= count ? <FaStar /> : <FaRegStar />}
        </span>
      );
    }
    return <div className="flex justify-center">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700 text-lg">
        Loading performance data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-600 text-lg font-medium">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-sm">
        Performance Overview
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className="flex-1 bg-white rounded-xl shadow-lg p-6 lg:p-8
                        transform transition-transform duration-200 hover:scale-105"
        >
          <div className="flex items-center mb-6 border-b pb-4 border-gray-200">
            <IoMdPerson
              size={80}
              className="text-blue-600 mr-4 flex-shrink-0"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {performanceData.currentMember.name}
              </p>
              <div className="text-md text-gray-600 space-y-1">
                <p>Contact No: {performanceData.currentMember.contactNo}</p>
                <p>Department: {performanceData.currentMember.department}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-700">
                Total Tickets Handled
              </p>
              <span className="text-3xl font-bold text-blue-600">
                {performanceData.totalHandle}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-700">
                Tickets Solved
              </p>
              <span className="text-3xl font-bold text-green-600">
                {performanceData.solved}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-700">
                Tickets Pending
              </p>
              <span className="text-3xl font-bold text-yellow-600">
                {performanceData.pending}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-700">
                Tickets In Progress
              </p>
              <span className="text-3xl font-bold text-purple-600">
                {performanceData.inProgress}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm col-span-1 sm:col-span-2">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Overall Rating
              </p>
              {renderStars(performanceData.rating)}
            </div>
          </div>
        </div>

        <div
          className="w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 lg:p-8 flex-shrink-0
                        transform transition-transform duration-200 hover:scale-105"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200 text-center">
            Team Members
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {" "}
            {performanceData.teamMembers.length > 0 ? (
              performanceData.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center bg-gray-50 rounded-lg p-3 shadow-sm
                             hover:bg-blue-50 transition duration-200 cursor-pointer"
                  onClick={() => handleMemberSelect(member)}
                >
                  <IoMdPerson size={30} className="text-gray-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-md font-semibold text-gray-800">
                      {member.name}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMemberSelect(member);
                    }}
                    className="ml-auto px-3 py-1 bg-blue-500 text-white text-sm rounded-md
                               hover:bg-blue-600 transition duration-200"
                  >
                    View details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No team members found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
