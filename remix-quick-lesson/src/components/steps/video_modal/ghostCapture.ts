export const captureGhostThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = objectUrl;

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(1.0, (video.duration || 2) / 2);
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, 160, 90);
          const thumb = canvas.toDataURL('image/jpeg', 0.5);
          URL.revokeObjectURL(objectUrl);
          resolve(thumb);
          return;
        }
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Canvas context unavailable'));
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(err);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load video file'));
    };
  });
};
