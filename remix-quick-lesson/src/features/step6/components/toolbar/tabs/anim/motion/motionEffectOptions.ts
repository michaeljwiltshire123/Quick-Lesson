export interface MotionEffectOption {
  id: string;
  label: string;
  category: 'entrance' | 'emphasis' | 'exit';
  defaultDuration: number;
}

export const ENTRANCE_EFFECT_OPTIONS: MotionEffectOption[] = [
  { id: 'fade_in', label: 'Fade in', category: 'entrance', defaultDuration: 0.8 },
  { id: 'slide_in_left', label: 'Fly in from left', category: 'entrance', defaultDuration: 0.8 },
  { id: 'slide_in_bottom', label: 'Rise from bottom', category: 'entrance', defaultDuration: 0.8 },
  { id: 'zoom_in', label: 'Zoom in', category: 'entrance', defaultDuration: 0.6 },
  { id: 'bounce', label: 'Bounce', category: 'entrance', defaultDuration: 1.0 },
];

export const EMPHASIS_EFFECT_OPTIONS: MotionEffectOption[] = [
  { id: 'pulse', label: 'Attention pulse', category: 'emphasis', defaultDuration: 0.8 },
  { id: 'spin', label: 'Spin 360°', category: 'emphasis', defaultDuration: 1.0 },
  { id: 'grow_shrink', label: 'Grow / Shrink', category: 'emphasis', defaultDuration: 0.8 },
  { id: 'physics_bounce', label: 'Classroom bounce', category: 'emphasis', defaultDuration: 1.0 },
];

export const EXIT_EFFECT_OPTIONS: MotionEffectOption[] = [
  { id: 'fade_out', label: 'Fade out', category: 'exit', defaultDuration: 0.8 },
  { id: 'fly_out_right', label: 'Fly out to right', category: 'exit', defaultDuration: 0.8 },
  { id: 'shrink_disappear', label: 'Shrink & disappear', category: 'exit', defaultDuration: 0.6 },
];

export const ALL_MOTION_EFFECTS: MotionEffectOption[] = [
  ...ENTRANCE_EFFECT_OPTIONS,
  ...EMPHASIS_EFFECT_OPTIONS,
  ...EXIT_EFFECT_OPTIONS,
];

export const SLIDE_TRANSITION_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'dissolve', label: 'Dissolve' },
  { id: 'fade', label: 'Fade' },
  { id: 'slide_right', label: 'Slide from right' },
  { id: 'slide_left', label: 'Slide from left' },
  { id: 'flip', label: 'Flip' },
  { id: 'cube', label: 'Cube' },
  { id: 'gallery', label: 'Gallery' },
];
