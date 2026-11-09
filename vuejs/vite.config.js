import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    // Libera o acesso pela porta encaminhada do GitHub Codespaces.
    host: true,
    allowedHosts: ['.app.github.dev'],
  },
});
