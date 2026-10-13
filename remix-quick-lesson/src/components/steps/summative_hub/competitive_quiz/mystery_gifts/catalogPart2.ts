import { MysteryGiftDefinition } from '../types/mysteryGiftTypes';

export const GIFTS_PART_2: MysteryGiftDefinition[] = [
  { id: 'g_mad_world', type: 'mad_world', name: 'Mad World', category: 'chaos', description: 'Reverses text and randomises button placement until round end', iconName: 'Compass', rarity: 'legendary' },
  { id: 'g_reverse_ctrl', type: 'reverse_controls', name: 'Inversion Curse', category: 'chaos', description: 'Flips answer button positions on target’s screen', iconName: 'RefreshCw', rarity: 'rare' },
  { id: 'g_blind_spot', type: 'blind_spot', name: 'Blind Spot', category: 'chaos', description: 'Temporarily masks 2 choices on target’s screen', iconName: 'Eye', rarity: 'common' },
  { id: 'g_portal_swap', type: 'portal_swap', name: 'Portal Swap', category: 'chaos', description: 'Instantly trade total scores with a randomly selected player', iconName: 'Orbit', rarity: 'legendary' },
  { id: 'g_echo_chamber', type: 'echo_chamber', name: 'Echo Chamber', category: 'chaos', description: 'Forces your chosen answer hint onto everyone else’s phone', iconName: 'Volume2', rarity: 'rare' },
  { id: 'g_inversion_field', type: 'inversion_field', name: 'Inversion Field', category: 'chaos', description: 'Wrong answers give points, correct answers deduct them next turn', iconName: 'FlipHorizontal', rarity: 'legendary' },
  { id: 'g_whipping_boy', type: 'whipping_boy', name: 'Whipping Boy', category: 'gambling', description: 'Secretly select 2 players; if only one misses, the other pays you 50% pts', iconName: 'Users', rarity: 'legendary' },
  { id: 'g_scapegoat', type: 'scapegoat', name: 'Scapegoat Disguise', category: 'defensive', description: 'Next attack on you redirects to your chosen scapegoat with reveal animation', iconName: 'VenetianMask', rarity: 'epic' },
  { id: 'g_acca_bet', type: 'acca_bet', name: 'Acca Accumulator', category: 'gambling', description: 'Predict which players answer correctly; steal 50% of their gains if 100% correct', iconName: 'ListOrdered', rarity: 'legendary' },
  { id: 'g_fake_answers', type: 'fake_answers', name: 'Trickster Decoy', category: 'gambling', description: 'Submit 2 fake options; anyone who clicks gives you 20% of their points', iconName: 'PenTool', rarity: 'epic' },
  { id: 'g_double_down', type: 'double_down', name: 'Pot Surge 2x', category: 'boost', description: 'Doubles all points earned on the next question', iconName: 'TrendingUp', rarity: 'common' },
  { id: 'g_time_warp', type: 'time_warp', name: 'Time Warp', category: 'boost', description: 'Grants +5 extra seconds to answer', iconName: 'Hourglass', rarity: 'common' },
  { id: 'g_magnetize', type: 'magnetize', name: 'Magnetize', category: 'boost', description: 'Pulls 10 points from every pupil answering within 1s of you', iconName: 'Magnet', rarity: 'rare' },
  { id: 'g_vortex', type: 'vortex', name: 'Point Vortex', category: 'boost', description: 'Sucks up all unclaimed speed bonus points into your score', iconName: 'Disc', rarity: 'rare' },
  { id: 'g_copycat', type: 'copycat', name: 'Copycat Mirror', category: 'boost', description: 'Instantly duplicates the last power-up triggered by the leader', iconName: 'Copy', rarity: 'rare' },
  { id: 'g_answer_elim', type: 'answer_elimination', name: 'Fifty-Fifty', category: 'boost', description: 'Eliminates 2 wrong answer choices on the next question', iconName: 'Scissors', rarity: 'common' },
  { id: 'g_point_bomb', type: 'point_bomb', name: 'Point Bomb', category: 'sabotage', description: 'Explodes for 150 points after 3 correct answers in a row', iconName: 'Bomb', rarity: 'rare' },
  { id: 'g_ghost_mode', type: 'ghost_mode', name: 'Ghost Mode', category: 'defensive', description: 'Vanishes from the leaderboard and attack targeting for 1 round', iconName: 'Ghost', rarity: 'epic' },
  { id: 'g_cursed_gift', type: 'cursed_gift', name: 'Pandora’s Box', category: 'chaos', description: 'Hands opponent a decoy chest that deducts points if opened', iconName: 'PackageX', rarity: 'rare' },
];
