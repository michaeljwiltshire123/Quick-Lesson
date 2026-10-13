export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function buildGoogleDriveEmbedUrl(url: string): string {
  const fileId = extractGoogleDriveId(url);
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
}

export function isYouTubeShortUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('/shorts/') || url.includes('tiktok.com');
}

export function parseTimestampToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':').map(Number);
  if (parts.length === 2) return (parts[0] || 0) * 60 + (parts[1] || 0);
  if (parts.length === 3) return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  return Number(timeStr) || 0;
}

export function formatSecondsToTimestamp(totalSecs: number): string {
  const m = Math.floor(totalSecs / 60);
  const s = Math.floor(totalSecs % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

export function getYouTubeSnapshots(videoId: string) {
  const base = `https://img.youtube.com/vi/${videoId}`;
  return {
    default: `${base}/hqdefault.jpg`,
    start: `${base}/1.jpg`,
    mid: `${base}/2.jpg`,
    end: `${base}/3.jpg`,
  };
}

export function buildYouTubeEmbedUrl(
  url: string,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    loop?: boolean;
    start?: number;
    end?: number;
    captions?: boolean;
    clean?: boolean;
  } = {}
): string {
  if (extractGoogleDriveId(url)) return buildGoogleDriveEmbedUrl(url);

  const id = extractYouTubeId(url);
  if (!id) return url;

  const domain = options.clean ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
  const params = new URLSearchParams({
    enablejsapi: '1',
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
  });

  if (options.autoplay) params.set('autoplay', '1');
  if (options.mute) params.set('mute', '1');
  if (options.captions) params.set('cc_load_policy', '1');
  if (options.start) params.set('start', String(Math.floor(options.start)));
  if (options.end) params.set('end', String(Math.floor(options.end)));
  if (options.loop) {
    params.set('loop', '1');
    params.set('playlist', id);
  }

  return `${domain}/embed/${id}?${params.toString()}`;
}
