import { PlayerState, DecoyViolation } from '../types/competitiveQuizTypes';

export interface PotStealOutcome {
  success: boolean;
  awardedPoints: number;
  newPotValue: number;
  updatedPlayers: PlayerState[];
  violation?: DecoyViolation;
  message: string;
}

export const processPotStealAttempt = (
  attemptingPlayerId: string,
  players: PlayerState[],
  currentPatternId: string,
  currentPotValue: number
): PotStealOutcome => {
  const playerMap = new Map(players.map((p) => [p.id, { ...p }]));
  const pupil = playerMap.get(attemptingPlayerId);

  if (!pupil) {
    return { success: false, awardedPoints: 0, newPotValue: currentPotValue, updatedPlayers: players, message: 'Pupil not found.' };
  }

  // Check if current background skin is the True Pattern
  const isTruePattern = currentPatternId === 'true_gold_honeycomb';

  if (isTruePattern) {
    const bounty = Math.max(50, currentPotValue);
    pupil.score += bounty;
    return {
      success: true,
      awardedPoints: bounty,
      newPotValue: 0,
      updatedPlayers: Array.from(playerMap.values()),
      message: `Heist Successful! ${pupil.name} hijacked the ${bounty} pt pot!`,
    };
  }

  // Decoy pattern penalty: forfeit 50% of current points
  const penalty = Math.max(20, Math.floor(pupil.score * 0.5));
  pupil.score = Math.max(0, pupil.score - penalty);

  // Find bottom 5 players (excluding the violator)
  const otherPlayers = Array.from(playerMap.values())
    .filter((p) => p.id !== pupil.id)
    .sort((a, b) => a.score - b.score);

  const bottom5 = otherPlayers.slice(0, 5);
  if (bottom5.length > 0) {
    const share = Math.floor(penalty / bottom5.length);
    for (const b of bottom5) {
      const p = playerMap.get(b.id);
      if (p) p.score += share;
    }
  }

  const violation: DecoyViolation = {
    playerId: pupil.id,
    playerName: pupil.name,
    reason: 'Hijacked on decoy pattern',
    penaltyPoints: penalty,
    timestamp: Date.now(),
  };

  return {
    success: false,
    awardedPoints: 0,
    newPotValue: currentPotValue + Math.floor(penalty * 0.2), // 20% penalty fee feeds pot
    updatedPlayers: Array.from(playerMap.values()),
    violation,
    message: `${pupil.name} sprung a decoy trap and lost ${penalty} pts!`,
  };
};
