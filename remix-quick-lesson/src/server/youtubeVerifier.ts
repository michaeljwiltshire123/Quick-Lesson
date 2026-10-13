/**
 * Verifies if a YouTube video ID is genuinely active, public, and playable
 * using YouTube's official lightweight oEmbed endpoint and live search resolver.
 */
export async function verifyYouTubeVideoId(youtubeId?: string): Promise<boolean> {
  if (!youtubeId || typeof youtubeId !== 'string') return false;
  const cleanId = youtubeId.trim().replace(/[^a-zA-Z0-9_-]/g, '');
  if (cleanId.length < 8 || cleanId.length > 15) return false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${cleanId}&format=json`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'QuickLesson-Educational-Verification/1.0' },
    });
    clearTimeout(timeout);
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function searchYouTubeLiveId(query: string): Promise<string | null> {
  if (!query) return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query.trim())}`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function filterActiveScenes<T extends { youtubeId?: string; searchPhrase?: string; movieOrShow?: string; sceneTitle?: string }>(
  scenes: T[],
  maxToKeep = 4
): Promise<T[]> {
  if (!Array.isArray(scenes) || scenes.length === 0) return [];

  const verified: T[] = [];
  for (const scene of scenes) {
    let activeId = scene.youtubeId;
    let isValid = await verifyYouTubeVideoId(activeId);

    // If candidate ID fails or is missing, search the live YouTube query
    if (!isValid) {
      const q = scene.searchPhrase || `${scene.movieOrShow || ''} ${scene.sceneTitle || ''} clip under 3 minutes`;
      const liveId = await searchYouTubeLiveId(q);
      if (liveId && await verifyYouTubeVideoId(liveId)) {
        activeId = liveId;
        isValid = true;
      }
    }

    if (isValid && activeId) {
      verified.push({ ...scene, youtubeId: activeId });
      if (verified.length >= maxToKeep) break;
    }
  }

  return verified;
}
