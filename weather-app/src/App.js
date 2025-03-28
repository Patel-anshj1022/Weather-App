import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import fetchWeather from "./api/weatherApi";
import "./styles/App.css";

// Import images correctly for local assets
import clearImg from "./assets/images/clear.jpg";
import rainImg from "./assets/images/rain.jpg";
import snowImg from "./assets/images/snow.jpg";
import cloudsImg from "./assets/images/cloudy.jpg";
import thunderstormImg from "./assets/images/thunderstorm.jpg";
import mistImg from "./assets/images/mist.jpg";
import fogImg from "./assets/images/fog.jpg";
import hazeImg from "./assets/images/haze.jpg";
import drizzleImg from "./assets/images/drizzle.jpg";
import smokeImg from "./assets/images/smoke.jpg";
import dustImg from "./assets/images/dust.jpg";
import sandImg from "./assets/images/sand.jpg";
import ashImg from "./assets/images/ash.jpg";
import squallImg from "./assets/images/squall.jpg";
import tornadoImg from "./assets/images/tornado.jpg";
import defaultImg from "./assets/images/default.jpg";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(defaultImg);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setError(null);
      const { currentWeather, forecastData } = await fetchWeather(city);
      if (!currentWeather) throw new Error("City not found");

      setWeather(currentWeather);
      setForecast(forecastData);

      // Set background based on weather condition
      const condition = currentWeather.weather[0].main.toLowerCase();
      setBackgroundImage(getBackgroundImage(condition));
    } catch (error) {
      setError(error.message);
      setWeather(null);
      setForecast(null);
      setBackgroundImage(defaultImg);
    }
  };

  // Function to get background images dynamically
  const getBackgroundImage = (condition) => {
    const images = {
      clear: clearImg,
      rain: rainImg,
      snow: snowImg,
      clouds: cloudsImg,
      thunderstorm: thunderstormImg,
      mist: mistImg,
      fog: fogImg,
      haze: hazeImg,
      drizzle: drizzleImg,
      smoke: smokeImg,
      dust: dustImg,
      sand: sandImg,
      ash: ashImg,
      squall: squallImg,
      tornado: tornadoImg,
      default: defaultImg,
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
      {error && <p className="error-message">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
};

export default App;
