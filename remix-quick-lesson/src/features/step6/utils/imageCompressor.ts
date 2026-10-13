/**
 * Compresses uploaded images to lightweight WebP thumbnails
 * and computes exact 16:9 canvas-fitted element dimensions
 */
export interface CompressedImageResult {
  dataUrl: string;
  naturalWidth: number;
  naturalHeight: number;
  aspectRatio: number;
}

export function computeFittedElementDimensions(
  imgAspect: number,
  targetWidth = 16,
  canvasAspect = 16 / 9
): { width: number; height: number } {
  let width = targetWidth;
  let height = (width * canvasAspect) / Math.max(0.2, imgAspect);
  if (height > 45) {
    height = 45;
    width = (height * Math.max(0.2, imgAspect)) / canvasAspect;
  }
  return {
    width: Math.max(6, Math.min(90, Math.round(width * 10) / 10)),
    height: Math.max(6, Math.min(90, Math.round(height * 10) / 10)),
  };
}

export async function compressImageWithDetails(file: File, maxDim = 320): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = reject;
      img.onload = () => {
        const naturalWidth = img.naturalWidth || img.width || 100;
        const naturalHeight = img.naturalHeight || img.height || 100;
        const aspectRatio = naturalWidth / Math.max(1, naturalHeight);

        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ dataUrl: (e.target?.result as string) || '', naturalWidth, naturalHeight, aspectRatio });
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const webpData = canvas.toDataURL('image/webp', 0.85);
          resolve({ dataUrl: webpData, naturalWidth, naturalHeight, aspectRatio });
        } catch {
          resolve({ dataUrl: canvas.toDataURL('image/png'), naturalWidth, naturalHeight, aspectRatio });
        }
      };
      img.src = (e.target?.result as string) || '';
    };
    reader.readAsDataURL(file);
  });
}

export async function compressImageToThumbnail(file: File, maxDim = 320): Promise<string> {
  const result = await compressImageWithDetails(file, maxDim);
  return result.dataUrl;
}
