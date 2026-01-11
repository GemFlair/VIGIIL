import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';[ 1 (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFK_bxnN7Bx4D63oHNDPJeKUn5WfiJ1qvrtic_LYLfr0au2NCMgy6wkZ-OVQjEGnshG1j_mas-6ksfGbS0_Y-ShOb_iknkf-wPiXgH7JQm586x0gaU-NnPycVI=)]

// 1. Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();[ 1 (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFK_bxnN7Bx4D63oHNDPJeKUn5WfiJ1qvrtic_LYLfr0au2NCMgy6wkZ-OVQjEGnshG1j_mas-6ksfGbS0_Y-ShOb_iknkf-wPiXgH7JQm586x0gaU-NnPycVI=)]

// 2.[ 2 (https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFZdgR6PHWPb_MBaMJmhrs1OqhHGU9FGEWbUflil926EJYMVoFZM-MuT9KkCQALdljt-xipdTbC6WsrUfEYiq4WRtNaanBCHkv9NP_xBHznwMzRD-f2WtjU_uBuqfA0E9PXKirmNYTRTZfD7kIMEtDp_Ap5gAhqQXkuEP-3__NhF_Q0uAufju28IB0rKcagJn9djXCCZzxH7dFHyzu1B0dsRrPzMZ2AtHu382YYRNIrq5x8rT9bLNA=)] Cloud Run provides the PORT environment variable (defaults to 8080)
const port = parseInt(process.env.PORT) || 8080;
// 3. HOST must be 0.0.0.0 to listen on all interfaces (required by Cloud Run)
const host = '0.0.0.0';

// 4. Resolve the path to the 'dist' folder
const distPath = path.join(__dirname, 'dist');

// Debug: Log where we are looking for files
console.log(`Starting server...`);
console.log(`Serving static files from: ${distPath}`);

// Check if dist exists to prevent vague errors
if (!fs.existsSync(distPath)) {
  console.error('CRITICAL ERROR: "dist" folder not found. Did "npm run build" run?');
}

// 5. Serve static files with caching
app.use(express.static(distPath, {
  maxAge: '1y', // Cache assets for 1 year
  etag: false
}));

// 6. SPA Catch-all: Send index.html for any other request
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('Error: index.html missing.');
    res.status(404).send('Application not built. Run "npm run build".');
  }
});

// 7. Start the listener
app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${}`);
});