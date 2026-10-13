import { MysteryGiftDefinition } from '../types/mysteryGiftTypes';
import { GIFTS_PART_1 } from './catalogPart1';
import { GIFTS_PART_2 } from './catalogPart2';

export const ALL_MYSTERY_GIFTS: MysteryGiftDefinition[] = [
  ...GIFTS_PART_1,
  ...GIFTS_PART_2,
];

export const getRandomMysteryGifts = (
  count: number = 3,
  isUnderdog: boolean = false
): MysteryGiftDefinition[] => {
  const pool = [...ALL_MYSTERY_GIFTS];
  // Underdog rubber-banding: prioritize epic / legendary / high-swing items
  const weighted = isUnderdog
    ? pool.filter((g) => g.rarity === 'epic' || g.rarity === 'legendary' || g.category === 'boost')
    : pool;

  const shuffled = weighted.sort(() => 0.5 - Math.random());
  return (shuffled.slice(0, count).length === count ? shuffled : pool.sort(() => 0.5 - Math.random())).slice(0, count);
};

export const getGiftById = (id: string): MysteryGiftDefinition | undefined => {
  return ALL_MYSTERY_GIFTS.find((g) => g.id === id);
};
