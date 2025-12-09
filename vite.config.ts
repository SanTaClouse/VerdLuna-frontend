/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // En producción: false para reducir tamaño
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React y React DOM en su propio chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separar Bootstrap y componentes UI
          'ui-vendor': ['react-bootstrap', 'bootstrap'],
          // Separar librerías de utilidades
          'utils-vendor': ['axios', 'sweetalert2'],
        }
      }
    },
    chunkSizeWarningLimit: 600,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/*.spec.tsx',
        '**/*.test.tsx',
      ]
    }
  }
})
