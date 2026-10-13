import { POP_CULTURE_CATEGORIES, PopCultureCategory } from '../presetData';

export async function runCategoryQueue(
  primary: PopCultureCategory, run: (category: PopCultureCategory) => Promise<unknown>,
) {
  const queue = [primary, ...POP_CULTURE_CATEGORIES.filter((category) => category !== primary)];
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(3, queue.length) }, async () => {
    while (cursor < queue.length) {
      const category = queue[cursor++];
      await run(category);
    }
  }));
}
