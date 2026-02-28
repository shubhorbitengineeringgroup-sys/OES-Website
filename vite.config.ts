import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// When deploying to custom domain (orbitengineerings.com), set VITE_CUSTOM_DOMAIN=true
// in GitHub Actions or local env. Otherwise falls back to /OES-Website/ for github.io.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_CUSTOM_DOMAIN === 'true' ? '/' : '/OES-Website/',
})
