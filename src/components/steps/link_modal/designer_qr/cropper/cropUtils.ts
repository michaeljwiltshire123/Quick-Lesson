export interface CropTransform {
  x: number;
  y: number;
  scale: number;
}

export function generateCircularThumb(
  image: HTMLImageElement,
  transform: CropTransform,
  viewportSize = 240,
  outputSize = 80
): string {
  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const ratio = outputSize / viewportSize;
  ctx.save();
  ctx.beginPath();
  ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, outputSize, outputSize);

  const drawX = (viewportSize / 2 + transform.x - (image.width * transform.scale) / 2) * ratio;
  const drawY = (viewportSize / 2 + transform.y - (image.height * transform.scale) / 2) * ratio;
  const drawW = image.width * transform.scale * ratio;
  const drawH = image.height * transform.scale * ratio;

  ctx.drawImage(image, drawX, drawY, drawW, drawH);
  ctx.restore();

  try {
    return canvas.toDataURL('image/webp', 0.85);
  } catch {
    return canvas.toDataURL('image/png');
  }
}
