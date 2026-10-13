import { QuestionCard, QuestionFormat } from '../types/competitiveQuizTypes';
import { routeQuestionToFactory } from '../factories/formatFactoryRouter';
import { calculatePotSchedule } from './potScheduleEngine';

export interface ChunkLike {
  title?: string;
  notes?: string;
}

export const DEFAULT_MIX_FORMATS: QuestionFormat[] = [
  'spot_the_lie', 'order_steps', 'speed_match', 'target_tap',
  'odd_one_out', 'binary_blitz', 'reverse_instruction', 'score_swap',
  'avatar_race', 'wager_drop',
];

const normalizeOptions = (raw: any): string[] => {
  if (!Array.isArray(raw) || raw.length === 0) return ['Option A', 'Option B', 'Option C', 'Option D'];
  return raw.map((item) => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object') return item.left && item.right ? `${item.left} ➔ ${item.right}` : item.text || Object.values(item).join(' ➔ ');
    return String(item ?? '');
  });
};

export const generateJargonFreeQuestions = (
  lessonTitle: string,
  chunks: ChunkLike[] = [],
  requestedFormats?: QuestionFormat[],
  count: number = 8
): QuestionCard[] => {
  const formats = requestedFormats && requestedFormats.length > 0 ? requestedFormats : DEFAULT_MIX_FORMATS;
  const { patterns, accumulatedPots } = calculatePotSchedule(count);
  return Array.from({ length: count }, (_, i) => {
    const card = routeQuestionToFactory(formats[i % formats.length], chunks[i % Math.max(1, chunks.length)] || { title: lessonTitle }, lessonTitle, i + 1);
    card.patternId = patterns[i];
    card.accumulatedPot = accumulatedPots[i];
    return card;
  });
};

export const fetchAICompetitiveQuizQuestions = async (
  lessonTitle: string,
  chunks: ChunkLike[] = [],
  count: number = 8,
  requestedFormats?: QuestionFormat[],
  targetChunk?: { index: number; title: string; notes?: string }
): Promise<QuestionCard[]> => {
  const { patterns, accumulatedPots } = calculatePotSchedule(count);
  try {
    const resp = await fetch('/api/generate-competitive-quiz-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonTitle,
        chunks,
        count,
        requestedFormats,
        targetChunkIndex: targetChunk?.index,
        targetChunkTitle: targetChunk?.title,
        targetChunkNotes: targetChunk?.notes,
      }),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    if (Array.isArray(data?.questions) && data.questions.length > 0) {
      return data.questions.map((q: any, i: number) => ({
        id: q.id || `ai-q-${Date.now().toString(36)}-${i}`,
        format: q.format || DEFAULT_MIX_FORMATS[i % DEFAULT_MIX_FORMATS.length],
        formatLabel: q.formatLabel || 'Curriculum Challenge',
        prompt: q.prompt || 'Curriculum Challenge Question',
        options: normalizeOptions(q.options || q.matchedPairs),
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || 'Verified curriculum concept explanation.',
        speedLimitSeconds: q.speedLimitSeconds || 10,
        potValue: q.potValue || 150 + (i * 30),
        accumulatedPot: accumulatedPots[i] || 250 + (i * 200),
        patternId: patterns[i] || 'decoy_stripes',
        conceptCovered: q.conceptCovered || lessonTitle,
        difficulty: q.difficulty || 'core',
        matchedPairs: q.matchedPairs,
        targetZone: q.targetZone,
        correctOrder: q.correctOrder,
        binaryAnswer: q.binaryAnswer,
      }));
    }
  } catch (e) {
    console.warn('Fallback to local factories:', e);
  }
  return generateJargonFreeQuestions(lessonTitle, chunks, requestedFormats, count);
};
