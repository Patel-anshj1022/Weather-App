import React, { useEffect, useState } from "react";
import "../styles/WeatherCard.css";

const WeatherCard = ({ weather }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      setFormattedDate(now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }));
    };

    updateTimeAndDate(); // Initial update
    const interval = setInterval(updateTimeAndDate, 60000); // Update every minute instead of every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!weather?.main || !weather?.weather) {
    return <p className="error-message">Weather data is not available.</p>;
  }

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys?.country || "N/A"}</h2>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`} 
        alt={weather.weather[0]?.description} 
        className="weather-icon" 
      />
      <h3>{weather.weather[0]?.description || "No Description"}</h3>
      <h1>{weather.main?.temp ? `${Math.round(weather.main.temp)}°C` : "N/A"}</h1>
      <p>Date: {formattedDate}</p>
      <p>Humidity: {weather.main?.humidity ? `${weather.main.humidity}%` : "N/A"}</p>
      <p>Wind Speed: {weather.wind?.speed ? `${weather.wind.speed} m/s` : "N/A"}</p>
    </div>
  );
};

export default WeatherCard;
