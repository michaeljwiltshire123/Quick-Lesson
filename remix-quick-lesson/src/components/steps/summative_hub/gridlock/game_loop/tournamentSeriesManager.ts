import { TournamentFormat, TournamentScore, TeamColor } from '../types/gridlockTypes';

export function getRequiredWins(format: TournamentFormat): number {
  switch (format) {
    case 'best-of-7':
      return 4;
    case 'best-of-5':
      return 3;
    case 'best-of-3':
    default:
      return 2;
  }
}

export interface TournamentSeriesState {
  score: TournamentScore;
  requiredWins: number;
  isSeriesConcluded: boolean;
  championTeam: TeamColor | null;
  matchHistory: { matchNumber: number; winningTeam: TeamColor }[];
}

export function recordMatchWin(
  currentScore: TournamentScore,
  matchWinner: TeamColor,
  history: { matchNumber: number; winningTeam: TeamColor }[] = []
): TournamentSeriesState {
  const requiredWins = getRequiredWins(currentScore.format);
  const nextRedWins = matchWinner === 'red' ? currentScore.redWins + 1 : currentScore.redWins;
  const nextBlueWins = matchWinner === 'blue' ? currentScore.blueWins + 1 : currentScore.blueWins;

  const isRedChampion = nextRedWins >= requiredWins;
  const isBlueChampion = nextBlueWins >= requiredWins;
  const isSeriesConcluded = isRedChampion || isBlueChampion;

  const nextScore: TournamentScore = {
    ...currentScore,
    redWins: nextRedWins,
    blueWins: nextBlueWins,
    currentMatch: isSeriesConcluded ? currentScore.currentMatch : currentScore.currentMatch + 1,
  };

  const nextHistory = [
    ...history,
    { matchNumber: currentScore.currentMatch, winningTeam: matchWinner },
  ];

  return {
    score: nextScore,
    requiredWins,
    isSeriesConcluded,
    championTeam: isRedChampion ? 'red' : isBlueChampion ? 'blue' : null,
    matchHistory: nextHistory,
  };
}
