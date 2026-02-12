import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9004,
    proxy: {
      '/api': {
        target: 'https://gymspring.gowoobro.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 9004,
    allowedHosts: ['gym.gowoobro.com'],
    proxy: {
      '/api': {
        target: 'https://gymspring.gowoobro.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
