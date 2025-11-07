import React from "react";
import Select from "../atoms/Select";

const FilterBar = ({ roles, selectedRole, onRoleChange }) => {
  return (
    <Select
      className="form-select"
      value={selectedRole}
      onChange={(e) => onRoleChange(e.target.value)}
      options={roles}
    />
  );
};

export default FilterBar;
