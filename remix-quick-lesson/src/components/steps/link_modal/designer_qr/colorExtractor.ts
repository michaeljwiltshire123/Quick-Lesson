function toHex(c: number): string {
  const h = Math.max(0, Math.min(255, Math.round(c))).toString(16);
  return h.length === 1 ? '0' + h : h;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

interface ColorBucket { r: number; g: number; b: number; count: number; lum: number; }

export async function extractIconColors(imageSrc?: string, emoji?: string): Promise<{ fg: string; bg: string } | null> {
  const canvas = document.createElement('canvas');
  canvas.width = 48; canvas.height = 48;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  if (imageSrc) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = imageSrc;
    });
    ctx.drawImage(img, 0, 0, 48, 48);
  } else if (emoji) {
    ctx.font = '32px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 24, 26);
  } else { return null; }

  const data = ctx.getImageData(0, 0, 48, 48).data;
  const buckets = new Map<string, ColorBucket>();

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 50) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const qr = Math.min(255, Math.round(r / 24) * 24);
    const qg = Math.min(255, Math.round(g / 24) * 24);
    const qb = Math.min(255, Math.round(b / 24) * 24);
    const key = `${qr}_${qg}_${qb}`;
    const ex = buckets.get(key);
    if (ex) { ex.count += 1; }
    else { buckets.set(key, { r: qr, g: qg, b: qb, count: 1, lum: 0.299 * qr + 0.587 * qg + 0.114 * qb }); }
  }

  const allBuckets = Array.from(buckets.values());
  if (allBuckets.length === 0) return null;

  // Find top 3 dominant colours by frequency
  allBuckets.sort((a, b) => b.count - a.count);
  const topDominant = allBuckets.slice(0, Math.min(3, allBuckets.length));

  // Sort the top 3 dominant colours by luminance
  topDominant.sort((a, b) => a.lum - b.lum);
  const darkest = topDominant[0];
  const lightest = topDominant[topDominant.length - 1];

  // Guarantee clear, light pastel background (blend with 75% white)
  const bg = rgbToHex(
    Math.min(255, Math.round(lightest.r + (255 - lightest.r) * 0.78)),
    Math.min(255, Math.round(lightest.g + (255 - lightest.g) * 0.78)),
    Math.min(255, Math.round(lightest.b + (255 - lightest.b) * 0.78))
  );

  // Guarantee deep, rich high-contrast pattern (blend with 65% black)
  const fg = rgbToHex(
    Math.round(darkest.r * 0.35),
    Math.round(darkest.g * 0.35),
    Math.round(darkest.b * 0.35)
  );

  return { fg, bg };
}
