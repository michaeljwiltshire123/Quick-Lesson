import { LessonChunk, ChunkAttachment } from '../../../../../types';

export type QuizQuestionStyle = 'teen_engaging' | 'scenario_detective' | 'sharp_direct' | 'gcse_formal';

export interface QuizPromptInput {
  topic: string;
  gradeLevel: string;
  chunks: LessonChunk[];
  mediaAttachments?: ChunkAttachment[];
  questionCount?: number;
  questionStyle?: QuizQuestionStyle;
}

export function buildGroundedQuizPrompt(input: QuizPromptInput): string {
  const {
    topic,
    gradeLevel = 'BTEC Level 3',
    chunks,
    mediaAttachments = [],
    questionCount = 6,
    questionStyle = 'teen_engaging',
  } = input;

  const conceptText = chunks.map((c, i) => `
Concept Card ${i + 1} (${c.title || 'Untitled'}):
- Explanation: ${c.teacherScript || c.coreExplanation || c.theoryBullets || 'N/A'}
- Student Task: ${c.furtherReading || c.workedExample || c.stepByStep || 'N/A'}
- Key Terms: ${c.vocabulary || c.vocabularyTags || 'N/A'}
`).join('\n');

  const mediaText = mediaAttachments.map((m, i) => `
Resource ${i + 1} (${m.name || m.id || 'Resource'}, Type: ${m.type}):
- CFU Prompt: ${m.cfuPrompt || m.pauseCue || 'N/A'}
`).join('\n');

  const styleGuides: Record<QuizQuestionStyle, string> = {
    teen_engaging: `PERSONA & TONE: Energetic UK Educator speaking to students (${gradeLevel}). Frame questions around real-world scenarios, practical student choices, and relatable decisions. Avoid stuffy, robotic manual-speak or forced cringey slang. Make choices sound like real things a student would say or choose.`,
    scenario_detective: `PERSONA & TONE: Scenario & Mistake-Buster Specialist (${gradeLevel}). Frame questions around realistic student work reviews ("A student is attempting X...", "Spot the mistake in this approach...", "What should they fix next?").`,
    sharp_direct: `PERSONA & TONE: Sharp & Direct Tutor (${gradeLevel}). Write short, clear, no-fluff questions focusing straight on key concepts and practical application.`,
    gcse_formal: `PERSONA & TONE: Official Exam Board Assessor (${gradeLevel}). Write structured, formal exam-style assessment questions.`,
  };

  return `You are an expert UK Educator specializing in ${gradeLevel}. Generate EXACTLY ${questionCount} diagnostic quiz questions for ${gradeLevel}.

${styleGuides[questionStyle] || styleGuides.teen_engaging}

CRITICAL GROUNDING MANDATE:
- Generate EXACTLY ${questionCount} questions in total.
- Questions MUST test concepts directly from the provided Concept Cards and Resources below.
- Do NOT use generic textbook filler or pompous phrasing. Ensure distractors represent plausible student misconceptions.

CONCEPT CARDS & RESOURCES:
TOPIC: ${topic}
${conceptText}
${mediaText}

SCHEMA:
Return JSON object: { "questions": [{ "id": "q1", "prompt": "...", "choices": ["A","B","C","D"], "correctChoiceIndex": 0, "explanation": "..." }] }`;
}
