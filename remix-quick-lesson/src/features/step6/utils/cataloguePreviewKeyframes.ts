import { CSSProperties } from 'react';

/**
 * Returns isolated inline preview CSS animation for immediate replay
 * when clicking or hovering on an animation catalogue card.
 */
export function getLiveCatalogueKeyframeStyle(effectId: string, durationSeconds: number = 0.8): CSSProperties {
  const d = Math.max(0.3, Math.min(5.0, durationSeconds));
  switch (effectId) {
    case 'fade_in':
      return { animation: `fadeIn ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards` };
    case 'slide_in_left':
      return { animation: `slideLeftIn ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards` };
    case 'slide_in_bottom':
      return { animation: `slideUpIn ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards` };
    case 'zoom_in':
      return { animation: `zoomIn ${d}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards` };
    case 'bounce':
    case 'physics_bounce':
      return { animation: `bounce ${d}s ease-in-out forwards` };
    case 'pulse':
      return { animation: `pulse ${d}s ease-in-out infinite` };
    case 'spin':
      return { animation: `spin ${d}s cubic-bezier(0.4, 0, 0.2, 1) forwards` };
    case 'grow_shrink':
      return { animation: `zoomIn ${d * 0.5}s ease-out alternate 2` };
    case 'fade_out':
      return { animation: `fadeOut ${d}s ease-in forwards` };
    case 'fly_out_right':
      return { animation: `slideRightOut ${d}s cubic-bezier(0.7, 0, 0.84, 0) forwards` };
    case 'shrink_disappear':
      return { animation: `zoomOut ${d}s ease-in forwards` };
    default:
      return { animation: `fadeIn ${d}s ease forwards` };
  }
}
