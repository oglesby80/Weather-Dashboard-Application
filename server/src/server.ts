import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3003;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the client/dist folder
const clientPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientPath));

// Route to serve index.html for any unmatched route
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});




