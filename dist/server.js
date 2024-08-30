import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
// Get the directory name for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../../client/dist')));
const PORT = process.env.PORT || 4003;
// Handle all routes by serving the index.html file
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
