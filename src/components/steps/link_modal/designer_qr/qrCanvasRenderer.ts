import QRCode from 'qrcode';
import { QrDesignConfig } from './types';

function drawCenterCustomIcon(ctx: CanvasRenderingContext2D, src: string, cx: number, cy: number, r: number, fg: string): void {
  const img = new Image();
  const render = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = fg;
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
    ctx.restore();
  };
  img.onload = render;
  img.src = src;
  if (img.complete) render();
}

function drawCenterEmoji(ctx: CanvasRenderingContext2D, emoji: string, cx: number, cy: number, r: number, fg: string): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = fg;
  ctx.stroke();
  ctx.font = `${Math.floor(r * 1.1)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, cx, cy + 1);
  ctx.restore();
}

export function renderDesignerQrToCanvas(canvas: HTMLCanvasElement, text: string, config: QrDesignConfig, canvasSize = 200): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const activeText = text.trim() || 'https://quicklesson.uk/sample';
  const qr = QRCode.create(activeText, { errorCorrectionLevel: 'H' });
  const matrixSize = qr.modules.size;
  const padding = Math.max(4, Math.round(canvasSize * 0.08));
  const cellSize = (canvasSize - padding * 2) / matrixSize;

  canvas.width = canvasSize;
  canvas.height = canvasSize;
  ctx.fillStyle = config.bgColor || '#FFFFFF';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  const hasCenter = Boolean(config.customIconBase64 || config.centerIcon);
  const centerRadius = hasCenter ? Math.floor(matrixSize / 6) : 0;
  const mid = Math.floor(matrixSize / 2);

  ctx.fillStyle = config.fgColor || '#2D2A26';
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (!qr.modules.get(r, c)) continue;
      if (hasCenter && Math.abs(r - mid) <= centerRadius && Math.abs(c - mid) <= centerRadius) continue;

      const x = padding + c * cellSize;
      const y = padding + r * cellSize;
      if (config.dotShape === 'dots') {
        ctx.beginPath();
        ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.42, 0, Math.PI * 2);
        ctx.fill();
      } else if (config.dotShape === 'rounded') {
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1, cellSize * 0.35) : ctx.fillRect(x, y, cellSize, cellSize);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, cellSize + 0.2, cellSize + 0.2);
      }
    }
  }

  if (hasCenter) {
    const badgeR = Math.max(6, centerRadius * cellSize + Math.round(canvasSize * 0.035));
    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    if (config.customIconBase64) {
      drawCenterCustomIcon(ctx, config.customIconBase64, cx, cy, badgeR, config.fgColor || '#2D2A26');
    } else if (config.centerIcon) {
      drawCenterEmoji(ctx, config.centerIcon, cx, cy, badgeR, config.fgColor || '#2D2A26');
    }
  }
}
