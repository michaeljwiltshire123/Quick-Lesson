import { PlayerState } from '../types/competitiveQuizTypes';

export interface UnderdogPerks {
  isUnderdog: boolean;
  bonusSpeedSeconds: number;
  highTierLootRateMultiplier: number;
}

export const getBottom5PlayerIds = (players: PlayerState[]): Set<string> => {
  if (players.length <= 3) return new Set();
  const sorted = [...players].sort((a, b) => a.score - b.score);
  return new Set(sorted.slice(0, 5).map((p) => p.id));
};

export const isUnderdogPupil = (playerId: string, players: PlayerState[]): boolean => {
  const bottomSet = getBottom5PlayerIds(players);
  return bottomSet.has(playerId);
};

export const applyUnderdogSpeedBonus = (
  baseSeconds: number,
  playerId: string,
  players: PlayerState[]
): number => {
  const isUnderdog = isUnderdogPupil(playerId, players);
  return isUnderdog ? baseSeconds + 3 : baseSeconds;
};

export const getUnderdogPerks = (
  playerId: string,
  players: PlayerState[]
): UnderdogPerks => {
  const isUnderdog = isUnderdogPupil(playerId, players);
  return {
    isUnderdog,
    bonusSpeedSeconds: isUnderdog ? 3 : 0,
    highTierLootRateMultiplier: isUnderdog ? 2.0 : 1.0,
  };
};
