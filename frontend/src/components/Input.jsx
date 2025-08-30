import React from "react";

const Input = ({
  type,
  id,
  name,
  value,
  onChange,
  required = "false",
  placeholder,
  className = "",
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
