import React from "react";

const Input = ({ value, onChange, placeholder, className }) => (
  <input
    type="text"
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default Input;
