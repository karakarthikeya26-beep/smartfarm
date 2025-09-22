import axios from 'axios';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  rainfall: number;
  rainForecast: string;
  description: string;
  icon: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  humidity: number;
  rainfall: number;
  description: string;
  icon: string;
}

export class WeatherService {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        pressure: data.main.pressure,
        visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
        uvIndex: 0, // UV index requires separate API call
        rainfall: data.rain ? data.rain['1h'] || 0 : 0,
        rainForecast: this.getRainForecast(data.weather[0].main),
        description: data.weather[0].description,
        icon: data.weather[0].icon
      };
    } catch (error) {
      console.error('Weather API Error:', error);
      // Return mock data if API fails
      return {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        uvIndex: 6,
        rainfall: 0,
        rainForecast: '20% chance',
        description: 'partly cloudy',
        icon: '02d'
      };
    }
  }

  async getWeatherForecast(lat: number, lon: number): Promise<ForecastData[]> {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      const forecasts = response.data.list.slice(0, 5).map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max)
        },
        humidity: item.main.humidity,
        rainfall: item.rain ? item.rain['3h'] || 0 : 0,
        description: item.weather[0].description,
        icon: item.weather[0].icon
      }));

      return forecasts;
    } catch (error) {
      console.error('Forecast API Error:', error);
      return [];
    }
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        pressure: data.main.pressure,
        visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
        uvIndex: 0,
        rainfall: data.rain ? data.rain['1h'] || 0 : 0,
        rainForecast: this.getRainForecast(data.weather[0].main),
        description: data.weather[0].description,
        icon: data.weather[0].icon
      };
    } catch (error) {
      console.error('Weather API Error:', error);
      throw error;
    }
  }

  private getRainForecast(weatherMain: string): string {
    switch (weatherMain.toLowerCase()) {
      case 'rain':
        return '80% chance';
      case 'drizzle':
        return '60% chance';
      case 'thunderstorm':
        return '90% chance';
      case 'clouds':
        return '30% chance';
      case 'clear':
        return '5% chance';
      default:
        return '20% chance';
    }
  }
}