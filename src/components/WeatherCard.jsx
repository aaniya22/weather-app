import StatItem from './StatItem';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">

      <p className="city-label">
        {weather.name.toUpperCase()}, {weather.sys.country}
      </p>

      <div className="temp-block">
        <span className="temp-number">
          {Math.round(weather.main.temp)}
        </span>
        <span className="temp-unit">°C</span>
      </div>

      <p className="condition">
        {weather.weather[0].description.toUpperCase()}
      </p>

      <div className="divider" />

      <div className="stats-row">
        <StatItem
          label="FEELS LIKE"
          value={`${Math.round(weather.main.feels_like)}°`}
        />
        <StatItem
          label="HUMIDITY"
          value={`${weather.main.humidity}%`}
        />
        <StatItem
          label="WIND"
          value={`${weather.wind.speed} m/s`}
        />
        <StatItem
          label="HIGH / LOW"
          value={`${Math.round(weather.main.temp_max)}° / ${Math.round(weather.main.temp_min)}°`}
          isLast={true}
        />
      </div>

    </div>
  );
}

export default WeatherCard;