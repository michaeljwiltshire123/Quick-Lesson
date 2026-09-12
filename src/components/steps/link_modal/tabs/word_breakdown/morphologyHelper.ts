import { WordBreakdownItem } from './types';
import { LessonChunk } from '../../../../../types';
import { getPhoneticRebus, getConceptualRebus } from './rebusGenerator';

const PREFIXES: Record<string, { origin: 'Greek' | 'Latin' | 'Old English' | 'French'; meaning: string }> = {
  photo: { origin: 'Greek', meaning: 'Light' }, hydro: { origin: 'Greek', meaning: 'Water' },
  bio: { origin: 'Greek', meaning: 'Life' }, micro: { origin: 'Greek', meaning: 'Small' },
  thermo: { origin: 'Greek', meaning: 'Heat' }, chrono: { origin: 'Greek', meaning: 'Time' },
  multi: { origin: 'Latin', meaning: 'Many' }, sub: { origin: 'Latin', meaning: 'Under' }
};

const STOP_WORDS = new Set(['about', 'their', 'there', 'these', 'those', 'through', 'which', 'where', 'while', 'student', 'teacher', 'lesson', 'concept']);

export const extractConceptDifficultWords = (chunk?: LessonChunk, slideTitle?: string): string[] => {
  if (chunk?.vocabulary) {
    const parsed = chunk.vocabulary.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
    if (parsed.length > 0) return parsed;
  }
  const text = [chunk?.title, slideTitle, chunk?.teacherScript, chunk?.classroomNotes, chunk?.learningIntent].filter(Boolean).join(' ');
  const words = text.split(/[^a-zA-Z]+/).map(w => w.trim()).filter(w => w.length >= 5 && !STOP_WORDS.has(w.toLowerCase()));
  return Array.from(new Set(words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))).slice(0, 5);
};

export const createBreakdownItem = (rawTerm: string): WordBreakdownItem => {
  const clean = rawTerm.trim();
  const lower = clean.toLowerCase();
  const matchedKey = Object.keys(PREFIXES).find(p => lower.startsWith(p));
const rootBreakdown = matchedKey
    ? [{ part: `${matchedKey}-`, origin: PREFIXES[matchedKey].origin as 'Greek' | 'Latin' | 'Old English' | 'French', meaning: PREFIXES[matchedKey].meaning }, { part: clean.slice(matchedKey.length), origin: 'Latin' as const, meaning: 'Base' }]
    : [{ part: clean.slice(0, Math.ceil(clean.length / 2)), origin: 'Greek' as const, meaning: 'Root' }, { part: clean.slice(Math.ceil(clean.length / 2)), origin: 'Latin' as const, meaning: 'Suffix' }];

  const pData = getPhoneticRebus(clean);
  const cData = getConceptualRebus(clean);
  return {
    id: `wb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    term: clean.charAt(0).toUpperCase() + clean.slice(1),
    phonetics: clean.toUpperCase().split('').join('-'),
    rootBreakdown, puzzleType: 'rebus', rebusStyle: 'phonetic',
    emojiRebus: pData.rebus, phoneticRebus: pData.rebus, phoneticHint: pData.hint,
    conceptualRebus: cData.rebus, conceptualHint: cData.hint,
    riddleClue: `Silent in structure yet potent in power,\nI dance through the details hour by hour.\nUnravel my secrets and speak out my name—\nWhat am I?`,
    imagePrompt: `Clear classroom visual illustration representing ${clean}`, selected: true
  };
};

export const loadSessionBreakdown = (chunkId?: string): WordBreakdownItem[] | null => {
  try {
    const raw = sessionStorage.getItem(`ql_word_breakdown_${chunkId || 'draft'}`);
    if (!raw) return null;
    const parsed: WordBreakdownItem[] = JSON.parse(raw);
    return parsed.map(item => {
      const isCorrupt = !item.phoneticRebus || item.phoneticRebus.includes('🎯') || item.phoneticRebus.includes('');
      const pData = isCorrupt ? getPhoneticRebus(item.term) : getPhoneticRebus(item.term, item.phoneticRebus, item.phoneticHint);
      const cData = getConceptualRebus(item.term, item.conceptualRebus, item.conceptualHint);
      return { ...item, phoneticRebus: pData.rebus, phoneticHint: pData.hint, emojiRebus: pData.rebus, conceptualRebus: cData.rebus, conceptualHint: cData.hint };
    });
  } catch { return null; }
};

export const saveSessionBreakdown = (items: WordBreakdownItem[], chunkId?: string) => {
  try { sessionStorage.setItem(`ql_word_breakdown_${chunkId || 'draft'}`, JSON.stringify(items)); } catch {}
};

export const fetchConceptBreakdown = async (
  title?: string, script?: string, notes?: string, subject?: string, explicitTerms?: string[]
): Promise<WordBreakdownItem[]> => {
  const resp = await fetch('/api/generate-word-breakdown', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ terms: explicitTerms, conceptTitle: title, conceptScript: script, conceptNotes: notes, subject })
  });
  const data = await resp.json();
  if (!Array.isArray(data?.breakdowns) || data.breakdowns.length === 0) return [];
  return data.breakdowns.map((b: any) => ({
    id: `wb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    term: b.term,
    phonetics: b.phonetic || b.term.toUpperCase().split('').join('-'),
    rootBreakdown: Array.isArray(b.morphemes) ? b.morphemes : [],
    puzzleType: 'rebus',
    rebusStyle: 'phonetic',
    emojiRebus: b.phoneticRebus || b.emojiRebus,
    phoneticRebus: b.phoneticRebus || b.emojiRebus,
    phoneticHint: b.phoneticHint || 'Sound-alike clues',
    conceptualRebus: b.conceptualRebus,
    conceptualHint: b.conceptualHint || 'Core concept idea',
    riddleClue: b.riddleClue || '',
    imagePrompt: b.visualPrompt || `Visual clue for ${b.term}`,
    selected: true
  }));
};
