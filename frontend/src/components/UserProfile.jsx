import { FaUserCircle, FaEdit } from "react-icons/fa";
import "../styles/userProfile.css";

function UserProfile({ setSelected }) { 

  const handleEditClick = () => {
    setSelected("userprofilesetting"); 
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      <div className="profile-main">
        <div className="profile-card">
          <FaEdit className="edit-icon" onClick={handleEditClick} style={{ cursor: "pointer" }} />

          <div className="user-icon">
            <FaUserCircle size={80} color="#555" />
          </div>

          <div className="user-info">
            <p><strong>Username</strong></p>
            <p><strong>Contact Number</strong></p>
            <p><strong>Email</strong></p>
            <p><strong>Department</strong></p>
          </div>
        </div>

        <div className="feedback-card">
          <h4>Give Your Feedback</h4>
          <input placeholder="[Lorem Ipsum]" className="feedback-text" />
          <div className="star-rating">☆☆☆☆☆</div>
          <button className="submit-btn">Submit Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
