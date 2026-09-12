import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';
import { handleStudentQuestChecklist } from './questChecklistHandler';
import { handleInteractivePayloads } from './lessonPayloadHandler';
import { getCoreExplanationPrompt, getFormativeTaskPrompt } from './lessonContentPrompts';

export async function handleLessonSection(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { section, prompt, lessonTitle, chunkTitle, courseTitle, subject, gradeLevel, themeNotes } = req.body;
    if (section === 'student_quest_checklist') return handleStudentQuestChecklist(req, res);
    if (section === 'interactive_payloads') return handleInteractivePayloads(req, res);

    const title = chunkTitle || lessonTitle || prompt || 'Concept';
    const course = courseTitle || 'Module Brief';

    if (section === 'core_explanation') {
      const aiPrompt = getCoreExplanationPrompt(title, lessonTitle, course, subject, gradeLevel, themeNotes);
      const fallback = JSON.stringify({
        coreExplanation: `${title} breaks complex processes into clear, manageable steps to build understanding quickly.`,
        howToUse: [`Model First: Show step 1 explicitly on board.`, `Check Step: Pause for quick student check.`],
        whyToUse: [`Lowers Load: Prevents cognitive overload.`, `Builds Speed: Scaffolds early confidence.`],
        example: `Demonstrating ${title}: 1. Identify key features in context. 2. Apply the technique step-by-step.`,
        workedExample: `Demonstrating ${title}: 1. Identify key features in context. 2. Apply the technique step-by-step.`
      });
      const parsed = await executeGenAI(aiPrompt, fallback);
      resetCircuitBreaker();
      return res.json(parsed);
    }

    if (section === 'chunk_formative_task') {
      const { requiredDeliverables, assessedCriteria, grouping, refreshSeed } = req.body;
      const criteriaStr = Array.isArray(assessedCriteria) && assessedCriteria.length > 0 ? assessedCriteria.join(', ') : 'NONE PROVIDED';
      const aiPrompt = getFormativeTaskPrompt(title, subject, gradeLevel, grouping, refreshSeed || Date.now(), themeNotes, Array.isArray(requiredDeliverables) ? requiredDeliverables.join(', ') : requiredDeliverables || '', criteriaStr);
      const fallback = JSON.stringify({ activities: [{ id: '1', title: `${title} Practice`, intelligence: 'Logical-Mathematical', criteria: [], task: `Apply ${title} with a partner.`, rules: '2 minutes.' }] });
      const parsed = await executeGenAI(aiPrompt, fallback);
      resetCircuitBreaker();
      return res.json(parsed);
    }

    if (section === 'gateway_questions' || section === 'pivot_questions') {
      const aiPrompt = `Generate 4 conceptual checking questions for "${title}" (${subject || 'General'}).\nReturn ONLY raw JSON: { "questions": [{ "id": "q1", "question": "...", "answer": "..." }] }`;
      const fallback = JSON.stringify({ questions: [{ id: '1', question: `What is the core principle behind ${title}?`, answer: 'Checks foundational understanding.' }] });
      const parsed = await executeGenAI(aiPrompt, fallback);
      resetCircuitBreaker();
      return res.json(parsed);
    }

    const aiPrompt = `Construct 4 humorous, memorable analogies for "${title}" (${subject || 'General'}, ${gradeLevel || 'Secondary'}). Theme: "${themeNotes || ''}".\nReturn ONLY raw JSON: { "suggestions": [{ "badge": "Title", "metaphor": "Analogy sentence" }] }`;
    const fallback = JSON.stringify({ suggestions: [{ badge: "Analogy Hook", metaphor: `Think of ${title} like a clear system connecting parts safely.` }] });
    const parsed = await executeGenAI(aiPrompt, fallback);
    resetCircuitBreaker();
    res.json(parsed);
  } catch { res.json({ suggestions: [] }); }
}
