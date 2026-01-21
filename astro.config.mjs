// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  site: 'https://kuretao.github.io/For-Dasha-s-Sister/',
  base: '/',
});
