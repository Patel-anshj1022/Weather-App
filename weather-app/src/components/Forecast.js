import React from "react";
import "../styles/Forecast.css";

const Forecast = ({ forecast }) => {
  const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const getDayOfWeek = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", { weekday: "long" });
  };

  const getFormattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };

  // Get today's date and normalize it (to avoid time differences)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if forecast data exists
  if (!forecast || !forecast.list) {
    return <p>Loading forecast...</p>;
  }

  // Filter future days only and sort by date
  const futureForecast = forecast.list
    .map((item) => ({
      ...item,
      date: new Date(item.dt_txt), // Convert timestamp to Date object
    }))
    .filter((item) => item.date > today) // Exclude today
    .sort((a, b) => a.date - b.date);

  // Get unique next 4 days
  const uniqueForecast = [];
  const seenDates = new Set();

  for (let item of futureForecast) {
    const dateString = item.date.toLocaleDateString("en-US");
    if (!seenDates.has(dateString)) {
      seenDates.add(dateString);
      uniqueForecast.push(item);
    }
    if (uniqueForecast.length === 4) break; // Stop after getting 4 days
  }

  return (
    <div className="forecast-container">
      <h2>4-Day Forecast</h2>
      <div className="forecast-grid">
        {uniqueForecast.map((item, index) => (
          <div key={index} className="forecast-card">
            <img 
              src={getIconUrl(item.weather[0].icon)} 
              alt={item.weather[0]?.description} 
              className="forecast-icon" 
            />
            <p className="forecast-day">{getDayOfWeek(item.dt_txt)}</p>
            <p className="forecast-date">{getFormattedDate(item.dt_txt)}</p>
            <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
            <p className="forecast-desc">{item.weather[0]?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
