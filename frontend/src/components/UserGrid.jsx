import React, { useState } from "react";

const UserGrid = ({ users, hasSearched }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  // Clone and sort users by age
  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === "asc") return a.age - b.age;
    else return b.age - a.age;
  });

  const handleAgeSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (hasSearched && (!Array.isArray(users) || users.length === 0)) {
    return <div>No users found</div>;
  }
  if (!Array.isArray(users) || users.length === 0) {
    return null;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={handleAgeSort}
            title="Sort by Age"
          >
            Age&nbsp;
            {sortOrder === "asc" ? "▲" : "▼"}
          </th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>
              {u.firstName} {u.lastName}
            </td>
            <td>{u.email}</td>
            <td>{u.age}</td>
            <td>{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserGrid;
