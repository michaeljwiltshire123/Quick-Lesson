import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { SYLLABUS_PARSER_PROMPT, SUBTOPIC_PROGRESSION_PROMPT, LESSON_SEQUENCE_PROMPT } from '../utils/aiPrompts';

let consecutiveErrors = 0, lastErrorTime = 0;
const MAX_ERRORS = 5, COOLDOWN_MS = 20000;
export const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });
export const checkCircuitBreaker = (): boolean => {
  if (consecutiveErrors >= MAX_ERRORS) { if (Date.now() - lastErrorTime > COOLDOWN_MS) { consecutiveErrors = 0; return true; } return false; }
  return true;
};
export const recordCircuitError = () => { consecutiveErrors++; lastErrorTime = Date.now(); };
export const resetCircuitBreaker = () => { consecutiveErrors = 0; };

const parseSafeJson = (raw: string, fallback: string): any => {
  const str = (raw || '').trim().replace(/^```json\s*|^```\s*|\s*```$/gi, '').trim();
  try { return JSON.parse(str); } catch {}
  const start = str.search(/[{\[]/);
  if (start === -1) { try { return JSON.parse(fallback); } catch { return {}; } }
  const open = str[start], close = open === '{' ? '}' : ']';
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < str.length; i++) {
    const c = str[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (!inStr) {
      if (c === open) depth++;
      else if (c === close && --depth === 0) {
        try { return JSON.parse(str.slice(start, i + 1)); } catch {}
        break;
      }
    }
  }
  const match = str.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  try { return JSON.parse(match ? match[0] : fallback); } catch { return {}; }
};

export const executeGenAI = async (prompt: string, fallback: string) => {
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
  for (const model of models) {
    try {
      const resp = await getAI().models.generateContent({ model, contents: prompt, config: { responseMimeType: 'application/json' } });
      const parsed = parseSafeJson(resp.text || '', fallback);
      resetCircuitBreaker();
      return parsed;
    } catch {
      // Gracefully cascade to next available model in roster
    }
  }
  return parseSafeJson(fallback, fallback);
};

export async function handleParseModuleBrief(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { content, fileName } = req.body;
    const safe = typeof content === 'string' ? content.slice(0, 15000) : '';
    const parsed = await executeGenAI(`${SYLLABUS_PARSER_PROMPT}\n\nFile Name: ${fileName || 'Brief'}\n\nContent:\n${safe}`, '{}');
    res.json(parsed);
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message || 'Brief parsing failure' }); }
}

export async function handleProgressionSuggestions(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { lessonTitle, subject, gradeLevel, currentObjectives } = req.body;
    const prompt = `${SUBTOPIC_PROGRESSION_PROMPT}\n\nLesson Title: ${lessonTitle}\nSubject: ${subject}\nGrade Level: ${gradeLevel}\nCurrent Objectives: ${(currentObjectives || []).join(', ')}`;
    const parsed = await executeGenAI(prompt, '{"items":[]}');
    res.json({ success: true, data: { items: Array.isArray(parsed) ? parsed : (parsed?.items || []) } });
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message || 'Progression suggestion failure' }); }
}

export async function handleLessonSequence(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { lessonTitle, subject, gradeLevel, rawNotes } = req.body;
    const prompt = LESSON_SEQUENCE_PROMPT.replace('[SUBJECT]', subject || 'General').replace('[GRADE_LEVEL]', gradeLevel || 'Key Stage 3').replace('[LESSON_TITLE]', lessonTitle || 'Lesson').replace('[NOTES]', rawNotes || '');
    const parsed = await executeGenAI(prompt, '{"steps":[]}');
    res.json(parsed);
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message || 'Sequence generation failure' }); }
}
