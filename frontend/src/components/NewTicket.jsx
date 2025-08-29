import React, { useState } from "react";
import axios from "axios";

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

    if (
      !ticketData.ticketNo ||
      !ticketData.date ||
      !ticketData.name ||
      !ticketData.subject ||
      !ticketData.description
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
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
        err.response?.data?.message || "Failed to create ticket. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-sm">
        Create New Ticket
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="ticketNo" className="block mb-2 text-lg font-semibold text-gray-700">
              Ticket No.
            </label>
            <input
              type="number"
              id="ticketNo"
              name="ticketNo"
              value={ticketData.ticketNo}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
              placeholder="Enter Ticket Number"
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-2 text-lg font-semibold text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={ticketData.date}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-lg font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={ticketData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label htmlFor="department" className="block mb-2 text-lg font-semibold text-gray-700">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={ticketData.department}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition appearance-none pr-8"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block mb-2 text-lg font-semibold text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={ticketData.subject}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
            placeholder="Brief Summary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label htmlFor="category" className="block mb-2 text-lg font-semibold text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={ticketData.category}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition appearance-none pr-8"
            >
              <option value="">Select Category</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Network">Network</option>
              <option value="Account">Account</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block mb-2 text-lg font-semibold text-gray-700">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={ticketData.type}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition appearance-none pr-8"
            >
              <option value="">Select Type</option>
              <option value="Incident">Incident</option>
              <option value="ServiceRequest">Service Request</option>
              <option value="ChangeRequest">Change Request</option>
              <option value="Problem">Problem</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block mb-2 text-lg font-semibold text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={ticketData.priority}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition appearance-none pr-8"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-lg font-semibold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows="5"
            placeholder="Enter description..."
            name="description"
            value={ticketData.description}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition resize-y max-h-52"
          ></textarea>
        </div>

        <div className="relative w-36">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center justify-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition duration-200"
            title="Attach File"
          >
            📎 Attach File
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          {ticketData.image && (
            <p className="mt-2 text-sm text-gray-600 truncate" title={ticketData.image}>
              {ticketData.image}
            </p>
          )}
        </div>

        {message && (
          <p
            className={`text-center font-semibold mt-4 ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-10 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg
                       hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTicket;
