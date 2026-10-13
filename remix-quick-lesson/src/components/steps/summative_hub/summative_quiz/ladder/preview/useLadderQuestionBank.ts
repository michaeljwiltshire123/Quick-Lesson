import { useState } from 'react';
import { LadderQuizConfig, LadderRungQuestion } from '../typesLadder';
import { BACKUP_SWAP_QUESTIONS } from './ladderSwapQuestionBank';

export const useLadderQuestionBank = (config: LadderQuizConfig) => {
  const [rungs, setRungs] = useState<LadderRungQuestion[]>(() => config.rungs);
  const [swapIndex, setSwapIndex] = useState(0);

  const swapActiveQuestion = (rungNumber: number): LadderRungQuestion | null => {
    const backup = BACKUP_SWAP_QUESTIONS[swapIndex % BACKUP_SWAP_QUESTIONS.length];
    setSwapIndex((prev) => prev + 1);

    let swappedRung: LadderRungQuestion | null = null;
    setRungs((prev) =>
      prev.map((r) => {
        if (r.rungNumber === rungNumber) {
          swappedRung = {
            ...r,
            prompt: backup.prompt,
            choices: [...backup.choices],
            correctChoiceIndex: backup.correctChoiceIndex,
            explanation: backup.explanation,
            presenterIntro: backup.presenterIntro,
          };
          return swappedRung;
        }
        return r;
      })
    );

    return swappedRung;
  };

  const resetRungs = () => {
    setRungs(config.rungs);
    setSwapIndex(0);
  };

  return { rungs, swapActiveQuestion, resetRungs };
};
