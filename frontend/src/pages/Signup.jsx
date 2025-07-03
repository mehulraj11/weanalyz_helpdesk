import React from 'react';
import '../styles/Auth.css'
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="helpdesk-container">
      <h1 className="helpdesk-title">Helpdesk System</h1>
      <div className="signup-section">
        <p className="signup-label">Sign up here</p>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">Forgot password</Link>
          <Link to="/signin" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;