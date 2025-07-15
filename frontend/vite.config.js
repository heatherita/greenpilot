import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  css: {
   postcss: {
      plugins: [tailwindcss()],
   },
  },
  build: {
    manifest: "manifest.json",
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // adjust this if your entry point is different
    },
  },
  base: "/",
})

