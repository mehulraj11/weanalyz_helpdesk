import React from "react";
const Select = ({
  label,
  labelClass = "",
  name,
  value,
  onChange,
  selectClass = "",
  options = [],
  placeholder = "Select option",
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div>
      {label && (
        <label className={labelClass}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={selectClass}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
