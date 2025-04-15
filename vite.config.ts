import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config({ path: '.env.local' });

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      // Proxy requests to your API during development
      '/api-proxy': {
        target: process.env.VITE_PUBLIC_API_URL || 'https://feikgeerts.nl',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-proxy/, ''),
      },
    },
  },
});
