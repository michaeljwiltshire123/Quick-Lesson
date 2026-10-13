import { SecretWordCard } from '../types/dontSayItTypes';

export const createDefaultTabooCard = (targetWord = 'Photosynthesis'): SecretWordCard => ({
  id: `card-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
  targetWord,
  studentBannedWords: ['Sunlight', 'Plant', 'Leaves', 'Glucose'],
  aiFallbackBannedWords: ['Chlorophyll', 'Energy', 'Oxygen', 'Carbon'],
  activeBannedWords: ['Sunlight', 'Plant', 'Leaves', 'Glucose'],
  hint: 'The primary process by which green plants make food.',
});

export const regenerateSingleTabooCard = async (
  cardToReRoll: SecretWordCard,
  lessonTitle: string,
  chunkNotes?: string
): Promise<SecretWordCard> => {
  try {
    const response = await fetch('/api/generate-competitive-quiz-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonTitle,
        count: 1,
        targetChunkTitle: cardToReRoll.targetWord,
        targetChunkNotes: chunkNotes || `Generate 1 Taboo card for target word ${cardToReRoll.targetWord}`,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.questions?.[0]) {
        const q = data.questions[0];
        const newBanned = Array.isArray(q.options) && q.options.length >= 3 ? q.options.slice(0, 4) : ['Concept', 'Theory', 'Process', 'System'];
        return {
          ...cardToReRoll,
          targetWord: q.prompt ? q.prompt.replace(/\?/g, '').trim() : cardToReRoll.targetWord,
          activeBannedWords: newBanned,
          studentBannedWords: newBanned,
          hint: q.explanation || cardToReRoll.hint,
        };
      }
    }
  } catch (err) {
    console.warn('Single taboo card re-roll fallback triggered:', err);
  }

  // Fallback re-roll
  return {
    ...cardToReRoll,
    activeBannedWords: ['Process', 'Element', 'System', 'Function'].sort(() => 0.5 - Math.random()),
    studentBannedWords: ['Process', 'Element', 'System', 'Function'].sort(() => 0.5 - Math.random()),
  };
};
