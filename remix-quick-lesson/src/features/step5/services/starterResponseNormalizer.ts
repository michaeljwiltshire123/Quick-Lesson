import { DiscussionStarterCard } from '../types/starterCard';
import { DiscussionStarterFormatType } from '../types/starterTypes';

const formats: DiscussionStarterFormatType[] = [
  'true_false', 'forced_dichotomy', 'paradox', 'would_you_rather',
  'predict_disaster', 'finger_scale', 'socratic_tension',
];
type Fallback = (format: string, title: string, subject: string, index: number) => string;

export function normalizeStarterResponse(
  items: any[], chunkId: string, chunkTitle: string, subject: string,
  onlyFormat: DiscussionStarterFormatType | undefined, fallback: Fallback,
): DiscussionStarterCard[] {
  const target = onlyFormat ? [onlyFormat] : formats;
  return target.flatMap((format) => {
    const matching = items.filter((item) => (item.formatType || onlyFormat || 'true_false') === format).slice(0, 6);
    return Array.from({ length: 6 }, (_, index) => {
      const item = matching[index];
      const promptText = item?.promptText?.trim() || fallback(format, chunkTitle, subject, index + 1);
      return {
        id: `gen-${chunkId}-${format}-${Date.now()}-${index}`, conceptId: chunkId,
        milestoneChunkId: '', formatType: format, promptText,
        misconceptionWarning: item?.misconceptionWarning || `Check assumptions about ${chunkTitle}.`,
        teacherDeliveryLine: item?.teacherDeliveryLine || 'Think, pair, share for 30 seconds.',
        isTrue: typeof item?.isTrue === 'boolean' ? item.isTrue : undefined,
      };
    });
  });
}
