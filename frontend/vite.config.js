import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true  // Needed for Docker volumes on some systems
    },
    host: true,  // Listen on all interfaces
    proxy: {
      '/api': {
        target: 'http://api:8888',  // Use service name from docker-compose
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Add these properties for better error handling
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from:', req.url, proxyRes.statusCode);
          });
        }
      }
    }
  }
})