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
  // CRITICAL FIX: We define the entire 'process' object to stop the crash.
  define: {
    'process': JSON.stringify({
      env: {
        NODE_ENV: 'production',
        // Add any other env vars your libs might expect here
      },
      browser: true,
      version: 'v16.0.0',
      platform: 'browser'
    }),
    // Fix "global is not defined" errors common in Web3/Crypto libs
    'global': 'window',
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  }
});
