const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'dist' directory (Vite's build output)
app.use(express.static(path.join(__dirname, 'dist')));

// For any path, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`VIGIIL web server listening on port ${port}`);
});