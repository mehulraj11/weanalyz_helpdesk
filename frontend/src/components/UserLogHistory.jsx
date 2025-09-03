import { useState, useEffect } from "react";
import axios from "axios"; 
import { FaSearch } from "react-icons/fa";

function UserLogHistory() {
  const [logData, setLogData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLogData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/logs/user-history`, // Example endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setLogData(res.data); 
      } catch (err) {
        console.error("Error fetching user log history:", err);
        setError("Failed to load user log history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchLogData();
    } else {
      setError("Authentication token missing. Please log in.");
      setLoading(false);
    }
  }, [token]);

  const filteredLogData = logData.filter(log =>
    (log.staffId && log.staffId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (log.department && log.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (log.activity && log.activity.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (log.dateIn && log.dateIn.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (log.dateOut && log.dateOut.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredLogData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = filteredLogData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-700 text-lg">
        Loading user log history...
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
        User Log History
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by Staff ID, Activity, etc."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <span>Show:</span>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none bg-white pr-8"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1); 
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto"> 
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Sign In Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Sign Out Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.length > 0 ? (
                currentEntries.map((log, index) => (
                  <tr key={log._id || index} className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{startIndex + index + 1}.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.dateIn || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.staffId || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.department || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.activity || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.dateOut || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No log entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <span className="text-gray-700 text-sm">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredLogData.length)} of {filteredLogData.length} entries
        </span>
        <div className="flex space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700
                       hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          >
            &laquo; Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-lg font-medium cursor-pointer
                          ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}
                          transition duration-150`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700
                       hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 cursor-pointer"
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLogHistory;
