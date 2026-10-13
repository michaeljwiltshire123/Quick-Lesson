import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';

export async function handleStudentQuestChecklist(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { chunkTitle, lessonTitle, subject, gradeLevel, platform, linkTitle } = req.body;
    const concept = chunkTitle || lessonTitle || 'Lesson Task';
    const mediaType = platform || 'Interactive Activity';
    const resourceName = linkTitle || 'digital resource';

    const aiPrompt = `You are a Senior UK Curriculum gamification and instructional design expert.
Generate exactly 3 sequential, active student task check-steps (under 10 words each) for students completing a digital quest with "${resourceName}" (${mediaType}) on the concept "${concept}" (${subject || 'General'}, Key Stage: ${gradeLevel || 'Secondary'}).

DIRECTIVES:
- Use British English spelling throughout (e.g., analyse, organise, summarise, colour).
- Each step must be an active, punchy checklist task under 10 words starting with an imperative verb.
- Sequential progression: 1 (inspect/open), 2 (execute/solve), 3 (synthesise/evaluate).

Return strictly raw JSON matching this schema:
{
  "steps": [
    "Step 1 action under 10 words",
    "Step 2 action under 10 words",
    "Step 3 action under 10 words"
  ]
}`;

    const fallback = JSON.stringify({
      steps: [
        `Scan link and launch ${concept} quest`,
        `Complete activity tasks and record primary findings`,
        `Synthesise key takeaways on your student handout`
      ]
    });

    const parsed = await executeGenAI(aiPrompt, fallback);
    resetCircuitBreaker();
    const steps = Array.isArray(parsed?.steps) ? parsed.steps : (Array.isArray(parsed) ? parsed : [
      `Open ${resourceName} and review instructions`,
      `Solve the diagnostic challenge on ${concept}`,
      `Compare results with your partner`
    ]);
    return res.json({ steps });
  } catch (err: any) {
    return res.json({
      steps: [
        'Open link and launch student quest',
        'Complete key challenge questions',
        'Record final score on worksheet'
      ]
    });
  }
}
