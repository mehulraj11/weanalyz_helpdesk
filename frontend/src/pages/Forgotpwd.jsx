import React from 'react';
import '../styles/Auth.css'
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="helpdesk-container">
      <h1 className="helpdesk-title">Helpdesk System</h1>
      <div className="forgot-password-section">
        <p className="forgot-password-text">
          Don't worry, Enter your email below and we will send you a link to change password.
        </p>
        <form className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <div className="auth-links">
          <Link to="/signin" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;