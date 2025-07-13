const AssignedTo = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} required>
    <option value="" disabled hidden>
      Select team
    </option>
    <option value="technical">Technical Team</option>
    <option value="operation">Operation Team</option>
  </select>
);

export default AssignedTo;
