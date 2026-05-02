import { useState } from 'react';
import { fetchWeatherByCity } from '../services/weatherApi';

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // This is the only function App needs to call
  async function search(city) {
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

  // We return state + the search function
  // App.jsx will destructure exactly what it needs
  return { weather, error, loading, search };
}

export default useWeather;