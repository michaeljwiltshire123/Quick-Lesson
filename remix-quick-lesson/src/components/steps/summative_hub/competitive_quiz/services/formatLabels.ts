import { QuestionFormat } from '../types/competitiveQuizTypes';

export const FORMAT_META: Record<
  QuestionFormat,
  { label: string; tag: string; defaultPot: number; defaultSeconds: number }
> = {
  spot_the_lie: { label: 'Spot the Lie', tag: 'Deception Trap', defaultPot: 150, defaultSeconds: 10 },
  order_steps: { label: 'Order Steps', tag: 'Fast Sequence', defaultPot: 200, defaultSeconds: 12 },
  target_tap: { label: 'Target Tap', tag: 'Precision Strike', defaultPot: 175, defaultSeconds: 8 },
  speed_match: { label: 'Speed Match', tag: 'Pair Rush', defaultPot: 220, defaultSeconds: 12 },
  odd_one_out: { label: 'Odd One Out', tag: 'Mismatch Finder', defaultPot: 140, defaultSeconds: 10 },
  binary_blitz: { label: 'Binary Blitz', tag: 'Fact or Fiction', defaultPot: 100, defaultSeconds: 6 },
  reverse_instruction: { label: 'Reverse Reflex', tag: 'Inverted Command', defaultPot: 180, defaultSeconds: 7 },
  score_swap: { label: 'Score Swap Duel', tag: 'Leaderboard Ambush', defaultPot: 250, defaultSeconds: 10 },
  avatar_race: { label: 'Avatar Sprint', tag: 'Rapid Reflex Race', defaultPot: 300, defaultSeconds: 15 },
  draw_showdown: { label: 'Draw Showdown', tag: 'Visual Battle', defaultPot: 200, defaultSeconds: 20 },
  wager_drop: { label: 'Wager Drop', tag: 'High Stakes', defaultPot: 300, defaultSeconds: 15 },
  standard_mcq: { label: 'Standard MCQ', tag: 'Core Clash', defaultPot: 120, defaultSeconds: 10 },
};
