export type BgRemovalMode = 'auto' | 'white' | 'black' | 'chroma';

export interface BgRemovalOptions {
  tolerance: number;
  feather: number;
  mode: BgRemovalMode;
  edgeOnly: boolean;
}

function getTargetColor(data: Uint8ClampedArray, mode: BgRemovalMode): [number, number, number] {
  if (mode === 'white') return [255, 255, 255];
  if (mode === 'black') return [0, 0, 0];
  if (mode === 'chroma') return [0, 255, 0];
  return [data[0], data[1], data[2]];
}

export async function removeImageBackground(
  imageSrc: string,
  options: BgRemovalOptions
): Promise<string> {
  let objectUrlToRevoke: string | null = null;
  let sourceToLoad = imageSrc;

  if (imageSrc.startsWith('http')) {
    try {
      const resp = await fetch(imageSrc, { mode: 'cors' });
      if (resp.ok) {
        const blob = await resp.blob();
        objectUrlToRevoke = URL.createObjectURL(blob);
        sourceToLoad = objectUrlToRevoke;
      }
    } catch {
      /* fallback to direct crossOrigin load */
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(imageSrc);

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const [tr, tg, tb] = getTargetColor(data, options.mode);
        const tolSq = options.tolerance * options.tolerance * 3;

        if (options.edgeOnly) {
          const visited = new Uint8Array(w * h);
          const queue: number[] = [];
          const checkAndPush = (x: number, y: number) => {
            const idx = y * w + x;
            if (visited[idx]) return;
            const p = idx * 4;
            const dr = data[p] - tr;
            const dg = data[p + 1] - tg;
            const db = data[p + 2] - tb;
            if (dr * dr + dg * dg + db * db <= tolSq) {
              visited[idx] = 1;
              queue.push(idx);
            }
          };

          for (let x = 0; x < w; x++) { checkAndPush(x, 0); checkAndPush(x, h - 1); }
          for (let y = 0; y < h; y++) { checkAndPush(0, y); checkAndPush(w - 1, y); }

          let qHead = 0;
          while (qHead < queue.length) {
            const curr = queue[qHead++];
            const cx = curr % w;
            const cy = Math.floor(curr / w);
            data[curr * 4 + 3] = 0;

            if (cx > 0) checkAndPush(cx - 1, cy);
            if (cx < w - 1) checkAndPush(cx + 1, cy);
            if (cy > 0) checkAndPush(cx, cy - 1);
            if (cy < h - 1) checkAndPush(cx, cy + 1);
          }
        } else {
          for (let i = 0; i < data.length; i += 4) {
            const dr = data[i] - tr;
            const dg = data[i + 1] - tg;
            const db = data[i + 2] - tb;
            if (dr * dr + dg * dg + db * db <= tolSq) data[i + 3] = 0;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        reject(err);
      } finally {
        if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
    img.onerror = () => {
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
      resolve(imageSrc);
    };
    img.src = sourceToLoad;
  });
}
