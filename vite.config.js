import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  define: {
    global: {},
  },
  server: {
    host: '0.0.0.0',  // Écoute sur toutes les interfaces réseau
    port: 5174,        // Ou un autre port de votre choix
    open: true,        // Ouvre automatiquement le navigateur (optionnel)
    historyApiFallback: true, // Permet le fallback vers index.html
  },
  build: {
    outDir: 'dist', // Le répertoire de sortie pour le build
  }
});
