import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Import for working with module URLs
const app = express();
// Get the directory name for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
