// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sardunyaatolyesi.github.io',
  base: '/ilknur-gurcan',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()]
  }
});