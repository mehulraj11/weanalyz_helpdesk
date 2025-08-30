import React, { useState } from "react";
import axios from "axios";
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaTag,
  FaExclamationTriangle,
  FaPaperclip,
  FaCheck,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

function NewTicket() {
  const [ticketData, setTicketData] = useState({
    ticketNo: "",
    date: "",
    name: "",
    department: "",
    subject: "",
    category: "",
    type: "",
    priority: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTicketData((prev) => ({
        ...prev,
        image: file.name,
      }));
      setMessage(`File "${file.name}" selected.`);
      setMessageType("success");
    } else {
      setTicketData((prev) => ({
        ...prev,
        image: "",
      }));
      setMessage("No file selected.");
      setMessageType("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    if (
      !ticketData.ticketNo ||
      !ticketData.date ||
      !ticketData.name ||
      !ticketData.subject ||
      !ticketData.description
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tickets/create`,
        ticketData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(res.data.message || "Ticket created successfully!");
      setMessageType("success");
      setTicketData({
        ticketNo: "",
        date: "",
        name: "",
        department: "",
        subject: "",
        category: "",
        type: "",
        priority: "",
        description: "",
        image: "",
      });
    } catch (err) {
      console.error("Failed to create ticket:", err);
      setMessage(
        err.response?.data?.message ||
          "Failed to create ticket. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityColors = {
    Low: "border-blue-200 bg-blue-50 text-blue-700",
    Medium: "border-yellow-200 bg-yellow-50 text-yellow-700",
    High: "border-orange-200 bg-orange-50 text-orange-700",
    Urgent: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit your support request and our team will get back to you as
            soon as possible
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
              messageType === "success"
                ? "bg-green-50/80 border-green-200 text-green-800"
                : "bg-red-50/80 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {messageType === "success" ? (
                <FaCheck className="mr-3 text-lg" />
              ) : (
                <FaTimes className="mr-3 text-lg" />
              )}
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FaFileAlt className="mr-3" />
              Ticket Information
            </h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label
                  htmlFor="ticketNo"
                  className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                >
                  <FaTicketAlt className="mr-2 text-blue-600" />
                  Ticket No. <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="ticketNo"
                    name="ticketNo"
                    value={ticketData.ticketNo}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="Enter Ticket Number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                >
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Date <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={ticketData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                >
                  <FaUser className="mr-2 text-blue-600" />
                  Full Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={ticketData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder="Enter Your Full Name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                >
                  <FaBuilding className="mr-2 text-blue-600" />
                  Department
                </label>
                <div className="relative">
                  <select
                    id="department"
                    name="department"
                    value={ticketData.department}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 appearance-none pr-12 hover:bg-white cursor-pointer"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">Information Technology</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance & Accounting</option>
                    <option value="Marketing">Marketing & Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="Support">Customer Support</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xl" />
                </div>
              </div>
            </div>

            {/* Subject Section */}
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="flex items-center text-lg font-semibold text-gray-700 mb-3"
              >
                <FaFileAlt className="mr-2 text-blue-600" />
                Subject <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticketData.subject}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="Brief summary of your request or issue"
              />
            </div>

            {/* Categorization Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaTag className="mr-2 text-blue-600" />
                Ticket Classification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="block text-lg font-semibold text-gray-700 mb-3"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={ticketData.category}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 appearance-none pr-12 cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      <option value="Hardware">Hardware Issues</option>
                      <option value="Software">Software Problems</option>
                      <option value="Network">Network & Connectivity</option>
                      <option value="Account">Account & Access</option>
                      <option value="Other">Other Issues</option>
                    </select>
                    <MdKeyboardArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="type"
                    className="block text-lg font-semibold text-gray-700 mb-3"
                  >
                    Request Type
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      value={ticketData.type}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 appearance-none pr-12 cursor-pointer"
                    >
                      <option value="">Select Type</option>
                      <option value="Incident">Incident Report</option>
                      <option value="ServiceRequest">Service Request</option>
                      <option value="ChangeRequest">Change Request</option>
                      <option value="Problem">Problem Investigation</option>
                      <option value="Other">Other Request</option>
                    </select>
                    <MdKeyboardArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="priority"
                    className="flex items-center text-lg font-semibold text-gray-700 mb-3"
                  >
                    <FaExclamationTriangle className="mr-2 text-orange-500" />
                    Priority Level
                  </label>
                  <div className="relative">
                    <select
                      id="priority"
                      name="priority"
                      value={ticketData.priority}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 border-2 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 appearance-none pr-12 cursor-pointer ${
                        ticketData.priority
                          ? priorityColors[ticketData.priority]
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                      <option value="Urgent">Urgent Priority</option>
                    </select>
                    <MdKeyboardArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="flex items-center text-lg font-semibold text-gray-700 mb-3"
              >
                <FaFileAlt className="mr-2 text-blue-600" />
                Detailed Description{" "}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="description"
                rows="6"
                placeholder="Please provide a detailed description of your issue or request. Include any error messages, steps to reproduce the problem, or specific requirements..."
                name="description"
                value={ticketData.description}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 resize-y min-h-[150px] bg-gray-50 hover:bg-white"
              ></textarea>
            </div>

            {/* File Upload Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
              <div className="text-center">
                <FaPaperclip className="mx-auto text-4xl text-blue-500 mb-4" />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaPaperclip className="mr-2" />
                  Attach Files (Optional)
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="mt-2 text-sm text-gray-600">
                  Supported formats: Images, PDF, Word documents (Max 10MB)
                </p>
                {ticketData.image && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-green-200 inline-block">
                    <p className="text-sm text-green-700 font-medium flex items-center">
                      <FaCheck className="mr-2" />
                      {ticketData.image}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px] cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-3" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaTicketAlt className="mr-3" />
                    Submit Ticket
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTicket;
