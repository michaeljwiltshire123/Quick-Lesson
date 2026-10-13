export type AnimationCategory = 'entrance' | 'emphasis' | 'exit';

export type BulkTimingMode = 'together' | 'successive' | 'onClick';

export interface ElementTimelineEffect {
  id: string;
  category: AnimationCategory;
  effectId: string;
  trigger: 'onClick' | 'withPrevious' | 'afterPrevious';
  duration: number;
  delay?: number;
  repeatTimes?: number;
  order?: number;
}

export interface AnimationCatalogCard {
  id: string;
  category: AnimationCategory;
  name: string;
  description: string;
  group: string;
  defaultDuration?: number;
  defaultRepeat?: number;
}

export const CATALOG_ENTRANCE_CARDS: AnimationCatalogCard[] = [
  { id: 'fade_in', category: 'entrance', name: 'Smooth Fade In', description: 'Gentle opacity bloom that gracefully focuses pupils.', group: 'Subtle' },
  { id: 'slide_in_left', category: 'entrance', name: 'Fly In Left', description: 'Energetic horizontal arrival gliding across from the left.', group: 'Directional' },
  { id: 'slide_in_bottom', category: 'entrance', name: 'Rise From Bottom', description: 'Vertical emergence rising smoothly into view.', group: 'Directional' },
  { id: 'zoom_in', category: 'entrance', name: 'Zoom & Expand', description: 'Dynamic scale expansion commanding immediate attention.', group: 'Emphasis' },
  { id: 'bounce', category: 'entrance', name: 'Physics Bounce', description: 'Playful elastic spring with natural kinetic momentum.', group: 'Playful' },
];

export const CATALOG_ANIMATION_CARDS: AnimationCatalogCard[] = [
  { id: 'pulse', category: 'emphasis', name: 'Attention Pulse', description: 'Rhythmic heartbeat glow drawing pupil eyes to key terms.', group: 'Focus', defaultRepeat: 2 },
  { id: 'spin', category: 'emphasis', name: 'Spin Emphasis', description: 'Full 360-degree rotation ideal for rewards and callouts.', group: 'Kinetic', defaultRepeat: 1 },
  { id: 'grow_shrink', category: 'emphasis', name: 'Grow / Shrink', description: 'Expands briefly before settling into canonical scale.', group: 'Focus', defaultRepeat: 1 },
  { id: 'physics_bounce', category: 'emphasis', name: 'Classroom Bounce', description: 'Vibrant celebratory double hop for correct answers.', group: 'Playful', defaultRepeat: 2 },
];

export const CATALOG_EXIT_CARDS: AnimationCatalogCard[] = [
  { id: 'fade_out', category: 'exit', name: 'Smooth Fade Out', description: 'Seamlessly dissolves into the background canvas.', group: 'Subtle' },
  { id: 'fly_out_right', category: 'exit', name: 'Fly Out Right', description: 'Sweeps cleanly off the right margin of the slide.', group: 'Directional' },
  { id: 'shrink_disappear', category: 'exit', name: 'Shrink & Disappear', description: 'Collapses gracefully into centre before vanishing.', group: 'Emphasis' },
];
