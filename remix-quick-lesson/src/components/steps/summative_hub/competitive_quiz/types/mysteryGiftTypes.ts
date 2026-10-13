export type MysteryGiftCategory =
  | 'defensive'
  | 'sabotage'
  | 'gambling'
  | 'chaos'
  | 'boost';

export type ExtendedGiftType =
  | 'shield'
  | 'mega_shield'
  | 'point_thief'
  | 'double_down'
  | 'reverse_controls'
  | 'blind_spot'
  | 'swap_scores'
  | 'hazard'
  | 'answer_elimination'
  | 'point_bomb'
  | 'ghost_mode'
  | 'hit_leader'
  | 'steal_ahead'
  | 'shrink_shake'
  | 'acca_bet'
  | 'fake_answers'
  | 'mirror_shield'
  | 'cloak_invisibility'
  | 'bank_vault'
  | 'cleanse'
  | 'mad_world'
  | 'bribe_guard'
  | 'whipping_boy'
  | 'scapegoat'
  | 'fortress_mode'
  | 'rebound'
  | 'dummy_decoy'
  | 'sanctuary'
  | 'tax_collector'
  | 'sabotage_timer'
  | 'glitch_ray'
  | 'fog_of_war'
  | 'cursed_gift'
  | 'weight_vest'
  | 'bounty_hunter'
  | 'portal_swap'
  | 'echo_chamber'
  | 'poison_apple'
  | 'magnetize'
  | 'copycat'
  | 'vortex'
  | 'static_shock'
  | 'inversion_field'
  | 'heist'
  | 'time_warp';

export interface MysteryGiftDefinition {
  id: string;
  type: ExtendedGiftType;
  name: string;
  category: MysteryGiftCategory;
  description: string;
  durationRounds?: number;
  iconName: string;
  soundCue?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ActiveGiftEffect {
  giftType: ExtendedGiftType;
  appliedByPlayerId: string;
  targetPlayerId?: string;
  secondaryPlayerId?: string; // For whipping boy / scapegoat
  expiresRound: number;
  payload?: Record<string, unknown>;
}
