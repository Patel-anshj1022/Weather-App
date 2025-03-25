import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import fetchWeather from "./api/weatherApi";
import "./styles/App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [localTime, setLocalTime] = useState("");

  const handleSearch = async (city) => {
    try {
      const { currentWeather, forecastData, time } = await fetchWeather(city);
      setWeather(currentWeather);
      setForecast(forecastData);
      setLocalTime(time);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />
      <div className="weather-display">
        {weather && <WeatherCard weather={weather} localTime={localTime} />}
        {forecast && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
};

export default App;
