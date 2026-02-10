import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Use relative base so built assets load correctly on GitHub Pages
  // (works for project pages and user pages when served from `/`).
  base: './',
  logLevel: 'error', // Suppress warnings, only show errors
  resolve: {
    alias: {
      // allow imports like `@/App.jsx` to resolve to `/src/App.jsx`
      '@': '/src'
    }
  },
  plugins: [
    react(),
  ]
});
