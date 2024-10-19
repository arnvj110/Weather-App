// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const api = 'f0466a13e5244b02152d1194a2ec8ddf'; // Replace with your OpenWeatherMap API key

  const getWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Error fetching the weather data');
      }

      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const getWeatherByCity = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Error fetching the weather data');
      }

      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (location) {
      getWeatherByCity(location);
      setLocation('');
    }
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      });
    } 
    else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocationWeather();
  }, []);
  return (
    <div className="app">
      <h1 id='heading'>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          id='input'
          type="text"
          placeholder="Search city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button id='submit' type="submit">Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

    </div>
  );
};

export default App;


