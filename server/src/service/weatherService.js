import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
// Define a class for the Weather object (you can customize this as needed)
class Weather {
    constructor(temperature, humidity, windSpeed) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
}
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.apiKey = process.env.WEATHER_API_KEY;
    }
    // Fetch and destructure location data
    async fetchAndDestructureLocationData(query) {
        const response = await fetch(this.buildGeocodeQuery(query));
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
            return { lat: data[0].lat, lon: data[0].lon };
        }
        throw new Error('Failed to retrieve valid location data');
    }
    buildGeocodeQuery(cityName) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
    }
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    }
    async fetchWeatherData(coordinates) {
        const response = await fetch(this.buildWeatherQuery(coordinates));
        const weatherData = await response.json();
        return this.parseCurrentWeather(weatherData);
    }
    parseCurrentWeather(response) {
        return new Weather(response.current.temp, response.current.humidity, response.current.wind_speed);
    }
    async getWeatherData(cityName) {
        const coordinates = await this.fetchAndDestructureLocationData(cityName);
        return this.fetchWeatherData(coordinates);
    }
}
export default new WeatherService();
