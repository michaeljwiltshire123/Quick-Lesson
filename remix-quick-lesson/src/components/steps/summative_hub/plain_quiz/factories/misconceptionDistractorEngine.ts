import { LessonChunk } from '../../../../../types';

export function buildMisconceptionPromptRules(chunks: LessonChunk[] = []): string {
  const extractedTopics = chunks
    .map((c) => c.title)
    .filter(Boolean)
    .join(', ');

  return `
CRITICAL DISTRACTOR QUALITY MANDATES:
1. For every incorrect choice (distractor), generate an authentic student misconception, NOT an obvious throwaway answer.
2. Ground wrong options in common student misunderstandings related to: ${extractedTopics || 'the lesson topic'}.
3. Ensure all 4 choices are similar in length and tone so pupils cannot identify the correct choice by sentence structure alone.
4. Provide a clear explanatory sentence explaining why the correct choice is accurate and why common misconceptions occur.
`;
}
