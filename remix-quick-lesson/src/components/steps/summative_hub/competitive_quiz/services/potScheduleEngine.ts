import { BackgroundPatternId } from '../board/SecretPatternRenderer';

const DECOY_PATTERNS: BackgroundPatternId[] = [
  'decoy_stripes',
  'decoy_waves',
  'decoy_crosshatch',
  'decoy_dots',
  'decoy_zigzag',
];

export const calculatePotSchedule = (
  totalQuestions: number
): { patterns: BackgroundPatternId[]; accumulatedPots: number[]; trueWinningRound: number } => {
  const count = Math.max(1, totalQuestions);
  // Fourth-fifth target: e.g. for 8 questions => index 5 or 6 (Round 6 or 7)
  const minTarget = Math.max(1, Math.floor(count * 0.6));
  const maxTarget = Math.min(count - 1, Math.floor(count * 0.85));
  const trueWinningRound = minTarget >= maxTarget ? minTarget : minTarget + Math.floor(Math.random() * (maxTarget - minTarget + 1));

  const patterns: BackgroundPatternId[] = [];
  const accumulatedPots: number[] = [];

  let runningPot = 150;
  for (let i = 0; i < count; i++) {
    const roundNumber = i + 1;
    const roundIncrement = 150 + (i * 40);
    if (i > 0) runningPot += roundIncrement;

    accumulatedPots.push(runningPot);

    if (roundNumber === trueWinningRound) {
      patterns.push('true_gold_honeycomb');
    } else {
      const decoyIdx = i % DECOY_PATTERNS.length;
      patterns.push(DECOY_PATTERNS[decoyIdx]);
    }
  }

  return { patterns, accumulatedPots, trueWinningRound };
};
