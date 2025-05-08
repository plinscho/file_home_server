import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true  // Needed for Docker volumes on some systems
    },
    host: true  // Listen on all interfaces
  }
})