import path from 'node:path'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Use project root as Vite root so `/src/*` resolves correctly.
  // Static assets still live in `public/` via `publicDir`.
  root: '.',
  publicDir: 'public',
  plugins: [
    react(),
    mdx({
      providerImportSource: '@mdx-js/react',
    }),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
