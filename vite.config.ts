import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5183,
    strictPort: true,
    // Forward API calls to the Express server (run `npm run dev:server`) so the
    // lead form works end-to-end in local development.
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})
