import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Додати нову роботу = додати один .md файл у src/content/roboty/.
// Заміри обов'язкові: саме вони, а не картинка, є доказом рівня.
const roboty = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/roboty' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.enum(['Редизайн', 'Лендінг', 'Багатосторінковий сайт']),
      // Чесна мітка. Поки немає зданих замовлень — тільки 'concept' або 'draft'.
      // concept — редизайн чужого сайту з власної ініціативи (є sourceUrl і «було»).
      // draft   — сайт із нуля під реального замовника, ще не зданий (немає «було»).
      status: z.enum(['concept', 'draft', 'client']).default('concept'),
      niche: z.string(),
      // Тільки для редизайнів: адреса чинного сайту, з якого знято «було».
      sourceUrl: z.string().url().optional(),
      resultUrl: z.string().url().optional(),
      date: z.date(),
      order: z.number().default(0),
      summary: z.string(),
      before: z.object({ desktop: image(), mobile: image() }).optional(),
      after: z.object({ desktop: image(), mobile: image() }),
      // Заміри: те, що не можна згенерувати.
      // before відсутній — коли порівнювати нема з чим: показуємо одне значення.
      metrics: z.array(
        z.object({
          label: z.string(),
          before: z.string().optional(),
          after: z.string(),
          better: z.enum(['after', 'before', 'equal']).default('after'),
        })
      ),
      problems: z.array(z.object({ title: z.string(), detail: z.string() })).default([]),
      decisions: z.array(z.object({ title: z.string(), detail: z.string() })),
      // Чесність: що робота втратила або ще не закриває
      tradeoffs: z.array(z.string()).default([]),
    })
    // «Було» без адреси джерела — це вигадка. Не пускаємо.
    .refine((d) => !d.before || !!d.sourceUrl, {
      message: 'before задано без sourceUrl — знімок «до» має вести на реальний сайт',
    }),
});

export const collections = { roboty };
