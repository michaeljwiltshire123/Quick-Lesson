import { useMemo } from 'react';
import { GridlockQuestion } from '../types/gridlockTypes';
import { LetterMasteryEntry } from './ConceptMasteryMetrics';

export const useGridlockAnalyticsData = (questions: GridlockQuestion[], lessonTitle: string) => {
  return useMemo(() => {
    const entries: LetterMasteryEntry[] = questions.map((q, idx) => ({
      letter: q.letter,
      conceptPrompt: q.targetAnswer,
      accuracyPercentage: idx % 5 === 0 ? 52 : idx % 3 === 0 ? 68 : 86,
      totalAttempts: 28,
      misconceptionAlert: idx % 5 === 0
        ? `Clarify key distinction for '${q.letter}' (${q.targetAnswer}) within ${q.chunkTitle || lessonTitle}.`
        : undefined,
    }));

    return {
      entries,
      winningTeam: 'red' as const,
      averageAccuracy: 76,
      totalCapturedHexes: 19,
      totalMatchesPlayed: 3,
    };
  }, [questions, lessonTitle]);
};
