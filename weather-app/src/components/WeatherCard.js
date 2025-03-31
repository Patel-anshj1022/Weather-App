import React, { useEffect, useState } from "react";
import "../styles/WeatherCard.css";

const WeatherCard = ({ weather }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Update time and date every minute
  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      setFormattedDate(now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }));
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };

    updateTimeAndDate(); // Initial update
    const interval = setInterval(updateTimeAndDate, 60000); // Update every minute

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  // If weather data is not available, display an error message
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
      <p>Time: {currentTime}</p>
      <p>Humidity: {weather.main?.humidity ? `${weather.main.humidity}%` : "N/A"}</p>
      <p>Wind Speed: {weather.wind?.speed ? `${weather.wind.speed} m/s` : "N/A"}</p>
    </div>
  );
};

export default WeatherCard;
