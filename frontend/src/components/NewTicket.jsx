import React, { useState, useRef } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import api from "../api/axios";
import "../styles/newTicket.css";

function NewTicket() {
  //   const captchaRef = useRef();
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
    image: "", // optional
  });

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
        image: file.name, // only saving filename for now
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post("/tickets/create", ticketData);
      alert("Ticket created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create ticket.");
    }
  };

  return (
    <div className="container">
      <div className="one">Create New Ticket</div>

      <div className="two">
        <div className="two1">
          <div className="field">
            <label>Ticket No.</label>
            <input type="number" name="ticketNo" onChange={handleChange} />
          </div>
          <div className="field">
            <label>Date</label>
            <input type="date" name="date" onChange={handleChange} />
          </div>
        </div>

        <div className="two2">
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>
          <div className="field">
            <label>Department</label>
            <input type="text" name="department" onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="three">
        <label>Subject</label>
        <input type="text" name="subject" onChange={handleChange} />
      </div>

      <div className="four">
        <div className="four1">
          <label>Category</label>
          <input type="text" name="category" onChange={handleChange} />
          <label>Type</label>
          <input type="text" name="type" onChange={handleChange} />
          <label>Priority</label>
          <input type="text" name="priority" onChange={handleChange} />
        </div>
        <div className="four2">
          <label htmlFor="description">Description</label>
          <div className="textarea-wrapper">
            <textarea
              id="description"
              rows="6"
              placeholder="Enter description..."
              name="description"
              onChange={handleChange}
            ></textarea>

            <label htmlFor="file-upload" className="attach-floating">
              📎
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="five">
        <div className="five1">
          {/* <ReCAPTCHA sitekey="6LeMEXYrAAAAAM4mqxZApPX_j4L5qUBnrwGHV_D_" ref={captchaRef} /> */}
        </div>
        <div className="five2">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTicket;
