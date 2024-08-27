import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Define the City class
class City {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
  }
}

// Complete the HistoryService class
class HistoryService {
  constructor() {
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }

  async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Improved type narrowing for the 'ENOENT' error code
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error; // Re-throw if it's not the expected error
    }
  }

  async write(cities) {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  async getCities() {
    return this.read();
  }

  async addCity(cityName) {
    const cities = await this.read();
    const newCity = new City(cityName);
    cities.push(newCity);
    await this.write(cities);
  }

  async removeCity(id) {
    const cities = await this.read();
    const filteredCities = cities.filter(city => city.id !== id);
    await this.write(filteredCities);
  }
}

export default new HistoryService();



