import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;
app.use(express.static(path.join(process.cwd(), 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
});
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
