import React, { useState, useCallback } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedCity = city.trim();
      if (!trimmedCity) return; // Prevents empty submissions
      onSearch(trimmedCity);
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
      />
      <button type="submit" aria-label="Search">🔍</button>
    </form>
  );
};

export default SearchBar;
