import React, { useState } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      setMessage(res.data.message || "Signup successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="app-wrapper">
      <div className="helpdesk-container">
        <h1 className="helpdesk-title">Helpdesk System</h1>
        <h2 className="helpdesk-title">Sign up here</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="operation">Operation Team</option>
            <option value="technical">Technical Team</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Sign Up</button>

          <div className="redirect">
            <Link to="/forgotpassword" style={{ color: "red" }}>
              Forgot Password
            </Link>
            <Link to="/">Sign In</Link>
          </div>

          {message && (
            <p
              style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
