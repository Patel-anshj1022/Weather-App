// src/components/SearchBar.js
import React, { useState, useCallback } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  // Using useCallback to memoize the handleSubmit function
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedCity = city.trim();
      if (!trimmedCity) return; // Prevents empty submissions
      onSearch(trimmedCity);
      setCity(""); // Clear the input after search
    },
    [city, onSearch]
  );

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        aria-label="City Name"
        className="search-input"
      />
      <button type="submit" aria-label="Search">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
