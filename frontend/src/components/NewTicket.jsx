import React, { useState } from "react";
import Loader from "./Loader";
import Input from "./Input";
import axios from "axios";
import { FaTicketAlt, FaCheck, FaTimes } from "react-icons/fa";
import Select from "./Select";

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
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const departmentOptions = [
    { value: "IT", label: "IT" },
    { value: "HR", label: "HR" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Operations", label: "Operations" },
    { value: "Support", label: "Support" },
  ];

  const categoryOptions = [
    { value: "Hardware", label: "Hardware" },
    { value: "Software", label: "Software" },
    { value: "Network", label: "Network" },
    { value: "Account", label: "Account" },
    { value: "Other", label: "Other" },
  ];

  const typeOptions = [
    { value: "Incident", label: "Incident" },
    { value: "ServiceRequest", label: "Service Request" },
    { value: "ChangeRequest", label: "Change Request" },
    { value: "Problem", label: "Problem" },
    { value: "Other", label: "Other" },
  ];

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

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
    setLoading(true);

    if (
      !ticketData.ticketNo ||
      !ticketData.date ||
      !ticketData.name ||
      !ticketData.subject ||
      !ticketData.description
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Ticket
          </h1>
          <p className="text-gray-600">
            Submit your support request and we'll get back to you soon
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              messageType === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {messageType === "success" ? (
                <FaCheck className="mr-2" />
              ) : (
                <FaTimes className="mr-2" />
              )}
              {message}
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Ticket No. <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="number"
                  name="ticketNo"
                  value={ticketData.ticketNo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter ticket number"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="date"
                  name="date"
                  value={ticketData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  value={ticketData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Select
                  required
                  label="Department"
                  labelClass="flex items-center text-sm font-medium text-gray-700 mb-2"
                  name="department"
                  value={ticketData.department}
                  onChange={handleChange}
                  selectClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                  options={departmentOptions}
                />
              </div>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                type="text"
                name="subject"
                value={ticketData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief summary of your request"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select
                  required
                  label="Category"
                  labelClass="flex items-center text-sm font-medium text-gray-700 mb-2"
                  name="category"
                  value={ticketData.category}
                  onChange={handleChange}
                  selectClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                  options={categoryOptions}
                />
              </div>
              <div>
                <Select
                  required
                  label="Request Type"
                  labelClass="flex items-center text-sm font-medium text-gray-700 mb-2"
                  name="type"
                  value={ticketData.type}
                  onChange={handleChange}
                  selectClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                  options={typeOptions}
                />
              </div>
              <Select
                required
                label="Priority"
                labelClass="flex items-center text-sm font-medium text-gray-700 mb-2"
                name="priority"
                value={ticketData.priority}
                onChange={handleChange}
                selectClass="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                options={priorityOptions}
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="description"
                rows="4"
                value={ticketData.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Please provide detailed information about your issue or request..."
              />
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center">
                    Attach File
                  </span>
                </label>
                <Input
                  type="file"
                  id="file-upload"
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Images, PDF, Word documents (Max 10MB)
                </p>
                {ticketData.image && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded inline-block">
                    <p className="text-sm text-green-700 flex items-center">
                      {ticketData.image}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Loader
                type="submit"
                disabled={loading}
                label="Create Ticket"
                loadingLabel="Creating..."
                icon={FaTicketAlt}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[140px]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewTicket;
