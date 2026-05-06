import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves at /<repo-name>/. Only apply base in production build —
// dev server stays at "/" for normal localhost behavior.
// Override with VITE_BASE env var if you deploy elsewhere (Netlify, Vercel, custom domain).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? (process.env.VITE_BASE ?? '/mercan-react-framework/') : '/',
  server: { port: 5174 },
}));
