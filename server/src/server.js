import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
dotenv.config();
// Import the routes
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// TODO: Serve static files of the entire client dist folder
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Implement middleware to connect the routes
app.use(routes);
// Catch-all route to serve index.html (in case the user manually navigates)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
