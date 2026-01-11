import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT) || 8080;
const host = '0.0.0.0';

const distPath = path.join(__dirname, 'dist');

console.log('Serving static files from: ' + distPath);

if (!fs.existsSync(distPath)) {
  console.error('ERROR: "dist" folder not found. Ensure "npm run build" runs before starting.');
}

app.use(express.static(distPath, { maxAge: '1y', etag: false }));

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Error: Application not built. Run npm run build.');
  }
});

app.listen(port, host, () => {
  console.log('Server listening on http://' + host + ':' + port);
});
