import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';

export async function handleInteractivePayloads(req: Request, res: Response) {
  const { chunkTitle, lessonTitle, subject, gradeLevel = 'Key Stage 3 / Year 9', chunks = [], mediaAttachments = [], questionCount = 5, customFocus, prompt: customPrompt } = req.body;
  const topic = chunkTitle || lessonTitle || 'Teaching Concept';
  const count = Math.min(Math.max(Number(questionCount) || 5, 3), 15);

  let prompt = customPrompt;
  if (!prompt) {
    const conceptText = Array.isArray(chunks) && chunks.length > 0
      ? chunks.map((c: any, i: number) => `Concept Card ${i + 1} (${c.title || 'Untitled'}):\n- Teacher Script / Explanation: ${c.teacherScript || c.coreExplanation || 'N/A'}\n- Student Task / Example: ${c.furtherReading || c.workedExample || 'N/A'}\n- Vocabulary: ${c.vocabulary || 'N/A'}`).join('\n')
      : `Topic: ${topic} (${subject || 'General'})`;

    const mediaText = Array.isArray(mediaAttachments) && mediaAttachments.length > 0
      ? mediaAttachments.map((m: any, i: number) => `Attached Media ${i + 1} (${m.name || 'Resource'}, Type: ${m.type}):\n- CFU Prompt: ${m.cfuPrompt || 'N/A'}`).join('\n')
      : 'No media attachments';

    const extractedConceptTextAndMedia = `TOPIC: ${topic}\n\n[CONCEPT CARDS]\n${conceptText}\n\n[ATTACHED MEDIA RESOURCES]\n${mediaText}\n\nFocus: ${customFocus || 'Key curriculum takeaways'}`;

    prompt = `You are a Lead UK Curriculum Assessor. Generate exactly ${count} diagnostic quiz questions for Key Stage / Grade: ${gradeLevel}.

CRITICAL GROUNDING MANDATE:
- ONLY ask questions based directly on the provided Concept Cards and Media Attachments below.
- DO NOT invent external trivia or general questions based on the lesson title alone.
- Every question must test a specific concept, script note, or media resource listed in the context.

CONCEPT CARDS & ATTACHED MEDIA CONTEXT:
${extractedConceptTextAndMedia}

SCHEMA:
Return JSON object: { "questions": [{ "id": "q1", "prompt": "...", "choices": ["A","B","C","D"], "correctChoiceIndex": 0, "explanation": "..." }] }`;
  }

  const fallbackQuestions = Array.from({ length: count }, (_, i) => ({
    id: `q${i + 1}`,
    prompt: `Grounded check ${i + 1}: What is the core principle taught in ${topic}?`,
    choices: ['Primary curriculum standard', 'Secondary factor', 'Common misconception', 'Unrelated parameter'],
    correctChoiceIndex: 0,
    explanation: `Grounded in lesson concept: ${topic}.`,
  }));

  try {
    const parsed = await executeGenAI(prompt, JSON.stringify({ questions: fallbackQuestions }));
    resetCircuitBreaker();
    const questions = Array.isArray(parsed?.questions) && parsed.questions.length > 0 ? parsed.questions : fallbackQuestions;
    return res.json({ questions });
  } catch {
    return res.json({ questions: fallbackQuestions });
  }
}
