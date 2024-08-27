import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// Define a class for the Weather object (you can customize this as needed)
class Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(temperature: number, humidity: number, windSpeed: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5';
  private apiKey = process.env.WEATHER_API_KEY;

  // Fetch and destructure location data
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(this.buildGeocodeQuery(query));
    const data: unknown = await response.json();

    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      return { lat: (data[0] as any).lat, lon: (data[0] as any).lon };
    }

    throw new Error('Failed to retrieve valid location data');
  }

  private buildGeocodeQuery(cityName: string): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const weatherData = await response.json();
    return this.parseCurrentWeather(weatherData);
  }

  private parseCurrentWeather(response: any): Weather {
    return new Weather(response.current.temp, response.current.humidity, response.current.wind_speed);
  }

  async getWeatherData(cityName: string): Promise<Weather> {
    const coordinates = await this.fetchAndDestructureLocationData(cityName);
    return this.fetchWeatherData(coordinates);
  }
}

export default new WeatherService();





