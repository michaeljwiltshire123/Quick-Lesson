import { useState, useRef, useCallback, useEffect } from 'react';
import { POP_CULTURE_CATEGORIES, PopCultureCategory, PopCultureScene } from '../presetData';
import { runCategoryQueue } from './runCategoryQueue';

export type CategoryFetchStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error';

interface UseCategorySceneQueueProps {
  chunkTitle: string;
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
}

const sessionSceneStore = new Map<string, Partial<Record<PopCultureCategory, PopCultureScene[]>>>();
const sessionStatusStore = new Map<string, Record<PopCultureCategory, CategoryFetchStatus>>();

const defaultStatus: Record<PopCultureCategory, CategoryFetchStatus> = {
  Movie: 'idle', Documentary: 'idle', Comedy: 'idle', Cartoon: 'idle', Reality: 'idle', 'Behind the Scenes': 'idle',
};

export function useCategorySceneQueue({
  chunkTitle, lessonTitle, subject, gradeLevel, themeNotes,
}: UseCategorySceneQueueProps) {
  const storeKey = `${subject || ''}_${lessonTitle || ''}_${chunkTitle || ''}`.trim().toLowerCase();

  const [cache, setCache] = useState<Partial<Record<PopCultureCategory, PopCultureScene[]>>>(
    () => sessionSceneStore.get(storeKey) || {}
  );
  const [status, setStatus] = useState<Record<PopCultureCategory, CategoryFetchStatus>>(
    () => sessionStatusStore.get(storeKey) || { ...defaultStatus }
  );
  const isQueueRunning = useRef(false);

  useEffect(() => {
    setCache(sessionSceneStore.get(storeKey) || {});
    setStatus(sessionStatusStore.get(storeKey) || { ...defaultStatus });
  }, [storeKey]);

  const fetchCategory = useCallback(async (cat: PopCultureCategory): Promise<PopCultureScene[]> => {
    setStatus((prev) => {
      const next = { ...prev, [cat]: 'loading' as CategoryFetchStatus };
      sessionStatusStore.set(storeKey, next);
      return next;
    });

    try {
      const resp = await fetch('/api/generate-media-scenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: cat, chunkTitle, lessonTitle: lessonTitle || chunkTitle,
          subject, gradeLevel, themeNotes,
        }),
      });
      if (!resp.ok) throw new Error('Fetch failed');
      const data = await resp.json();
      const verified = Array.isArray(data?.scenes) ? data.scenes : [];

      setCache((prev) => {
        const next = { ...prev, [cat]: verified };
        sessionSceneStore.set(storeKey, next);
        return next;
      });

      setStatus((prev) => {
        const next = { ...prev, [cat]: (verified.length > 0 ? 'ready' : 'empty') as CategoryFetchStatus };
        sessionStatusStore.set(storeKey, next);
        return next;
      });

      return verified;
    } catch (error) {
      console.error(`Could not fetch suggested ${cat} clips.`, error);
      setStatus((prev) => {
        const next = { ...prev, [cat]: 'error' as CategoryFetchStatus };
        sessionStatusStore.set(storeKey, next);
        return next;
      });
      return [];
    }
  }, [chunkTitle, lessonTitle, subject, gradeLevel, themeNotes, storeKey]);

  const startBackgroundQueue = useCallback(async (primaryCat: PopCultureCategory) => {
    if (isQueueRunning.current) return;
    isQueueRunning.current = true;
    try { await runCategoryQueue(primaryCat, fetchCategory); }
    finally { isQueueRunning.current = false; }
  }, [fetchCategory]);

  return { cache, status, fetchCategory, startBackgroundQueue };
}
