import { Player } from '../types/imposterTypes';

export type WinState = 'in_progress' | 'innocents_win' | 'imposters_win';

export interface WinConditionResult {
  state: WinState;
  aliveInnocentsCount: number;
  aliveImpostersCount: number;
  summaryMessage: string;
}

export function checkWinCondition(players: Player[]): WinConditionResult {
  const aliveInnocents = players.filter((p) => p.isAlive && p.role === 'innocent');
  const aliveImposters = players.filter((p) => p.isAlive && p.role === 'imposter');

  if (aliveImposters.length === 0) {
    return {
      state: 'innocents_win',
      aliveInnocentsCount: aliveInnocents.length,
      aliveImpostersCount: 0,
      summaryMessage: 'Team Victory! All classroom imposters were unmasked by honest inquiry.',
    };
  }

  if (aliveInnocents.length === 0) {
    return {
      state: 'imposters_win',
      aliveInnocentsCount: 0,
      aliveImpostersCount: aliveImposters.length,
      summaryMessage: 'Master Bluff! The imposters successfully deceived the class to the end.',
    };
  }

  return {
    state: 'in_progress',
    aliveInnocentsCount: aliveInnocents.length,
    aliveImpostersCount: aliveImposters.length,
    summaryMessage: `${aliveInnocents.length} Innocent pupils remaining • ${aliveImposters.length} Imposters hidden`,
  };
}
