const API_KEY = "aebdd3f5c7fae4d6b3c580249b13df42";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const TIMEZONE_URL = "http://worldtimeapi.org/api/timezone";

const fetchWeather = async (city) => {
  try {
    const weatherRes = await fetch(`${WEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    const forecastRes = await fetch(`${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`);

    if (!weatherRes.ok || !forecastRes.ok) throw new Error("City not found");

    const currentWeather = await weatherRes.json();
    const forecastData = await forecastRes.json();
    const timezone = currentWeather.timezone / 3600; // Convert seconds to hours

    // Fetch local time using WorldTimeAPI
    const timeRes = await fetch(`${TIMEZONE_URL}/Etc/GMT${timezone > 0 ? "-" : "+"}${Math.abs(timezone)}`);
    const timeData = await timeRes.json();
    const time = timeData.datetime.split("T")[1].split(".")[0]; // Extract HH:MM:SS

    return { currentWeather, forecastData, time };
  } catch (error) {
    console.error(error);
    return { currentWeather: null, forecastData: null, time: "" };
  }
};

export default fetchWeather;
