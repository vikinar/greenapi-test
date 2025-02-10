import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://7105.api.greenapi.com', // Базовый URL вашего API
        changeOrigin: true, // Необходимо для CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Убираем префикс /api из запроса
      },
    },
  },
})
