import  { useState } from "react";
import { FaUserPlus, FaSync } from "react-icons/fa";
import "../styles/teamcreation.css";

function TeamCreationModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    ticketNo: "",
    teamName: "",
    teamMember: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    onCreate?.(formData);
  };

  const handleReset = () => {
    setFormData({
      ticketNo: "",
      teamName: "",
      teamMember: "",
      remark: "",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-team">
        {/* Top Title & Close Button */}
        <div className="modal-header">
          <h2>My Ticket - Team Creation</h2>
          <button className="close-modal" onClick={onClose}>
            X
          </button>
        </div>

        <div className="team-form">
          <div className="left-fields">
            <input
              type="text"
              name="ticketNo"
              placeholder="Ticket No."
              value={formData.ticketNo}
              onChange={handleChange}
              className="italic-input"
            />
            <input
              type="text"
              name="teamName"
              placeholder="Team name"
              value={formData.teamName}
              onChange={handleChange}
            />
            <div className="team-member-input">
              <input
                type="text"
                name="teamMember"
                placeholder="Team Member"
                value={formData.teamMember}
                onChange={handleChange}
              />
              <FaUserPlus className="icon" />
            </div>
          </div>

          <textarea
            name="remark"
            placeholder="Remark"
            value={formData.remark}
            onChange={handleChange}
          />
        </div>

        <div className="team-buttons">
          <FaSync onClick={handleReset} className="icon-button" />
          <button className="create-btn" onClick={handleCreate}>
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamCreationModal;
