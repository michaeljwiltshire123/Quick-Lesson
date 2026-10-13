import { Player } from '../types/imposterTypes';

export interface EliminationResult {
  votedOutPlayer: Player | null;
  secretKilledPlayers: Player[];
  allEliminated: Player[];
  isTieBreaker: boolean;
  tieCandidates: Player[];
}

export function processDoubleElimination(
  players: Player[],
  classVotes: Record<string, string>, // voterId -> targetId
  imposterKills: Record<string, string> // imposterId -> targetId
): EliminationResult {
  const activePlayers = players.filter((p) => p.isAlive);
  const voteCounts: Record<string, number> = {};

  Object.values(classVotes).forEach((targetId) => {
    if (targetId && targetId !== 'skip') {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    }
  });

  let maxVotes = 0;
  let topCandidates: string[] = [];

  Object.entries(voteCounts).forEach(([targetId, count]) => {
    if (count > maxVotes) {
      maxVotes = count;
      topCandidates = [targetId];
    } else if (count === maxVotes && maxVotes > 0) {
      topCandidates.push(targetId);
    }
  });

  const isTieBreaker = topCandidates.length > 1;
  const tieCandidates = isTieBreaker
    ? activePlayers.filter((p) => topCandidates.includes(p.id))
    : [];

  const votedOutId = !isTieBreaker && topCandidates.length === 1 ? topCandidates[0] : null;
  const votedOutPlayer = votedOutId ? activePlayers.find((p) => p.id === votedOutId) || null : null;

  // Imposter Secret Kills (cannot kill fellow imposters)
  const secretKilledMap = new Map<string, Player>();
  Object.entries(imposterKills).forEach(([impId, targetId]) => {
    const target = activePlayers.find((p) => p.id === targetId);
    if (target && target.role !== 'imposter') {
      secretKilledMap.set(target.id, target);
    }
  });

  const secretKilledPlayers = Array.from(secretKilledMap.values());
  const allEliminatedMap = new Map<string, Player>();

  if (votedOutPlayer) allEliminatedMap.set(votedOutPlayer.id, votedOutPlayer);
  secretKilledPlayers.forEach((p) => allEliminatedMap.set(p.id, p));

  return {
    votedOutPlayer,
    secretKilledPlayers,
    allEliminated: Array.from(allEliminatedMap.values()),
    isTieBreaker,
    tieCandidates,
  };
}
