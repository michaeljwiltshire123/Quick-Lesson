import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';
import { filterActiveScenes } from './youtubeVerifier';
import { buildMediaScenesPrompt } from './vaults/mediaScenesPromptVault';

export async function handleMediaScenes(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { category, chunkTitle, lessonTitle, subject, gradeLevel, themeNotes } = req.body;
    const cat = category || 'Movie';
    const concept = chunkTitle || lessonTitle || 'Core Curriculum Concept';

    // Invoke locked prompt from the immutable vault
    const aiPrompt = buildMediaScenesPrompt(cat, concept, subject, gradeLevel, themeNotes);
    const parsed = await executeGenAI(aiPrompt, JSON.stringify({ scenes: [] }));
    resetCircuitBreaker();

    const rawScenes = Array.isArray(parsed?.scenes) ? parsed.scenes : [];
    // Verify each video in background via YouTube oEmbed; keep ONLY genuinely active working videos (up to 4)
    const verifiedScenes = await filterActiveScenes(rawScenes, 4);

    res.json({ scenes: verifiedScenes });
  } catch {
    res.json({ scenes: [] });
  }
}
