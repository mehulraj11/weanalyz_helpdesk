import React, { useState } from "react";
import "../styles/signin.css";
import { Link } from "react-router-dom";;

function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Send to backend
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
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>

          <div className="redirect">
            <Link to="/forgotpassword" style={{ color: "red" }}>
              Forgot Password
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Signin