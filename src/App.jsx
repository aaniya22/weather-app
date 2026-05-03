import { useState } from 'react';
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import SkeletonLoader from './components/SkeletonLoader';
import './styles/App.styles.css';

function getBgTint(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return '#e8e0d8';
  if (weatherId >= 300 && weatherId < 400) return '#eaeef0';
  if (weatherId >= 500 && weatherId < 600) return '#e8ecf0';
  if (weatherId >= 600 && weatherId < 700) return '#f0f2f5';
  if (weatherId >= 700 && weatherId < 800) return '#ede8e0';
  if (weatherId === 800) return '#f5f0e8';
  if (weatherId > 800) return '#eceef0';
  return '#f0ede8';
}

function App() {
  const [city, setCity] = useState('');
  const { weather, error, loading, search } = useWeather();

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
        onSearch={() => search(city)}
        loading={loading}
      />

      <div className="divider" />

      {error && <p className="error">{error}</p>}

      {loading && <SkeletonLoader />}

      {weather && !loading && <WeatherCard weather={weather} />}

      {!weather && !error && !loading && (
        <p className="empty-state">Search a city to see the forecast</p>
      )}

    </main>
  );
}

export default App;