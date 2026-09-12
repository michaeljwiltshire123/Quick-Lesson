import { Request, Response } from 'express';
import { executeGenAI, checkCircuitBreaker, recordCircuitError, resetCircuitBreaker } from './aiHandlers';
import { decodeDocText } from './docDecoder';
import { SYLLABUS_PARSER_PROMPT, LESSON_SEQUENCE_PROMPT, REPARSE_SECTION_PROMPT } from '../utils/aiPrompts';

export async function handleParseBrief(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { content, fileName, fileBase64, mimeType } = req.body;
    let text = typeof content === 'string' ? content : '';
    if (fileBase64) { const dec = await decodeDocText(fileName, fileBase64, mimeType); if (dec) text = dec; }
    if (!text.trim()) return res.status(400).json({ error: 'No readable text extracted.' });
    const parsed = await executeGenAI(`${SYLLABUS_PARSER_PROMPT}\n\nFile: ${fileName || 'Brief'}\n\n${text.slice(0, 80000)}`, '{}');
    resetCircuitBreaker();
    res.json({ ...parsed, rawText: text });
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message || 'Brief parsing failure' }); }
}

export async function handleLessonSequence(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { lessonTitle, subject, gradeLevel, rawNotes } = req.body;
    const prompt = LESSON_SEQUENCE_PROMPT.replace('[SUBJECT]', subject || 'General').replace('[GRADE_LEVEL]', gradeLevel || 'Key Stage 3').replace('[LESSON_TITLE]', lessonTitle || 'Lesson').replace('[NOTES]', rawNotes || '');
    const parsed = await executeGenAI(prompt, '{"steps":[]}');
    resetCircuitBreaker();
    res.json({ steps: Array.isArray(parsed?.steps) ? parsed.steps : (Array.isArray(parsed) ? parsed : []) });
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message || 'Sequence generation failure' }); }
}

export async function handleReparseBriefSection(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { content, fileName, fileBase64, mimeType, currentCriteria } = req.body;
    let text = typeof content === 'string' ? content : '';
    if (fileBase64) { const dec = await decodeDocText(fileName, fileBase64, mimeType); if (dec) text = dec; }
    const prompt = REPARSE_SECTION_PROMPT.replace('[EXISTING_ITEMS]', JSON.stringify(currentCriteria || [])).replace('[DOCUMENT_TEXT]', text.slice(0, 80000));
    const parsed = await executeGenAI(prompt, '{"assessedCriteria":[]}');
    resetCircuitBreaker();
    res.json({ assessedCriteria: Array.isArray(parsed?.assessedCriteria) ? parsed.assessedCriteria : [] });
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message || 'Look-again re-parse failure' }); }
}

export async function handleVideoMetadata(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') return res.json({ title: '', author_name: '' });
    const endpoint = (url.includes('youtube.com') || url.includes('youtu.be'))
      ? `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
      : url.includes('tiktok.com') ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}` : null;
    if (!endpoint) return res.json({ title: '', author_name: '' });
    const resp = await fetch(endpoint, { signal: AbortSignal.timeout(3500) });
    const data: any = resp.ok ? await resp.json() : {};
    res.json({ title: data.title || '', author_name: data.author_name || '' });
  } catch { res.json({ title: '', author_name: '' }); }
}
