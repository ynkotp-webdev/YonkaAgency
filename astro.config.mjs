// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Власний домен yonkaagency.com.ua → сайт живе в корені, без підпапки.
// Внутрішні посилання будуються від import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://yonkaagency.com.ua',
  base: '/',
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
