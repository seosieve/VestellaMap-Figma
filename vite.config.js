import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/code.ts'),
      name: 'VestellaMap',
      fileName: 'code',
      formats: ['iife']
    },
    outDir: '.',
    rollupOptions: {
      external: ['@figma/plugin-typings'],
      output: {
        globals: {
          '@figma/plugin-typings': 'figma'
        }
      }
    },
    target: 'es2015',
    minify: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}); 