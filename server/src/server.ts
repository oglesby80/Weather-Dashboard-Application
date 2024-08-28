import express, { Response } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the client/dist directory
const clientPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientPath));

// Fallback to index.html for SPA
app.get('*', (_req, res: Response) => {
  res.sendFile(path.resolve(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});





