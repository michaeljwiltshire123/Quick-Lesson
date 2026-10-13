export interface ScratchBlockDef {
  id: string;
  category: 'event' | 'entrance' | 'animation' | 'exit';
  label: string;
  color: string;
  borderColor: string;
  defaultDuration?: number;
  defaultRepeat?: number;
}

export const SCRATCH_PALETTE_BLOCKS: ScratchBlockDef[] = [
  { id: 'fade_in', category: 'entrance', label: 'Fade In', color: '#4C97FF', borderColor: '#2E78E6', defaultDuration: 0.8 },
  { id: 'slide_in_left', category: 'entrance', label: 'Fly In Left', color: '#4C97FF', borderColor: '#2E78E6', defaultDuration: 0.8 },
  { id: 'zoom_in', category: 'entrance', label: 'Zoom In', color: '#4C97FF', borderColor: '#2E78E6', defaultDuration: 0.8 },
  { id: 'bounce', category: 'entrance', label: 'Bounce', color: '#4C97FF', borderColor: '#2E78E6', defaultDuration: 0.8 },
  
  { id: 'pulse', category: 'animation', label: 'Pulse', color: '#9966FF', borderColor: '#7E45E8', defaultRepeat: 2 },
  { id: 'spin', category: 'animation', label: 'Spin', color: '#9966FF', borderColor: '#7E45E8', defaultRepeat: 1 },
  { id: 'grow_shrink', category: 'animation', label: 'Grow / Shrink', color: '#9966FF', borderColor: '#7E45E8', defaultRepeat: 1 },
  { id: 'physics_bounce', category: 'animation', label: 'Classroom Bounce', color: '#9966FF', borderColor: '#7E45E8', defaultRepeat: 2 },

  { id: 'fade_out', category: 'exit', label: 'Fade Out', color: '#FF6680', borderColor: '#E04B65', defaultDuration: 0.6 },
  { id: 'fly_out_right', category: 'exit', label: 'Fly Out Right', color: '#FF6680', borderColor: '#E04B65', defaultDuration: 0.6 },
  { id: 'shrink_disappear', category: 'exit', label: 'Shrink Out', color: '#FF6680', borderColor: '#E04B65', defaultDuration: 0.6 },
];
