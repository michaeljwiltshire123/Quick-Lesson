/**
 * PROTECTED ARCHITECTURAL VAULT
 * WARNING: DO NOT MODIFY OR REWRITE THIS PROMPT OR PIPELINE SPECIFICATION.
 * CANONICAL CURRICULUM MEDIA SCENES GENERATION PROMPT.
 */

export const MEDIA_SCENES_VAULT_VERSION = '1.0.0-LOCKED';

/**
 * Builds the canonical, locked Gemini prompt for 15 ranked candidate scenes.
 */
export function buildMediaScenesPrompt(
  cat: string,
  concept: string,
  subject: string,
  gradeLevel: string,
  themeNotes: string
): string {
  return `You are an elite UK curriculum designer and instructional media architect.
Identify 15 famous, real-world media scenes from category "${cat}" demonstrating the concept "${concept}" (${subject || 'General'}, Secondary & Sixth Form Ages 11-18, KS3-KS5). Classroom-appropriate excerpts from acclaimed works across standard ratings (U, PG, 12, 15) are explicitly permitted.

CRITICAL QUALITY RULES:
1. NO AI EXPLAINERS: Strictly forbid generic AI-generated explainers, synthetic voice animations, or amateur slideshows.
2. FAMOUS WORKS ONLY:
   - "Movie": Acclaimed cinema (e.g. Apollo 13, The Martian, Oppenheimer, Hidden Figures, Jurassic Park, The Matrix).
   - "Documentary": High-production series (e.g. BBC Planet Earth, Horizon, Nova, MythBusters, Blue Planet).
   - "Comedy": Acclaimed sitcoms demonstrating misconceptions (e.g. The Office, Parks & Recreation, Brooklyn Nine-Nine, Mr Bean).
   - "Cartoon": Iconic animation (e.g. The Simpsons, Inside Out, WALL-E, Phineas and Ferb, Spider-Verse).
   - "Reality": High-stakes reality (e.g. Dragons' Den, The Apprentice, MasterChef).
   - "Behind the Scenes": Authentic film making or engineering logs (e.g. NASA Mission Control, Industrial Light & Magic).
3. RANKING (1-15): Rank 1 is the best teenage comprehension hook.
4. TIMINGS & PAUSE CUE: Source video can be any standard duration (0.30-8 mins on official channels, including Shorts). Designate a focused 30-120s window (startTime to endTime) with an exact classroom cold-call question.
5. REAL YOUTUBE IDs: Prefer scenes on permanent studio channels (Movieclips, BBC, Universal, CrashCourse, TED-Ed). Provide canonical 11-char ID.
6. BRITISH & GLOBAL BALANCE: Feature acclaimed British television/cinema (BBC, Channel 4, Aardman) alongside global cinema. Where helpful, include memorable counter-examples or misconceptions.
Theme Notes: "${themeNotes || ''}". Strict British English spelling.

Return ONLY raw JSON:
{
  "scenes": [
    {
      "rank": 1,
      "sceneTitle": "Crisp Title",
      "movieOrShow": "Work Name",
      "category": "${cat}",
      "youtubeId": "11_char_id",
      "startTime": "00:45",
      "endTime": "01:30",
      "pauseCue": "Pause at MM:SS: Ask class...",
      "whyItWorks": "1 sentence on why this anchors comprehension."
    }
  ]
}`;
}

Object.freeze(buildMediaScenesPrompt);
