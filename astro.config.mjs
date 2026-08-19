// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Проєктний репозиторій ynkotp-webdev/YonkaAgency → сайт живе в підпапці.
// Внутрішні посилання будуються від import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://ynkotp-webdev.github.io',
  base: '/YonkaAgency',
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
