import { AnimationCategory } from '../studio/types';

export interface HudEffectOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const HUD_ENTRANCE_EFFECTS: HudEffectOption[] = [
  { id: 'fade_in', name: 'Fade In', icon: '✨', description: 'Gentle opacity bloom' },
  { id: 'slide_in_left', name: 'Fly In Left', icon: '⬅️', description: 'Horizontal glide' },
  { id: 'slide_in_bottom', name: 'Rise Up', icon: '⬆️', description: 'Upward emergence' },
  { id: 'zoom_in', name: 'Zoom In', icon: '🔍', description: 'Commanding expansion' },
  { id: 'bounce', name: 'Bounce', icon: '🏀', description: 'Elastic kinetic spring' },
];

export const HUD_ANIMATION_EFFECTS: HudEffectOption[] = [
  { id: 'pulse', name: 'Pulse', icon: '💓', description: 'Rhythmic attention glow' },
  { id: 'spin', name: 'Spin', icon: '🔄', description: '360° rotational callout' },
  { id: 'grow_shrink', name: 'Grow/Shrink', icon: '📏', description: 'Scale accent' },
  { id: 'physics_bounce', name: 'Class Bounce', icon: '🎉', description: 'Celebratory double hop' },
];

export const HUD_EXIT_EFFECTS: HudEffectOption[] = [
  { id: 'fade_out', name: 'Fade Out', icon: '💨', description: 'Soft dissolve' },
  { id: 'fly_out_right', name: 'Fly Right', icon: '➡️', description: 'Exit offscreen margin' },
  { id: 'shrink_disappear', name: 'Shrink Out', icon: '🤏', description: 'Collapse & vanish' },
];
