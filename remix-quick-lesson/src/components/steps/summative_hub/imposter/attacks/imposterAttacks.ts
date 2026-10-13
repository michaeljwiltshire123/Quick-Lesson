import { ImposterAttackKey } from '../types/imposterTypes';

export interface AttackConfig {
  key: ImposterAttackKey;
  title: string;
  tagline: string;
  effectDescription: string;
  cooldownRounds: number;
}

export const ATTACK_REGISTRY: Record<ImposterAttackKey, AttackConfig> = {
  question_swap: {
    key: 'question_swap',
    title: 'Question Swap',
    tagline: 'Change the Question',
    effectDescription: 'Write your own question about the topic for the other players.',
    cooldownRounds: 1,
  },
  timed_panic: {
    key: 'timed_panic',
    title: 'Speed Round & Clue',
    tagline: 'Faster Timer + Extra Clue',
    effectDescription: 'Halves the timer for everyone and gives you an extra clue about the topic.',
    cooldownRounds: 1,
  },
  vote_shadow: {
    key: 'vote_shadow',
    title: 'Shadow Vote',
    tagline: 'Hide the Votes',
    effectDescription: 'Hides live vote counts on the main board until voting finishes.',
    cooldownRounds: 2,
  },
  echo_prompt: {
    key: 'echo_prompt',
    title: 'Distraction Clue',
    tagline: 'Sneaky Switch',
    effectDescription: 'Sends a slightly different question to 2 players to keep them guessing.',
    cooldownRounds: 1,
  },
};

export type ChargeBonusType = 'survival_bonus' | 'speedy_blend' | 'reset';

export function calculateAttackCharge(currentCharge: number, bonus: ChargeBonusType): number {
  const safeCurrent = Math.max(0, Math.min(100, Number.isFinite(currentCharge) ? currentCharge : 0));
  if (bonus === 'reset') return 0;
  const increment = bonus === 'survival_bonus' || bonus === 'speedy_blend' ? 50 : 0;
  return Math.min(100, Math.max(0, safeCurrent + increment));
}

export function getRandomAttackKey(): ImposterAttackKey {
  const keys: ImposterAttackKey[] = ['question_swap', 'timed_panic', 'vote_shadow', 'echo_prompt'];
  const index = Math.floor(Math.random() * keys.length);
  return keys[Math.max(0, Math.min(keys.length - 1, index))];
}
