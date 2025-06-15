import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '86877353d4ce4eb9e14f7c75650915d4';

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError('City not found');
      }
    } catch (err) {
      setError('Error fetching data');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className='flex justify-center mt-4'>
        <h1 className="text-2xl font-bold text-blue-700">Search your city name to know weather 🌤</h1>
      </div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4 text-center">


      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <button
        onClick={fetchWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        Get Weather
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="mt-4 text-left space-y-2">
          <h2 className="text-xl font-bold text-center">
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="flex flex-col items-center">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-20 h-20"
            />
            <p className="text-2xl">{weather.main.temp}°C</p>
            <p className="capitalize text-gray-600">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <p><strong>Feels like:</strong> {weather.main.feels_like}°C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
            <p><strong>Wind speed:</strong> {weather.wind.speed} m/s</p>
            <p><strong>Condition:</strong> {weather.weather[0].main}</p>
            <p><strong>Sunrise:</strong> {formatTime(weather.sys.sunrise)}</p>
            <p><strong>Sunset:</strong> {formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      )}

    </div>




      <div>
        <footer className="flex justify-center pt-6 text-gray-600 text-sm">
          Created by <strong> Kundan Mehta</strong>
        </footer>
      </div>
    </>
  );
};

export default Weather;
