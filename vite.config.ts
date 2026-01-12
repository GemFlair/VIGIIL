import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // CRITICAL FIX: This tells Vite "Every time you see 'process', write 'window.process' instead"
    // This connects the code to the polyfill we put in index.html
    'process': 'window.process',
    'global': 'window',
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  }
});
