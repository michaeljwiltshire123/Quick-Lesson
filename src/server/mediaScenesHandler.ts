import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';

export async function handleMediaScenes(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { category, chunkTitle, lessonTitle, subject, gradeLevel, themeNotes } = req.body;
    const cat = category || 'Movie';
    const concept = chunkTitle || lessonTitle || 'Core Concept';

    const aiPrompt = `You are an instructional designer. Identify 8 famous, real-world media scenes from category "${cat}" demonstrating "${concept}" (${subject || 'General'}, ${gradeLevel || 'Secondary'}). Clips under 3 mins.
Theme Notes: "${themeNotes || ''}". British English spelling.
Return ONLY raw JSON:
{
  "scenes": [
    {
      "id": "scene-1", "sceneTitle": "Title", "movieOrShow": "Work", "category": "${cat}",
      "youtubeId": "VideoID", "searchPhrase": "query under 3 minutes", "whyItWorks": "1-2 sentences",
      "startTime": "00:45", "endTime": "01:30", "pauseCue": "Pause at MM:SS and ask..."
    }
  ]
}`;

    const fallback = JSON.stringify({
      scenes: [
        {
          id: 'scene-1', sceneTitle: 'High-Stakes Problem Solving', movieOrShow: 'Apollo 13', category: cat,
          youtubeId: 'v_C9v4R7l1I', searchPhrase: 'Apollo 13 problem solving clip under 3 minutes',
          whyItWorks: `Iconic demonstration of applying ${concept} under real constraints.`,
          startTime: '01:00', endTime: '02:15', pauseCue: "Pause at 01:45 and ask: 'What constraint is key?'"
        }
      ]
    });

    const parsed = await executeGenAI(aiPrompt, fallback);
    resetCircuitBreaker();
    res.json(parsed);
  } catch {
    res.json({ scenes: [] });
  }
}
