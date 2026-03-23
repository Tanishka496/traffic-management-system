import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: '.vite',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/drivers': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
