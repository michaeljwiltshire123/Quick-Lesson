const BANNED_JARGON = [
  'module',
  'rubric',
  'course',
  'assignment',
  'pedagogical',
  'retrieval',
  'syllabus',
  'curriculum milestone',
  'learning objective',
  'formative assessment',
  'summative evaluation',
];

export const sanitizeJargonFreeText = (text: string): string => {
  let cleaned = text;
  for (const jargon of BANNED_JARGON) {
    const reg = new RegExp(`\\b${jargon}\\b`, 'gi');
    cleaned = cleaned.replace(reg, 'challenge');
  }
  return cleaned
    .replace(/\s+/g, ' ')
    .trim();
};

export const hasBannedJargon = (text: string): boolean => {
  const lower = text.toLowerCase();
  return BANNED_JARGON.some((word) => lower.includes(word));
};
