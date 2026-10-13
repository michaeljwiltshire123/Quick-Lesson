/**
 * Local canvas image compressor utility for low-footprint microThumbnails (80x80 JPEG, <5KB).
 */

export interface CompactedImageResult {
  microThumbnail: string;
  displayUrl: string;
}

export async function compressImageToMicroThumbnail(file: File): Promise<CompactedImageResult> {
  const displayUrl = URL.createObjectURL(file);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 80;
      canvas.height = 80;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 80, 80);
        
        // Center crop math for 80x80
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 80, 80);
      }
      const microThumbnail = canvas.toDataURL('image/jpeg', 0.4);
      resolve({ microThumbnail, displayUrl });
    };
    img.onerror = () => {
      resolve({ microThumbnail: '', displayUrl });
    };
    img.src = displayUrl;
  });
}
