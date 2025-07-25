import { useState } from "react";
import { FaUserPlus, FaSync } from "react-icons/fa";

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
    <div>
      <div>
        <div>
          <h2>My Ticket - Team Creation</h2>
          <button onClick={onClose}>X</button>
        </div>

        <div>
          <div>
            <input
              type="text"
              name="ticketNo"
              placeholder="Ticket No."
              value={formData.ticketNo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="teamName"
              placeholder="Team name"
              value={formData.teamName}
              onChange={handleChange}
            />
            <div>
              <input
                type="text"
                name="teamMember"
                placeholder="Team Member"
                value={formData.teamMember}
                onChange={handleChange}
              />
              <FaUserPlus />
            </div>
          </div>

          <textarea
            name="remark"
            placeholder="Remark"
            value={formData.remark}
            onChange={handleChange}
          />
        </div>

        <div>
          <FaSync onClick={handleReset} />
          <button onClick={handleCreate}>Create Team</button>
        </div>
      </div>
    </div>
  );
}

export default TeamCreationModal;
