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
  // SAFE CONFIG: We only polyfill specific properties to avoid breaking the build
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.version': JSON.stringify(''),
    'global': 'window',
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  }
});
