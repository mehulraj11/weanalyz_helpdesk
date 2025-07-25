import { FaChevronDown } from "react-icons/fa";

const AssignedTo = ({ value, onChange }) => (
  <div className="relative">
    {" "}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 transition duration-200 appearance-none bg-white pr-8 text-gray-700" // pr-8 for icon space
    >
      <option value="" disabled hidden>
        Select team
      </option>
      <option value="technical">Technical Team</option>
      <option value="operation">Operation Team</option>
    </select>
    <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default AssignedTo;
