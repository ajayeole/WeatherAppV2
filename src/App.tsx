import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getBackgroundStyle = () => {
    const temp = weather?.temperature;
    let backgroundColor = "#ffdc73"; // Default sunny background color

    if (temp > 30) {
      backgroundColor = "#FFD700"; // Sunny - yellow
    } else if (temp >= 15 && temp <= 30) {
      backgroundColor = "#87CEFA"; // Mild - sky blue
    } else {
      backgroundColor = "#4682B4"; // Cold - darker blue
    }

    return { backgroundColor, color: temp <= 15 ? "#fff" : "#333" };
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const geocodeResponse = await axios.get(
        `https://geocode.maps.co/search?q=${city}&limit=1`
      );

      const location = geocodeResponse.data[0];
      if (!location) {
        setError("City not found. Please enter a valid city.");
        setWeather(null);
        setLoading(false);
        return;
      }

      const latitude = location.lat;
      const longitude = location.lon;

      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      const weatherData = weatherResponse.data.current_weather;
      if (!weatherData) {
        setError("Failed to fetch weather data. Please try again.");
        setWeather(null);
      } else {
        setWeather(weatherData);
        setError("");
      }
    } catch (err) {
      setError(
        "Failed to fetch weather data. Please check your connection or try again."
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialBackground = getBackgroundStyle();
    document.body.style.backgroundColor = initialBackground.backgroundColor;
    document.body.style.color = initialBackground.color;
  }, []);

  useEffect(() => {
    if (weather) {
      const background = getBackgroundStyle();
      document.body.style.backgroundColor = background.backgroundColor;
      document.body.style.color = background.color;
    }
  }, [weather]);

  return (
    <div className="weather-app">
      <h1>Weather Now</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && !error && (
        <div className="weather-details">
          <h2>Weather in {city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default App;
