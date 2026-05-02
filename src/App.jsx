import { useState } from 'react';
import { fetchWeatherByCity } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './styles/App.styles.css';

// Maps weather condition codes to subtle background tints
// Full list: openweathermap.org/weather-conditions
function getBgTint(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return '#e8e0d8'; // thunderstorm — darker
  if (weatherId >= 300 && weatherId < 400) return '#eaeef0'; // drizzle — cool grey
  if (weatherId >= 500 && weatherId < 600) return '#e8ecf0'; // rain — slate
  if (weatherId >= 600 && weatherId < 700) return '#f0f2f5'; // snow — pale cold
  if (weatherId >= 700 && weatherId < 800) return '#ede8e0'; // haze/fog — warm muted
  if (weatherId === 800) return '#f5f0e8';                   // clear sky — warm gold
  if (weatherId > 800) return '#eceef0';                     // clouds — cool neutral
  return '#f0ede8';                                          // default
}

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

  // Dynamically set background based on weather condition
  const bgColor = weather ? getBgTint(weather.weather[0].id) : '#f0ede8';

  return (
    <main
      className="container"
      style={{
        backgroundColor: bgColor,
        transition: 'background-color 0.8s ease'
      }}
    >
      <header className="header">
        <span className="header-label">WEATHER</span>
        <span className="header-date">
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })}
        </span>
      </header>

      <SearchBar
        city={city}
        onChange={setCity}
        onSearch={handleSearch}
        loading={loading}
      />

      <div className="divider" />

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}

      {!weather && !error && !loading && (
        <p className="empty-state">Search a city to see the forecast</p>
      )}

    </main>
  );
}

export default App;