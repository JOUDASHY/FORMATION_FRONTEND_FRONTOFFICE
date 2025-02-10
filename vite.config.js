import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    global: {},
  },
  build: {
    sourcemap: false, 
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    open: true,
  },
});
