import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
const SearchBar = React.lazy(() => import("./components/molecules/SearchBar"));
const UserGrid = React.lazy(() => import("./components/organisms/UserGrid"));
const FilterBar = React.lazy(() => import("./components/molecules/FilterBar"));
import "./App.css";

import Alert from "./components/atoms/Alert";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const clearUsers = () => setUsers([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await axios.post("http://localhost:8080/api/users/load");
      } catch (err) {
        setUsers([]);
        setError("Failed to load initial data; try again later.");
      }
    };
    loadUsers();
  }, []);

  const searchUsers = async (query) => {
    try {
      if (query.includes("@")) {
        const res = await axios.get(
          `http://localhost:8080/api/users/email/${query}`
        );
        const results = res.data ? [res.data] : [];
        setUsers(results);
        if (results.length === 0) setError("No users found");
        else setError("");
      } else if (/^\d+$/.test(query)) {
        const res = await axios.get(`http://localhost:8080/api/users/${query}`);
        const results = res.data ? [res.data] : [];
        setUsers(results);
        if (results.length === 0) setError("No users found");
        else setError("");
      } else {
        const res = await axios.get(
          `http://localhost:8080/api/users/search?query=${query}`
        );
        const results = Array.isArray(res.data) ? res.data : [];
        setUsers(results);
        if (results.length === 0) setError("No users found");
        else setError("");
      }
    } catch (err) {
      setUsers([]);
      setError("Search failed; please check your network or try again.");
    }
  };

  const roles = Array.from(new Set(users.map((u) => u.role).filter(Boolean)));

  const filteredUsers = selectedRole
    ? users.filter((u) => u.role === selectedRole)
    : users;

  return (
    <div className="container">
      <h2>User Search</h2>
      <Alert message={error} onClose={() => setError("")} />
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchBar
          onSearch={searchUsers}
          onClear={clearUsers}
          setHasSearched={setHasSearched}
          onError={setError}
        />
      </Suspense>
      {roles.length > 0 && (
        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterBar
            roles={roles}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
          />
        </Suspense>
      )}
      <Suspense fallback={<div>Loading results...</div>}>
        <UserGrid users={filteredUsers} hasSearched={hasSearched} />
      </Suspense>
    </div>
  );
};

export default App;
