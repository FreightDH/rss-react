import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      api: '/src/api',
      styles: '/src/styles',
      hooks: '/src/hooks',
    },
  },
});
