import { PlayerState } from '../types/competitiveQuizTypes';

export type AttackKind = 'shield' | 'glitch_ray' | 'point_thief' | 'fog_of_war' | 'time_warp';

export interface PendingAttack {
  id: string;
  attackerId: string;
  attackerName: string;
  targetId: string;
  targetName: string;
  kind: AttackKind;
  potMagnitude?: number;
}

export interface ResolvedAttackResult {
  attackId: string;
  kind: AttackKind;
  attackerName: string;
  targetName: string;
  wasShielded: boolean;
  scoreShift: number;
  description: string;
}

export const resolvePupilAttacks = (
  players: PlayerState[],
  attacks: PendingAttack[]
): { updatedPlayers: PlayerState[]; results: ResolvedAttackResult[] } => {
  const playerMap = new Map(players.map((p) => [p.id, { ...p }]));
  const results: ResolvedAttackResult[] = [];

  for (const atk of attacks) {
    const target = playerMap.get(atk.targetId);
    const attacker = playerMap.get(atk.attackerId);

    if (!target) continue;

    // Check if target has an Aegis Shield active
    if (target.shields > 0 && atk.kind !== 'shield' && atk.kind !== 'time_warp') {
      target.shields -= 1;
      results.push({
        attackId: atk.id,
        kind: atk.kind,
        attackerName: atk.attackerName,
        targetName: target.name,
        wasShielded: true,
        scoreShift: 0,
        description: `${target.name}'s Aegis Shield repelled ${atk.attackerName}'s ${atk.kind}!`,
      });
      continue;
    }

    // Apply specific attack kinds
    let shift = 0;
    if (atk.kind === 'point_thief') {
      shift = Math.min(target.score, atk.potMagnitude || 80);
      target.score = Math.max(0, target.score - shift);
      if (attacker) attacker.score += shift;
    } else if (atk.kind === 'glitch_ray') {
      shift = 40;
      target.score = Math.max(0, target.score - shift);
    } else if (atk.kind === 'shield') {
      target.shields += 1;
    }

    results.push({
      attackId: atk.id,
      kind: atk.kind,
      attackerName: atk.attackerName,
      targetName: target.name,
      wasShielded: false,
      scoreShift: shift,
      description: atk.kind === 'point_thief'
        ? `${atk.attackerName} siphoned ${shift} pts from ${target.name}!`
        : `${atk.attackerName} hit ${target.name} with ${atk.kind}!`,
    });
  }

  return { updatedPlayers: Array.from(playerMap.values()), results };
};
