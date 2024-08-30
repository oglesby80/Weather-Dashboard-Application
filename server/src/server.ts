import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set the directory path for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Handle all other routes by serving the index.html file
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






