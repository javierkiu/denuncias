import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // necesario para Docker
    port: 3000,
    watch: {
      usePolling: true // necesario para que hot reload funcione en Docker
    }
  }
})
