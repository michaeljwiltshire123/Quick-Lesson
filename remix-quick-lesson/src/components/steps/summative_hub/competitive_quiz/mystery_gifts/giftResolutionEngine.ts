import { PlayerState } from '../types/competitiveQuizTypes';
import { ActiveGiftEffect, ExtendedGiftType } from '../types/mysteryGiftTypes';

export interface GiftResolutionOutcome {
  updatedPlayers: PlayerState[];
  announcement: string;
  divertedTargetId?: string;
  reflectedBackToAttacker?: boolean;
}

export const executeTargetedGift = (
  attackerId: string,
  targetId: string,
  giftType: ExtendedGiftType,
  players: PlayerState[],
  activeEffects: ActiveGiftEffect[] = []
): GiftResolutionOutcome => {
  const map = new Map(players.map((p) => [p.id, { ...p }]));
  const attacker = map.get(attackerId);
  const target = map.get(targetId);

  if (!attacker || !target) {
    return { updatedPlayers: players, announcement: 'Target or attacker not found.' };
  }

  // Check for active Scapegoat effect on target
  const scapegoat = activeEffects.find(
    (e) => e.giftType === 'scapegoat' && e.appliedByPlayerId === targetId && e.targetPlayerId
  );
  if (scapegoat && scapegoat.targetPlayerId) {
    const decoyPupil = map.get(scapegoat.targetPlayerId);
    if (decoyPupil) {
      decoyPupil.score = Math.max(0, decoyPupil.score - 60);
      return {
        updatedPlayers: Array.from(map.values()),
        announcement: `🎭 SCAPEGOAT REVEAL! The attack on ${target.name} actually hit ${decoyPupil.name}!`,
        divertedTargetId: decoyPupil.id,
      };
    }
  }

  // Check for Mirror Shield
  const hasMirror = activeEffects.some(
    (e) => e.giftType === 'mirror_shield' && e.appliedByPlayerId === targetId
  );
  if (hasMirror) {
    attacker.score = Math.max(0, attacker.score - 80);
    return {
      updatedPlayers: Array.from(map.values()),
      announcement: `🛡️ REBOUND! ${target.name}'s Mirror Shield reflected ${giftType} back at ${attacker.name}!`,
      reflectedBackToAttacker: true,
    };
  }

  // Portal Swap: Swap total scores
  if (giftType === 'portal_swap') {
    const temp = target.score;
    target.score = attacker.score;
    attacker.score = temp;
    return {
      updatedPlayers: Array.from(map.values()),
      announcement: `🌀 PORTAL SWAP! ${attacker.name} traded entire scores with ${target.name}!`,
    };
  }

  // Blue Lightning / Hit Leader: Steal 15%
  if (giftType === 'hit_leader') {
    const stolen = Math.floor(target.score * 0.15);
    target.score = Math.max(0, target.score - stolen);
    attacker.score += stolen;
    return {
      updatedPlayers: Array.from(map.values()),
      announcement: `⚡ BLUE LIGHTNING! ${attacker.name} struck leader ${target.name} and stole ${stolen} pts!`,
    };
  }

  return {
    updatedPlayers: Array.from(map.values()),
    announcement: `${attacker.name} triggered ${giftType} against ${target.name}!`,
  };
};
