// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ilknurgurcan.com',
  devToolbar: { enabled: false },

  // Eski adresler. Slug üretimi düzeltildiğinde (é gibi harfler artık doğru
  // çevriliyor) bir eserin adresi değişti; eski bağlantı kırılmasın.
  redirects: {
    '/eserler/la-cr-maill-re':   '/eserler/la-cremaillere',
    '/en/works/la-cr-maill-re':  '/en/works/la-cremaillere',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      // Sitemap'te de dil karşılıkları bildirilsin
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr-TR', en: 'en-US' },
      },
    }),
  ],
});