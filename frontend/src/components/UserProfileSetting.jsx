import React from "react";
import "../styles/userprofilesetting.css"; // You'll define this CSS

function UserProfileSetting() {
  return (
    <div className="settings-wrapper">
      <h2 className="settings-heading">User Profile</h2>

      <div className="tab">
        <button className="tab-btn active">Edit Account</button>
      </div>

      <form className="settings-form">
        <div className="form-row">
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
        </div>

        <div className="form-row">
          <label>Current Password</label>
          <input type="password" placeholder="Current password" />
        </div>

        <div className="form-row">
          <label>New Password</label>
          <input type="password" placeholder="New password" />
        </div>

        <div className="form-row">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm new password" />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
        </div>

        <div className="form-row">
          <label>Real Name</label>
          <input type="text" placeholder="Enter real name" />
        </div>

        <div className="form-row">
          <label>Access Level</label>
          <input type="text" placeholder="Enter access level" />
        </div>

        <div className="form-row">
          <label>Project Access Level</label>
          <input type="text" placeholder="Enter project access level" />
        </div>

        <button type="submit" className="update-btn">
          Update User
        </button>
      </form>
    </div>
  );
}

export default UserProfileSetting;
