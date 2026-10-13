export type MaskShapeType =
  | 'standard'
  | 'circle'
  | 'square'
  | 'rounded'
  | 'star'
  | 'diamond'
  | 'triangle'
  | 'hexagon'
  | 'custom_polygon';

function transformPoint(px: number, py: number, scale: number, maskX: number, maskY: number): string {
  const s = scale / 100;
  const x = Math.round((maskX + (px - 50) * s) * 10) / 10;
  const y = Math.round((maskY + (py - 50) * s) * 10) / 10;
  return `${x}% ${y}%`;
}

function transformPolygon(points: [number, number][], scale: number, maskX: number, maskY: number): string {
  return `polygon(${points.map(([px, py]) => transformPoint(px, py, scale, maskX, maskY)).join(', ')})`;
}

const STAR_POINTS: [number, number][] = [
  [50, 0], [61, 35], [98, 35], [68, 57], [79, 91], [50, 70], [21, 91], [32, 57], [2, 35], [39, 35],
];
const DIAMOND_POINTS: [number, number][] = [[50, 0], [100, 50], [50, 100], [0, 50]];
const TRIANGLE_POINTS: [number, number][] = [[50, 0], [100, 100], [0, 100]];
const HEXAGON_POINTS: [number, number][] = [[25, 0], [75, 0], [100, 50], [75, 100], [25, 100], [0, 50]];
const SQUARE_POINTS: [number, number][] = [[0, 0], [100, 0], [100, 100], [0, 100]];

export function getElementClipPath(
  maskShape?: string,
  crop?: { top: number; right: number; bottom: number; left: number },
  isCropping?: boolean,
  customPath?: string,
  maskScale = 100,
  maskX = 50,
  maskY = 50
): string {
  if (isCropping && crop) {
    return `inset(${crop.top}% ${crop.right}% ${crop.bottom}% ${crop.left}%)`;
  }

  const s = Math.max(10, Math.min(200, maskScale));

  switch (maskShape) {
    case 'circle': {
      const radiusPct = Math.round((s / 2) * 10) / 10;
      return `circle(${radiusPct}% at ${maskX}% ${maskY}%)`;
    }
    case 'square':
    case 'rounded':
      return transformPolygon(SQUARE_POINTS, s, maskX, maskY);
    case 'star':
      return transformPolygon(STAR_POINTS, s, maskX, maskY);
    case 'diamond':
      return transformPolygon(DIAMOND_POINTS, s, maskX, maskY);
    case 'triangle':
      return transformPolygon(TRIANGLE_POINTS, s, maskX, maskY);
    case 'hexagon':
      return transformPolygon(HEXAGON_POINTS, s, maskX, maskY);
    case 'custom_polygon': {
      if (!customPath) return 'none';
      const matches = customPath.matchAll(/([\d.]+)%\s+([\d.]+)%/g);
      const pts: [number, number][] = [];
      for (const m of matches) pts.push([parseFloat(m[1]), parseFloat(m[2])]);
      if (pts.length >= 3) return transformPolygon(pts, s, maskX, maskY);
      return customPath;
    }
    default:
      if (crop && (crop.top || crop.right || crop.bottom || crop.left)) {
        return `inset(${crop.top}% ${crop.right}% ${crop.bottom}% ${crop.left}%)`;
      }
      return 'none';
  }
}
