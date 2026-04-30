import { useState } from 'react';
import { fetchWeatherByCity } from './services/weatherApi';
import './styles/App.styles.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <main className="container">

      {/* Header */}
      <header className="header">
        <span className="header-label">WEATHER</span>
        <span className="header-date">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
      </header>

      {/* Search */}
      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={handleSearch}>
          {loading ? '...' : '→'}
        </button>
      </div>

      <div className="divider" />

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Weather Display */}
      {weather && (
        <div className="weather-card">

          {/* City + Country */}
          <p className="city-label">
            {weather.name.toUpperCase()}, {weather.sys.country}
          </p>

          {/* Huge temperature */}
          <div className="temp-block">
            <span className="temp-number">
              {Math.round(weather.main.temp)}
            </span>
            <span className="temp-unit">°C</span>
          </div>

          {/* Condition */}
          <p className="condition">
            {weather.weather[0].description.toUpperCase()}
          </p>

          <div className="divider" />

          {/* Stats row */}
          <div className="stats-row">
            <div className="stat">
              <span className="stat-label">FEELS LIKE</span>
              <span className="stat-value">{Math.round(weather.main.feels_like)}°</span>
            </div>
            <div className="stat">
              <span className="stat-label">HUMIDITY</span>
              <span className="stat-value">{weather.main.humidity}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">WIND</span>
              <span className="stat-value">{weather.wind.speed} m/s</span>
            </div>
            <div className="stat">
              <span className="stat-label">HIGH / LOW</span>
              <span className="stat-value">
                {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
              </span>
            </div>
          </div>

        </div>
      )}

      {/* Empty state */}
      {!weather && !error && !loading && (
        <p className="empty-state">Search a city to see the forecast</p>
      )}

    </main>
  );
}

export default App;