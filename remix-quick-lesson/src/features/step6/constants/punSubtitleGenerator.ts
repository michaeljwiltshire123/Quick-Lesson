/**
 * Cheerful British educational pun generator for lesson title slides.
 */

const SUBJECT_PUNS: Record<string, string[]> = {
  science: [
    'Never trust an atom — they make up everything!',
    'Conducting ourselves with positive energy today.',
    'Matter matters, but curiosity matters most.',
  ],
  maths: [
    "It's prime time to multiply our understanding!",
    'Things are about to get real (and rational).',
    'Geometry teachers have all the right angles.',
  ],
  english: [
    'A novel approach to prose, poetry, and punctuation.',
    'Comma take a look: grammar with genuine purpose.',
    'Plotting our way through literary brilliance.',
  ],
  history: [
    'Making history today — the past is about to catch up!',
    'Time travellers unite: uncovering primary evidence.',
    'No ancient history here, just timeless discoveries.',
  ],
  geography: [
    'Finding our bearings together across the map.',
    'Peak performance: scaling new topographic heights.',
    'Global perspectives with local relevance.',
  ],
  computing: [
    'Bits, bytes, and brilliant algorithmic thinking.',
    'Debugging misconceptions one line at a time.',
    'Keep calm and code on.',
  ],
};

const GENERAL_PUNS = [
  'Prepare to be schooled — in the best possible way!',
  'Ready to illuminate bright minds today.',
  'Curiosity unlocked: inquiry-led learning in progress.',
  'Pen to paper, thoughts in gear!',
];

export function generatePunSubtitle(subject = '', lessonTitle = ''): string {
  const normSubject = subject.toLowerCase().trim();
  for (const [key, puns] of Object.entries(SUBJECT_PUNS)) {
    if (normSubject.includes(key) || lessonTitle.toLowerCase().includes(key)) {
      const idx = Math.abs(lessonTitle.length) % puns.length;
      return puns[idx];
    }
  }
  const fallbackIdx = Math.abs(lessonTitle.length + subject.length) % GENERAL_PUNS.length;
  return GENERAL_PUNS[fallbackIdx];
}
