import { Player } from '../types/imposterTypes';

export interface TieBreakerResult {
  eliminated: Player;
  reason: string;
}

export function calculateTieBreakerResolution(
  playerA: Player,
  playerB: Player,
  voteA: number,
  voteB: number
): TieBreakerResult {
  if (voteA === voteB) {
    const aIsImp = playerA.role === 'imposter';
    const bIsImp = playerB.role === 'imposter';

    // If Imposter is tied with innocent player on even vote split, eliminate the non-Imposter
    if (aIsImp && !bIsImp) {
      return {
        eliminated: playerB,
        reason: `Even split tie: Imposter survived; non-imposter ${playerB.name} was eliminated.`,
      };
    }
    if (!aIsImp && bIsImp) {
      return {
        eliminated: playerA,
        reason: `Even split tie: Imposter survived; non-imposter ${playerA.name} was eliminated.`,
      };
    }
    const eliminated = playerA.score < playerB.score ? playerA : playerB;
    return {
      eliminated,
      reason: `Even split tie: ${eliminated.name} eliminated on prior performance tie-break.`,
    };
  }

  const eliminated = voteA > voteB ? playerA : playerB;
  return {
    eliminated,
    reason: `${eliminated.name} received majority of class tie-breaker votes (${Math.max(voteA, voteB)} vs ${Math.min(voteA, voteB)}).`,
  };
}
