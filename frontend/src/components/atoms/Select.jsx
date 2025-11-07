import React from "react";

const Select = ({ value, onChange, className, options = [] }) => (
  <select className={className} value={value} onChange={onChange}>
    <option value="">All Roles</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

export default Select;
