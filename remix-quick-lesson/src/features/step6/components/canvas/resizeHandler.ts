/**
 * Precise 8-point directional resize calculator matching Google Slides
 */
export type ResizeDirection = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function computeResizeBounds(
  dir: ResizeDirection,
  init: Bounds,
  deltaX: number,
  deltaY: number,
  minW = 6,
  minH = 4
): Bounds {
  let { x, y, width, height } = init;

  // Handle horizontal axis
  if (dir.includes('e')) {
    width = Math.max(minW, Math.min(100 - x, init.width + deltaX));
  } else if (dir.includes('w')) {
    const maxDeltaX = init.width - minW;
    const clampedDeltaX = Math.max(-init.x, Math.min(maxDeltaX, deltaX));
    x = init.x + clampedDeltaX;
    width = init.width - clampedDeltaX;
  }

  // Handle vertical axis
  if (dir.includes('s')) {
    height = Math.max(minH, Math.min(100 - y, init.height + deltaY));
  } else if (dir.includes('n')) {
    const maxDeltaY = init.height - minH;
    const clampedDeltaY = Math.max(-init.y, Math.min(maxDeltaY, deltaY));
    y = init.y + clampedDeltaY;
    height = init.height - clampedDeltaY;
  }

  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
    width: Math.round(width * 10) / 10,
    height: Math.round(height * 10) / 10,
  };
}
