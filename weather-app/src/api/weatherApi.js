const API_KEY = "91c3291325af2cc3f79fcb5737512637";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const TIMEZONE_URL = "http://worldtimeapi.org/api/timezone";

const fetchWeather = async (city) => {
  try {
    // Fetch weather data
    const weatherRes = await fetch(`${WEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!weatherRes.ok) {
      throw new Error(`City not found: ${city}`);
    }

    const forecastRes = await fetch(`${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!forecastRes.ok) {
      throw new Error(`City not found: ${city}`);
    }

    const currentWeather = await weatherRes.json();
    const forecastData = await forecastRes.json();

    // Extract timezone offset from OpenWeatherMap data
    const timezoneOffset = currentWeather.timezone; // Timezone offset in seconds
    const timezoneHours = timezoneOffset / 3600; // Convert seconds to hours

    // Fetch local time from WorldTimeAPI
    let timeRes;
    try {
      timeRes = await fetch(`${TIMEZONE_URL}/Etc/GMT${timezoneHours > 0 ? "-" : "+"}${Math.abs(timezoneHours)}`);
    } catch (timeError) {
      console.warn("Error fetching timezone data. Defaulting to UTC.");
      return { currentWeather, forecastData, time: "Unavailable" };
    }

    if (!timeRes.ok) {
      console.warn("Invalid timezone response, defaulting time to UTC.");
      return { currentWeather, forecastData, time: "Unavailable" };
    }

    const timeData = await timeRes.json();
    const time = timeData.datetime.split("T")[1].split(".")[0]; // Extract HH:MM:SS

    return { currentWeather, forecastData, time };
  } catch (error) {
    console.error(error);
    return { currentWeather: null, forecastData: null, time: "" };
  }
};

export default fetchWeather;
