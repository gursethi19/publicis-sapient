import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import UserGrid from "./components/UserGrid";
import FilterBar from "./components/FilterBar";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const clearUsers = () => setUsers([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await axios.post("http://localhost:8080/api/users/load");
        // Optionally fetch all users if endpoint is available:
        // const res = await axios.get("http://localhost:8080/api/users");
        // setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        setUsers([]);
      }
    };
    loadUsers();
  }, []);

  const searchUsers = async (query) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/search?query=${query}`
      );
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      setUsers([]);
    }
  };

  // Extract unique roles from users array
  const roles = Array.from(new Set(users.map((u) => u.role).filter(Boolean)));

  // Filter users by selected role
  const filteredUsers = selectedRole
    ? users.filter((u) => u.role === selectedRole)
    : users;

  return (
    <div className="container">
      <h2>User Search</h2>
      <SearchBar
        onSearch={searchUsers}
        onClear={clearUsers}
        setHasSearched={setHasSearched}
      />
      {roles.length > 0 && (
        <FilterBar
          roles={roles}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      )}
      <UserGrid users={filteredUsers} hasSearched={hasSearched} />
    </div>
  );
};

export default App;
