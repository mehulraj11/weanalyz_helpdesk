import React from 'react';
import '../styles/Auth.css'
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="helpdesk-container">
      <h1 className="helpdesk-title">Helpdesk System</h1>
      <div className="signin-section">
        <form className="signin-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <div className="divider"></div>
        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">Forgot password</Link>
          <Link to="/signup" className="auth-link bold-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;