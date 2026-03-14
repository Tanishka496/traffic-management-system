import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: '.vite',
  server: {
    proxy: {
      '/drivers': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
