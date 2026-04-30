 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeatherByCity(city) {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('City not found. Please check the spelling.');
  }

  const data = await response.json();
  return data;
}