import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ onSearch, onClear, setHasSearched }) => {
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  const trimmed = query.trim();
  const isNumeric = /^\d+$/.test(trimmed);
  const isEmailLike = trimmed.includes("@");
  const isLongText = !isNumeric && !isEmailLike && trimmed.length >= 3;
  const canSearch = isNumeric || isEmailLike || isLongText;

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length < 3) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      onClear();
      setHasSearched(false);
    }
  };

  useEffect(() => {
    if (isEmailLike || (trimmed.length >= 3 && !isNumeric)) {
      debounceRef.current = setTimeout(() => {
        onSearch(trimmed);
        setHasSearched(true);
        debounceRef.current = null;
      }, 400);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [trimmed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSearch) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      onSearch(trimmed);
      setHasSearched(true);
    } else {
      alert("Enter at least 3 characters to search (or enter an ID/email)");
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
      <button className="google-btn" type="submit" disabled={!canSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
