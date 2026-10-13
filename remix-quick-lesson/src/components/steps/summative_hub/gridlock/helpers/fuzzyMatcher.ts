export function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix: number[][] = [];
  for (let i = 0; i <= bn; i++) matrix[i] = [i];
  for (let j = 0; j <= an; j++) matrix[0][j] = j;

  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }
  return matrix[bn][an];
}

export function cleanAnswer(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/^(the|a|an)\s+/i, '')
    .replace(/[^a-z0-9]/g, '');
}

export function isAnswerFuzzyMatch(
  studentInput: string,
  targetAnswer: string,
  acceptableAnswers: string[] = []
): { isMatch: boolean; confidence: number; matchedAnswer: string } {
  const cleanInput = cleanAnswer(studentInput);
  if (!cleanInput) return { isMatch: false, confidence: 0, matchedAnswer: targetAnswer };

  const targets = [targetAnswer, ...acceptableAnswers].map((ans) => cleanAnswer(ans)).filter(Boolean);

  for (const t of targets) {
    if (cleanInput === t) {
      return { isMatch: true, confidence: 1.0, matchedAnswer: t };
    }
    const dist = levenshteinDistance(cleanInput, t);
    const maxLen = Math.max(cleanInput.length, t.length);
    // Allow up to 1 edit distance for words >= 4 letters, 2 edits for words >= 8 letters
    const maxAllowedDist = maxLen >= 8 ? 2 : maxLen >= 4 ? 1 : 0;
    if (dist <= maxAllowedDist) {
      const confidence = 1 - dist / maxLen;
      return { isMatch: true, confidence, matchedAnswer: t };
    }
  }

  return { isMatch: false, confidence: 0, matchedAnswer: targetAnswer };
}
