/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setupTests.ts',
  },
  resolve: {
    alias: {
      components: '/src/components',
      styles: '/src/styles',
      hooks: '/src/hooks',
      shared: '/src/shared',
      utils: '/src/utils',
      assets: '/src/assets',
    },
  },
});
