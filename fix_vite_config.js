import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Fixing Vite configuration for browser compatibility...");

// We add specific code to define __dirname inside the configuration file
// This prevents the "ReferenceError: __dirname is not defined" crash
const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // The magic fix: polyfill process.env so the browser doesn't crash
  define: {
    'process.env': {},
    'process.platform': JSON.stringify('browser'),
    'process.version': JSON.stringify('v16.0.0')
  },
  build: {
    chunkSizeWarningLimit: 1600,
  }
});
`;

fs.writeFileSync(path.join(__dirname, 'vite.config.ts'), viteConfig);

console.log("✅ vite.config.ts has been rewritten with the fix.");
console.log("👉 Now run: npm run build");