import React, { useState } from "react";

const SearchBar = ({ onSearch, onClear, setHasSearched }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length < 3) {
      onClear();
      setHasSearched(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length >= 3) {
      onSearch(query);
      setHasSearched(true);
    } else {
      alert("Enter at least 3 characters to search");
    }
  };

  return (
    <form className="google-search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="google-input"
        placeholder="Search users here..."
        value={query}
        onChange={handleChange}
      />
      <button className="google-btn" type="submit" disabled={query.length < 3}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
