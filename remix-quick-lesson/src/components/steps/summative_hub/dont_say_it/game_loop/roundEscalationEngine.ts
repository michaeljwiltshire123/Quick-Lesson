import { DontSayItGameState, TeamConfig } from '../types/dontSayItTypes';

export function getRoundMultiplier(currentRound: number): number {
  const safeRound = Math.max(1, Math.min(5, currentRound || 1));
  return safeRound;
}

export function calculateCardPoints(basePoints: number, currentRound: number): number {
  const safeBase = Math.max(100, basePoints || 100);
  const multiplier = getRoundMultiplier(currentRound);
  return safeBase * multiplier;
}

export function processCorrectGuess(
  state: DontSayItGameState,
  awardedBasePoints: number
): DontSayItGameState {
  const points = calculateCardPoints(awardedBasePoints, state.currentRound);
  const updatedTeams = state.teams.map((t, idx) =>
    idx === state.currentTeamIndex ? { ...t, score: (t.score || 0) + points } : t
  );

  const nextCardIdx = (state.activeCardIndex + 1) % Math.max(1, state.cards.length);
  return {
    ...state,
    teams: updatedTeams,
    activeCardIndex: nextCardIdx,
  };
}

export function processPassCard(
  state: DontSayItGameState,
  penaltyPoints = 50
): DontSayItGameState {
  const updatedTeams = state.teams.map((t, idx) =>
    idx === state.currentTeamIndex ? { ...t, score: Math.max(0, (t.score || 0) - penaltyPoints) } : t
  );

  const nextCardIdx = (state.activeCardIndex + 1) % Math.max(1, state.cards.length);
  return {
    ...state,
    teams: updatedTeams,
    activeCardIndex: nextCardIdx,
  };
}

export function advanceTeamTurn(state: DontSayItGameState): DontSayItGameState {
  const nextTeamIdx = state.currentTeamIndex + 1;
  const totalTeams = Math.max(1, state.teams.length);

  if (nextTeamIdx < totalTeams) {
    return {
      ...state,
      currentTeamIndex: nextTeamIdx,
      timerSeconds: state.config?.timeLimitSeconds || 60,
    };
  }

  // Round completed for all teams
  const nextRound = state.currentRound + 1;
  if (nextRound > state.totalRounds) {
    return {
      ...state,
      status: 'game_over',
    };
  }

  return {
    ...state,
    currentRound: nextRound,
    currentTeamIndex: 0,
    status: 'round_recap',
    timerSeconds: state.config?.timeLimitSeconds || 60,
  };
}
