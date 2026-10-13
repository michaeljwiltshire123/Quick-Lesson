import { SummativeQuizQuestion } from '../typesSummativeQuiz';
import { LessonChunk, ChunkAttachment } from '../../../../../types';
import { buildGroundedQuizPrompt, QuizQuestionStyle } from './quizPromptBuilder';

export async function generateGroundedQuizQuestions(
  topic: string,
  gradeLevel: string,
  chunks: LessonChunk[],
  mediaAttachments: ChunkAttachment[] = [],
  count: number = 6,
  questionStyle: QuizQuestionStyle = 'teen_engaging'
): Promise<SummativeQuizQuestion[]> {
  const prompt = buildGroundedQuizPrompt({ topic, gradeLevel, chunks, mediaAttachments, questionCount: count, questionStyle });
  const models = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

  for (const model of models) {
    try {
      const res = await fetch('/api/generate-lesson-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'interactive_payloads', prompt, model, questionCount: count, chunks, mediaAttachments, gradeLevel, lessonTitle: topic }),
      });
      if (res.ok) {
        const data = await res.json();
        const rawQs = data.questions || [];
        if (Array.isArray(rawQs) && rawQs.length > 0) {
          return rawQs.slice(0, count).map((q: any, i: number) => ({
            id: q.id || `q-${Date.now()}-${i}`,
            questionNumber: i + 1,
            prompt: q.prompt || q.question || 'Assessment question',
            choices: Array.isArray(q.choices) ? q.choices : (Array.isArray(q.options) ? q.options : ['Option A', 'Option B', 'Option C', 'Option D']),
            correctChoiceIndex: typeof q.correctChoiceIndex === 'number' ? q.correctChoiceIndex : (typeof q.correctAnswer === 'number' ? q.correctAnswer - 1 : 0),
            explanation: q.explanation || 'Curriculum grounded explanation.',
          }));
        }
      }
    } catch {
      // try next model
    }
  }

  const fallbackQs: SummativeQuizQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const chunkIdx = chunks.length > 0 ? i % chunks.length : undefined;
    const c = chunkIdx !== undefined ? chunks[chunkIdx] : undefined;
    const cTitle = c?.title || topic || `Concept ${i + 1}`;
    fallbackQs.push({
      id: `fallback-${Date.now()}-${i}`,
      questionNumber: i + 1,
      prompt: `When applying "${cTitle}" in your work, what is the key rule to keep in mind?`,
      choices: [
        `It ensures your solution directly meets the core requirements of ${cTitle}`,
        `It is just an optional visual extra that doesn't affect the final result`,
        `It skips essential planning steps to speed up the process`,
        `It replaces the need to double-check your work for errors`,
      ],
      correctChoiceIndex: 0,
      explanation: `Mastering ${cTitle} ensures your work remains accurate and aligned with curriculum standards.`,
      chunkIndex: chunkIdx,
      chunkTitle: cTitle,
    });
  }

  return fallbackQs;
}
