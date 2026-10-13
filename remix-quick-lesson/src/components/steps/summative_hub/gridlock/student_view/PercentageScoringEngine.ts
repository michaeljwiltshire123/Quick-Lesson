import { TeamColor, Player } from '../types/gridlockTypes';

export interface StudentSubmission {
  playerId: string;
  playerName: string;
  team: TeamColor;
  submittedAnswer: string;
  isCorrect: boolean;
  responseTimeMs: number;
}

export interface TeamScoringResult {
  team: TeamColor;
  totalPlayers: number;
  correctSubmissions: number;
  accuracyPercentage: number;
  averageResponseTimeMs: number;
}

export interface RoundWinnerResolution {
  winningTeam: TeamColor | null;
  redScore: TeamScoringResult;
  blueScore: TeamScoringResult;
  fastestPlayer: StudentSubmission | null;
  isDraw: boolean;
}

export function calculateTeamMetrics(
  team: TeamColor,
  players: Player[],
  submissions: StudentSubmission[]
): TeamScoringResult {
  const teamPlayers = players.filter((p) => p.team === team);
  const totalCount = Math.max(1, teamPlayers.length);
  const teamSubs = submissions.filter((s) => s.team === team && s.isCorrect);

  const correctCount = teamSubs.length;
  const accuracyPercentage = Math.round((correctCount / totalCount) * 100);

  const totalTime = teamSubs.reduce((acc, curr) => acc + curr.responseTimeMs, 0);
  const averageResponseTimeMs = correctCount > 0 ? Math.round(totalTime / correctCount) : 999999;

  return {
    team,
    totalPlayers: totalCount,
    correctSubmissions: correctCount,
    accuracyPercentage,
    averageResponseTimeMs,
  };
}

export function resolveRoundWinner(
  players: Player[],
  submissions: StudentSubmission[]
): RoundWinnerResolution {
  const redScore = calculateTeamMetrics('red', players, submissions);
  const blueScore = calculateTeamMetrics('blue', players, submissions);

  // Find overall fastest correct respondent
  const correctSubs = submissions
    .filter((s) => s.isCorrect)
    .sort((a, b) => a.responseTimeMs - b.responseTimeMs);
  const fastest = correctSubs[0] || null;

  let winningTeam: TeamColor | null = null;
  let isDraw = false;

  if (redScore.accuracyPercentage > blueScore.accuracyPercentage) {
    winningTeam = 'red';
  } else if (blueScore.accuracyPercentage > redScore.accuracyPercentage) {
    winningTeam = 'blue';
  } else if (redScore.accuracyPercentage > 0) {
    // Tiebreaker: compare average response times
    if (redScore.averageResponseTimeMs < blueScore.averageResponseTimeMs) {
      winningTeam = 'red';
    } else if (blueScore.averageResponseTimeMs < redScore.averageResponseTimeMs) {
      winningTeam = 'blue';
    } else {
      isDraw = true;
    }
  } else {
    isDraw = true;
  }

  return { winningTeam, redScore, blueScore, fastestPlayer: fastest, isDraw };
}
