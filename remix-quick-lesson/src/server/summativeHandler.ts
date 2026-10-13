import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';

export async function handleSummativeTasks(req: Request, res: Response) {
  try {
    const {
      lessonTitle, subject, gradeLevel, assessedCriteria, coveredConcepts, vocationalScenario,
    } = req.body;
    const title = lessonTitle || 'Summative Milestone';
    const criteriaStr = Array.isArray(assessedCriteria) && assessedCriteria.length > 0
      ? assessedCriteria.join(', ') : 'P1, M1, AO2';
    const conceptsStr = Array.isArray(coveredConcepts) && coveredConcepts.length > 0
      ? coveredConcepts.join(', ') : title;

    const aiPrompt = `Generate 6 multimodal 20-minute summative performance assessment tasks for "${title}" (${subject || 'General'}, ${gradeLevel || 'Secondary'}).
Criteria to assess: ${criteriaStr}. Concepts covered: ${conceptsStr}. Scenario: ${vocationalScenario || 'Real-world vocational scenario'}.
Provide one task for each format: written_report, verbal_pitch, visual_sketchnote, practical_demo, peer_audit, data_debug.
Return ONLY raw JSON in this format:
{
  "tasks": [
    {
      "id": "task-written_report",
      "format": "written_report",
      "formatLabel": "Written Report",
      "title": "...",
      "description": "...",
      "criteriaCodes": ["P1"],
      "coveredConcepts": ["Concept 1"],
      "handoutPrompt": "..."
    }
  ]
}`;

    const parsed = await executeGenAI(aiPrompt, JSON.stringify({ tasks: [] }));
    resetCircuitBreaker();
    return res.json(parsed);
  } catch {
    return res.json({ tasks: [] });
  }
}
