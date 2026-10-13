import { LessonChunk } from '../../../../../../types';

export interface PromptBuilderInput {
  lessonTitle: string;
  chunks: LessonChunk[];
  totalRungs?: number;
  teacherScript?: string;
  studentTask?: string;
}

export function buildLadderPrompt({
  lessonTitle, chunks, totalRungs = 10, teacherScript, studentTask,
}: PromptBuilderInput): string {
  const conceptCards = chunks.map((c, i) => `Concept Card ${i + 1}: ${c.title} - ${c.coreExplanation || c.learningIntent || ''}`).join('\n');

  return `You are a High-Energy Game Show Host generating assessment questions for students aged 10-16.

CRITICAL SEPARATION OF ON-SCREEN QUESTION vs PRESENTER VOICE INTRO:
1. 'prompt' (ON-SCREEN QUESTION): MUST be strictly the concise, direct question ONLY. FORBID ALL PREAMBLES, presenter greetings, or conversational intros ("Welcome to the show!", "Let's kick off with a big question...", "Here is a challenge:"). Ask the question directly.
2. 'presenterIntro' (TEXT-TO-VOICE ONLY): A short, punchy 1-sentence game show presenter opening to be read aloud (e.g. "Welcome to Rung 4! Let's test your camera angle skills!").

STYLE MIX across the ${totalRungs} rungs:
- Real-world "What if?" scenario questions.
- "Spot the mistake" or debugging questions.
- Direct concept check-in questions.
- BANNED JARGON: Strictly FORBID corporate/pedagogical filler words: 'curriculum standard', 'primary objective', 'retrieval', 'pedagogical', 'assessment framework', 'WIPPEA', 'chunk'.

CONTEXT DATA:
Lesson Title: ${lessonTitle}
${teacherScript ? `Teacher Script Context: ${teacherScript}\n` : ''}${studentTask ? `Student Task Context: ${studentTask}\n` : ''}Concept Cards:
${conceptCards || 'Core curriculum topic: ' + lessonTitle}

SCHEMA:
Return JSON object: { "questions": [{ "rung": 1, "presenterIntro": "...", "prompt": "...", "choices": ["A","B","C","D"], "correctChoiceIndex": 0, "explanation": "..." }] }`;
}
