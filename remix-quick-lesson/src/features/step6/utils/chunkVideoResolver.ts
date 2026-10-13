import { loadStoredState } from '../../../utils/storage';
import { LessonChunk, ChunkAttachment } from '../../../types';

export interface ResolvedVideoSuggestion {
  id: string;
  title: string;
  url: string;
  sourceType: 'chunk_attachment' | 'lesson_video' | 'topic_search';
  startTime?: string;
  endTime?: string;
  cfuPrompt?: string;
}

export function resolveVideosForSlide(
  chunkId?: string,
  slideTitle: string = ''
): { suggestions: ResolvedVideoSuggestion[]; chunkTitle: string } {
  const state = loadStoredState();
  const chunks: LessonChunk[] = state.chunks || [];
  const globalVideos: string[] = state.videoLinks || [];

  // 1. Find matching parent chunk
  let parentChunk = chunks.find((c) => c.id === chunkId);
  if (!parentChunk && chunkId) {
    // Try matching chunk index or partial ID
    parentChunk = chunks.find((c, idx) => `chunk-${idx + 1}` === chunkId || c.title.toLowerCase() === chunkId.toLowerCase());
  }
  if (!parentChunk && chunks.length > 0) {
    // Match by slide title keywords or fallback to first relevant chunk
    const found = chunks.find((c) => slideTitle.toLowerCase().includes(c.title.toLowerCase()));
    parentChunk = found || chunks[0];
  }

  const chunkTitle = parentChunk?.title || slideTitle || state.lessonTitle || 'Lesson Focus';
  const suggestions: ResolvedVideoSuggestion[] = [];

  // 2. Extract real video attachments from parent chunk
  if (parentChunk?.attachments) {
    parentChunk.attachments.forEach((att: ChunkAttachment) => {
      const isVideo = att.type === 'video' || (att.url && (att.url.includes('youtube') || att.url.includes('drive')));
      if (isVideo && att.url) {
        suggestions.push({
          id: att.id || `att-${Date.now()}`,
          title: att.name || `${chunkTitle} Demonstration`,
          url: att.url,
          sourceType: 'chunk_attachment',
          startTime: att.startTime,
          endTime: att.endTime,
          cfuPrompt: att.cfuPrompt || att.pauseCue,
        });
      }
    });
  }

  // 3. Add global lesson videos from Step 1 / Step 2
  globalVideos.forEach((vUrl, i) => {
    if (vUrl && !suggestions.some((s) => s.url === vUrl)) {
      suggestions.push({
        id: `global-v-${i}`,
        title: `${state.subject || 'Lesson'} Core Resource ${i + 1}`,
        url: vUrl,
        sourceType: 'lesson_video',
      });
    }
  });

  // 4. If no videos exist yet, provide 1-click real topic search links instead of dead placeholders
  if (suggestions.length === 0) {
    const query = encodeURIComponent(`${state.subject || ''} ${chunkTitle} KS3 KS4 education`.trim());
    suggestions.push({
      id: 'search-yt',
      title: `Search YouTube: "${chunkTitle}"`,
      url: `https://www.youtube.com/results?search_query=${query}`,
      sourceType: 'topic_search',
    });
    suggestions.push({
      id: 'search-bitesize',
      title: `Search BBC Bitesize: "${chunkTitle}"`,
      url: `https://www.bbc.co.uk/bitesize/search?q=${query}`,
      sourceType: 'topic_search',
    });
  }

  return { suggestions, chunkTitle };
}
