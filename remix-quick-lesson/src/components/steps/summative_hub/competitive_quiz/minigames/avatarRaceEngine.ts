import { PlayerState } from '../types/competitiveQuizTypes';
import { RaceRunner, RaceBet } from '../types/minigameTypes';

export const selectRacersAndOnlookers = (
  players: PlayerState[]
): { racers: RaceRunner[]; onlookerIds: string[] } => {
  const runnerCount = Math.max(2, Math.floor(players.length * 0.25));
  const shuffled = [...players].sort(() => 0.5 - Math.random());
  const selectedRunners = shuffled.slice(0, runnerCount);
  const selectedIds = new Set(selectedRunners.map((r) => r.id));

  const colors = ['#F59E0B', '#3B82F6', '#EC4899', '#10B981', '#8B5CF6', '#EF4444'];
  const racers: RaceRunner[] = selectedRunners.map((p, idx) => ({
    id: p.id,
    name: p.name,
    avatarColor: colors[idx % colors.length],
    positionPercent: 0,
    isRacing: true,
  }));

  const onlookerIds = players.filter((p) => !selectedIds.has(p.id)).map((p) => p.id);
  return { racers, onlookerIds };
};

export const advanceRacer = (
  racerId: string,
  racers: RaceRunner[],
  isCorrectShape: boolean
): { updatedRacers: RaceRunner[]; winnerId?: string } => {
  const nextRacers = racers.map((r) => {
    if (r.id !== racerId) return r;
    const delta = isCorrectShape ? 6 : -3;
    const nextPos = Math.max(0, Math.min(100, r.positionPercent + delta));
    return { ...r, positionPercent: nextPos };
  });

  const winner = nextRacers.find((r) => r.positionPercent >= 100);
  return { updatedRacers: nextRacers, winnerId: winner?.id };
};

export const resolveRaceBettingPayouts = (
  racers: RaceRunner[],
  bets: RaceBet[],
  players: PlayerState[]
): PlayerState[] => {
  const map = new Map(players.map((p) => [p.id, { ...p }]));
  const sortedRacers = [...racers].sort((a, b) => b.positionPercent - a.positionPercent);
  const firstId = sortedRacers[0]?.id;
  const secondId = sortedRacers[1]?.id;
  const thirdId = sortedRacers[2]?.id;

  let totalPot = bets.reduce((sum, b) => sum + b.wagerPoints, 0);
  let claimedPot = 0;

  for (const bet of bets) {
    const better = map.get(bet.betterPlayerId);
    if (!better) continue;
    if (bet.predictedFirstId === firstId) {
      const win = bet.wagerPoints * 2;
      better.score += win;
      claimedPot += win;
    } else if (bet.predictedSecondId === secondId) {
      const halfWin = bet.wagerPoints;
      better.score += halfWin;
      claimedPot += halfWin;
    }
  }

  // Remainder split 60% 30% 10% between 1st, 2nd, and 3rd racers
  const remainingPot = Math.max(0, totalPot - claimedPot + 300);
  const r1 = map.get(firstId);
  const r2 = map.get(secondId);
  const r3 = map.get(thirdId);

  if (r1) r1.score += Math.floor(remainingPot * 0.6);
  if (r2) r2.score += Math.floor(remainingPot * 0.3);
  if (r3) r3.score += Math.floor(remainingPot * 0.1);

  return Array.from(map.values());
};
