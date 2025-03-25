import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import fetchWeather from "./api/weatherApi";
import "./styles/App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(""); // New state for background

  const handleSearch = async (city) => {
    const { currentWeather, forecastData } = await fetchWeather(city);
    setWeather(currentWeather);
    setForecast(forecastData);
    
    // Set background based on weather condition
    if (currentWeather) {
      const condition = currentWeather.weather[0].main.toLowerCase();
      setBackgroundImage(getBackgroundImage(condition));
    }
  };

  // Function to get background images
  const getBackgroundImage = (condition) => {
    const images = {
      clear: "/images/clear.jpg",
      rain: "/images/rain.jpg",
      snow: "/images/snow.jpg",
      clouds: "/images/cloudy.jpg",
      thunderstorm: "/images/thunderstorm.jpg",
      mist: "/images/mist.jpg",
      default: "/images/default.jpg",
    };
    return images[condition] || images.default;
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SearchBar onSearch={handleSearch} />
      {weather && <WeatherCard weather={weather} />}
      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
};

export default App;
