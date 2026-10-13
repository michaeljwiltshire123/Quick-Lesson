const ACTION_VERBS_AND_TASKS = new Set([
  'students', 'pupils', 'learners', 'sketch', 'draw', 'write', 'discuss',
  'explain', 'explore', 'understand', 'create', 'identify', 'analyse',
  'analyze', 'evaluate', 'calculate', 'pairs', 'pair', 'group', 'activity',
  'task', 'step', 'lesson', 'homework', 'exercise', 'worksheet', 'character',
]);

const HANGING_STOPWORDS = new Set([
  'a', 'an', 'the', 'if', 'in', 'on', 'at', 'by', 'with', 'from', 'for',
  'to', 'of', 'and', 'or', 'is', 'are', 'was', 'were', 'this', 'that',
  'these', 'those', 'their', 'your', 'its', 'it', 'they', 'we', 'you',
  'he', 'she', 'as', 'so', 'than', 'when', 'how', 'why', 'what', 'which',
]);

const ADJECTIVE_NOUN_ANCHORS: Record<string, string> = {
  warm: 'Lighting',
  cool: 'Lighting',
  diegetic: 'Sound',
  linear: 'Narrative',
  focal: 'Length',
  three: 'Point Lighting',
  high: 'Key Lighting',
  low: 'Key Lighting',
  wide: 'Shot Angle',
  close: 'Up Shot',
};

export function cleanTargetTerm(raw: string): string | null {
  if (!raw || typeof raw !== 'string') return null;

  // Clean and split words
  let words = raw
    .replace(/[^\w\s\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());

  // Strip leading & trailing hanging stopwords
  while (words.length > 0 && HANGING_STOPWORDS.has(words[0])) words.shift();
  while (words.length > 0 && HANGING_STOPWORDS.has(words[words.length - 1])) words.pop();

  if (words.length === 0) return null;

  // Filter out sentences starting with action/task verbs
  if (ACTION_VERBS_AND_TASKS.has(words[0])) return null;

  // Check if any word in the phrase is an instructional meta-phrase
  if (words.some((w) => ['sketch', 'discuss', 'worksheet', 'homework'].includes(w))) return null;

  // Compound noun anchoring for single adjectives
  if (words.length === 1 && ADJECTIVE_NOUN_ANCHORS[words[0]]) {
    const anchor = ADJECTIVE_NOUN_ANCHORS[words[0]];
    return `${words[0].charAt(0).toUpperCase() + words[0].slice(1)} ${anchor}`;
  }

  // Filter out single words under 4 characters or plain stopwords
  if (words.length === 1 && (words[0].length < 4 || HANGING_STOPWORDS.has(words[0]))) {
    return null;
  }

  // Strict constraint: maximum 3 words
  if (words.length > 3) {
    words = words.slice(0, 3);
    while (words.length > 0 && HANGING_STOPWORDS.has(words[words.length - 1])) words.pop();
  }

  if (words.length === 0) return null;

  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
