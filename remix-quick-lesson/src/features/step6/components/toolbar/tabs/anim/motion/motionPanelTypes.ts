import { SlideElement } from '../../../../../types/slideTypes';

export interface MotionAnimationItem {
  id: string;
  elementId: string;
  elementLabel: string;
  elementType: string;
  thumbnailUrl?: string;
  effectId: string;
  category: 'entrance' | 'emphasis' | 'exit';
  trigger: 'onClick' | 'withPrevious' | 'afterPrevious';
  duration: number;
  order?: number;
  rawContent?: string;
  roleBadge?: string;
}

export interface TransitionOption {
  id: string;
  label: string;
}

export const SLIDE_TRANSITION_OPTIONS: TransitionOption[] = [
  { id: 'none', label: 'None' },
  { id: 'dissolve', label: 'Dissolve' },
  { id: 'fade', label: 'Fade' },
  { id: 'slide_right', label: 'Slide from right' },
  { id: 'slide_left', label: 'Slide from left' },
  { id: 'flip', label: 'Flip' },
  { id: 'cube', label: 'Cube' },
  { id: 'gallery', label: 'Gallery' },
];

export const OBJECT_ANIMATION_OPTIONS = [
  { group: 'Entrance', items: [
    { id: 'fade_in', label: 'Fade in', category: 'entrance' },
    { id: 'slide_in_left', label: 'Fly in from left', category: 'entrance' },
    { id: 'slide_in_bottom', label: 'Fly in from bottom', category: 'entrance' },
    { id: 'zoom_in', label: 'Zoom in', category: 'entrance' },
    { id: 'bounce', label: 'Bounce', category: 'entrance' },
  ]},
  { group: 'Emphasis', items: [
    { id: 'pulse', label: 'Pulse', category: 'emphasis' },
    { id: 'spin', label: 'Spin', category: 'emphasis' },
    { id: 'grow_shrink', label: 'Grow / Shrink', category: 'emphasis' },
    { id: 'physics_bounce', label: 'Classroom Bounce', category: 'emphasis' },
  ]},
  { group: 'Exit', items: [
    { id: 'fade_out', label: 'Fade out', category: 'exit' },
    { id: 'fly_out_right', label: 'Fly out right', category: 'exit' },
    { id: 'shrink_disappear', label: 'Disappear', category: 'exit' },
  ]},
] as const;
