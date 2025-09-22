import { useState, useEffect } from 'react';
import { WeatherService, WeatherData } from '../services/weatherService';
import { LocationService } from '../services/locationService';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const weatherService = new WeatherService();
  const locationService = new LocationService();

  const fetchWeather = async (lat?: number, lon?: number, city?: string) => {
    try {
      setLoading(true);
      setError(null);

      let weatherData: WeatherData;

      if (lat && lon) {
        weatherData = await weatherService.getCurrentWeather(lat, lon);
      } else if (city) {
        weatherData = await weatherService.getWeatherByCity(city);
      } else {
        // Try to get current location
        try {
          const location = await locationService.getCurrentLocation();
          weatherData = await weatherService.getCurrentWeather(location.latitude, location.longitude);
        } catch (locationError) {
          // Fallback to default city if location fails
          weatherData = await weatherService.getWeatherByCity('Mumbai');
        }
      }

      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return {
    weather,
    loading,
    error,
    refetch: fetchWeather
  };
};