import React from "react";

const FilterBar = ({ roles, selectedRole, onRoleChange }) => {
  return (
    <select
      className="form-select"
      value={selectedRole}
      onChange={(e) => onRoleChange(e.target.value)}
    >
      <option value="">All Roles</option>
      {Array.isArray(roles) &&
        roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
    </select>
  );
};

export default FilterBar;
