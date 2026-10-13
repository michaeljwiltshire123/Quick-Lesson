import { DontSayItGameState, Player, AdjudicationState } from '../types/dontSayItTypes';
import { calculateCardPoints } from '../game_loop/roundEscalationEngine';

export function triggerHeardTheWord(
  state: DontSayItGameState,
  player: Player,
  currentPoints: number
): DontSayItGameState {
  const adjudication: AdjudicationState = {
    type: 'heard_the_word',
    triggeredByPlayerId: player.id,
    triggeredByName: player.name,
    votesFor: 1,
    votesAgainst: 0,
    totalJudges: Math.max(1, state.players.filter((p) => p.role === 'judge' || p.role === 'guessing_judge').length),
    frozenTimeLeft: state.timerSeconds,
    frozenPoints: currentPoints,
    isActive: true,
  };

  return {
    ...state,
    adjudication,
  };
}

export function triggerFoulAdjudication(
  state: DontSayItGameState,
  player: Player,
  currentPoints: number
): DontSayItGameState {
  const adjudication: AdjudicationState = {
    type: 'foul',
    triggeredByPlayerId: player.id,
    triggeredByName: player.name,
    votesFor: 1,
    votesAgainst: 0,
    totalJudges: Math.max(1, state.players.filter((p) => p.role === 'judge' || p.role === 'guessing_judge').length),
    frozenTimeLeft: state.timerSeconds,
    frozenPoints: currentPoints,
    isActive: true,
  };

  return {
    ...state,
    adjudication,
  };
}

export function resolveAdjudicationVote(
  state: DontSayItGameState,
  isConfirmed: boolean
): DontSayItGameState {
  if (!state.adjudication) return state;

  const { type, frozenPoints } = state.adjudication;

  if (isConfirmed) {
    if (type === 'heard_the_word') {
      const awarded = calculateCardPoints(frozenPoints, state.currentRound);
      const updatedTeams = state.teams.map((t, idx) =>
        idx === state.currentTeamIndex ? { ...t, score: (t.score || 0) + awarded } : t
      );
      const nextCardIdx = (state.activeCardIndex + 1) % Math.max(1, state.cards.length);
      return {
        ...state,
        teams: updatedTeams,
        activeCardIndex: nextCardIdx,
        adjudication: undefined,
      };
    } else {
      // Foul confirmed: -50 pts penalty
      const updatedTeams = state.teams.map((t, idx) =>
        idx === state.currentTeamIndex ? { ...t, score: Math.max(0, (t.score || 0) - 50) } : t
      );
      const nextCardIdx = (state.activeCardIndex + 1) % Math.max(1, state.cards.length);
      return {
        ...state,
        teams: updatedTeams,
        activeCardIndex: nextCardIdx,
        adjudication: undefined,
      };
    }
  }

  // If rejected ("Continue"): unfreeze board and resume play with current card
  return {
    ...state,
    adjudication: undefined,
  };
}
