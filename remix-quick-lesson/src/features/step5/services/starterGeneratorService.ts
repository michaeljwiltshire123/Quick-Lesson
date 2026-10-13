import { DiscussionStarterCard } from '../types/starterCard';
import { DiscussionStarterFormatType } from '../types/starterTypes';
import { normalizeStarterResponse } from './starterResponseNormalizer';
import { buildTopicStarterFallback } from '../../../utils/topicStarterFallback';

export interface GenerateStarterOptions {
  lessonTitle: string;
  subject: string;
  chunkId: string;
  chunkTitle: string;
  formatType?: DiscussionStarterFormatType;
  lessonNotes?: string;
}

function normalizePrompt(fmt: string, text: string): string {
  if (fmt === 'finger_scale' && !text.trim().toLowerCase().startsWith('on a scale of 1-10') && !text.trim().toLowerCase().startsWith('on a scale of 1')) {
    return `On a scale of 1-10, ${text.charAt(0).toLowerCase() + text.slice(1)}`;
  }
  return text;
}

export async function generateDiscussionStartersForChunk(
  options: GenerateStarterOptions
): Promise<DiscussionStarterCard[]> {
  const { lessonTitle, subject, chunkId, chunkTitle, formatType, lessonNotes } = options;

  try {
    const res = await fetch('/api/generate-discussion-starters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonTitle, subject, chunkId, chunkTitle, formatType, lessonNotes }),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const normalized = data.map((item) => ({ ...item, promptText: normalizePrompt(item.formatType || formatType || 'true_false', item.promptText || '') }));
        return normalizeStarterResponse(normalized, chunkId, chunkTitle, subject, formatType, getFallbackPrompt);
      }
    }
  } catch (err) {
    console.error('AI generation fetch error:', err);
  }

  const formats: DiscussionStarterFormatType[] = [
    'true_false', 'forced_dichotomy', 'paradox', 'would_you_rather',
    'predict_disaster', 'finger_scale', 'socratic_tension'
  ];
  const targetFormats = formatType ? [formatType] : formats;

  return targetFormats.flatMap((fmt) =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: `fallback-${chunkId}-${fmt}-${i}-${Date.now()}`,
      conceptId: chunkId,
      milestoneChunkId: '',
      formatType: fmt,
      promptText: getFallbackPrompt(fmt, chunkTitle, subject, i + 1),
      misconceptionWarning: `Common misconception around ${chunkTitle} in ${subject}.`,
      teacherDeliveryLine: fmt === 'finger_scale' ? 'Show fingers on chests in 3, 2, 1.' : '30 seconds: pair and debate.',
      isTrue: fmt === 'true_false' ? i % 2 === 0 : undefined,
    }))
  );
}

function getFallbackPrompt(fmt: string, title: string, subj: string, idx: number): string {
  return buildTopicStarterFallback(fmt, title, subj, idx).promptText;
}
