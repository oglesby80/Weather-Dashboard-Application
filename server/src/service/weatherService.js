import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(date, tempF, windSpeed, humidity, icon, iconDescription) {
        this.date = date;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
        this.icon = icon;
        this.iconDescription = iconDescription;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5/';
        this.apiKey = process.env.WEATHER_API_KEY;
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData(query) {
        const response = await fetch(`${this.baseURL}weather?q=${query}&appid=${this.apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }
        return await response.json();
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        return {
            lat: locationData.coord.lat,
            lon: locationData.coord.lon,
        };
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery(cityName) {
        return `${this.baseURL}weather?q=${cityName}&appid=${this.apiKey}`;
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${this.apiKey}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData(cityName) {
        const locationData = await this.fetchLocationData(cityName);
        return this.destructureLocationData(locationData);
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const response = await fetch(this.buildWeatherQuery(coordinates));
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const { current } = response;
        return new Weather(new Date(current.dt * 1000).toLocaleDateString(), current.temp, current.wind_speed, current.humidity, current.weather[0].icon, current.weather[0].description);
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(weatherData) {
        return weatherData.map((daily) => new Weather(new Date(daily.dt * 1000).toLocaleDateString(), daily.temp.day, daily.wind_speed, daily.humidity, daily.weather[0].icon, daily.weather[0].description));
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(cityName) {
        const coordinates = await this.fetchAndDestructureLocationData(cityName);
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecast = this.buildForecastArray(weatherData.daily.slice(1, 6)); // Next 5 days
        return { current: currentWeather, forecast };
    }
    getWeatherData(cityName) {
        throw new Error('Method not implemented.');
    }
}
export default new WeatherService();
