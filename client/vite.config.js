import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
    proxy: {
      "/api": "http://go-blog-backend:3000"
    }
  },
})
