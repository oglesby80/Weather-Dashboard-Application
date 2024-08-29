import { Router } from 'express';
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';
const router = Router();
// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        const { cityName } = req.body;
        if (!cityName) {
            return res.status(400).json({ error: 'City name is required' });
        }
        // Get weather data from the city name
        const weatherData = await weatherService.getWeatherData(cityName);
        // Save city to search history
        await historyService.addCity(cityName);
        // Return weather data
        return res.json(weatherData);
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
// GET search history
router.get('/history', async (_req, res) => {
    try {
        const cities = await historyService.getCities();
        return res.json(cities);
    }
    catch (error) {
        console.error('Error fetching search history:', error);
        return res.status(500).json({ error: 'Failed to fetch search history' });
    }
});
// BONUS: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await historyService.removeCity(id);
        return res.json({ message: 'City removed successfully' });
    }
    catch (error) {
        console.error('Error deleting city from history:', error);
        return res.status(500).json({ error: 'Failed to delete city from history' });
    }
});
export default router;
