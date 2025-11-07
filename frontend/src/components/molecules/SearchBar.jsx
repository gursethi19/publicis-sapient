import React, { useState, useEffect, useRef } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const SearchBar = ({ onSearch, onClear, setHasSearched, onError }) => {
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
        onError && onError("");
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
      onError && onError("");
      onSearch(trimmed);
      setHasSearched(true);
    } else {
      onError &&
        onError("Enter at least 3 characters to search (or enter an ID/email)");
    }
  };

  return (
    <form className="google-search-bar" onSubmit={handleSubmit}>
      <Input
        className="google-input"
        placeholder="Search users here..."
        value={query}
        onChange={handleChange}
      />
      <Button className="google-btn" type="submit" disabled={!canSearch}>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
