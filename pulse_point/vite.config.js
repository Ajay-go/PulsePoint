import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ← Critical for Vercel
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Disable for production
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  }
});