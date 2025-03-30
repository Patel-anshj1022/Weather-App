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

// LoginPage component
const LoginPage = ({ onLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual login logic
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Call the onLogin callback to notify that the user has logged in
    onLogin();
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Gmail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p onClick={onSwitchToSignUp} className="switch-auth">
        Don't have an account? Sign Up
      </p>
    </div>
  );
};

// SignUpPage component
const SignUpPage = ({ onSignUp, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Call the onSignUp callback to notify that the user has signed up
    onSignUp();
  };

  return (
    <div className="signup-container">
      <h2>Create a New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Gmail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p onClick={onSwitchToLogin} className="switch-auth">
        Already have an account? Login
      </p>
    </div>
  );
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(defaultImg);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSearch = async (city) => {
    try {
      setError(null);
      const { currentWeather, forecastData } = await fetchWeather(city);
      if (!currentWeather) throw new Error("City not found");

      setWeather(currentWeather);
      setForecast(forecastData);

      const condition = currentWeather.weather[0].main.toLowerCase();
      setBackgroundImage(getBackgroundImage(condition));
    } catch (error) {
      setError(error.message);
      setWeather(null);
      setForecast(null);
      setBackgroundImage(defaultImg);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsSignUp(false);
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    setIsSignUp(false);
  };

  const handleSwitchToSignUp = () => {
    setIsSignUp(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUp(false);
  };

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
      {!isLoggedIn ? (
        !isSignUp ? (
          <LoginPage onLogin={handleLogin} onSwitchToSignUp={handleSwitchToSignUp} />
        ) : (
          <SignUpPage onSignUp={handleSignUp} onSwitchToLogin={handleSwitchToLogin} />
        )
      ) : (
        <>
          <div className="welcome-text">
            <h1>Welcome to the Ultimate Weather App!</h1>
            <p>Your personalized weather assistant is ready to give you real-time updates, forecasts, and more!</p>
          </div>
          <SearchBar onSearch={handleSearch} />
          {error && <p className="error-message">{error}</p>}
          {weather && <WeatherCard weather={weather} />}
          {forecast && <Forecast forecast={forecast} />}
        </>
      )}
    </div>
  );
};

export default App;
