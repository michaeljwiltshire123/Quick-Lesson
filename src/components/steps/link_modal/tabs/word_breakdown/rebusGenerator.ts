import { WordBreakdownItem, RebusStyle } from './types';
import { RebusEntry, PHONETIC_DICT, CONCEPT_DICT } from './rebusDictionary';

const clean = (t: string) => (t || '').toLowerCase().replace(/[^a-z]/g, '');

export const getPhoneticRebus = (term: string, fallbackRebus?: string, fallbackHint?: string): RebusEntry => {
  if (fallbackRebus && fallbackRebus.includes('+') && !fallbackRebus.includes('=')) {
    return { rebus: fallbackRebus, hint: fallbackHint || 'Phonetic Syllable Clue' };
  }
  const str = clean(term);
  for (const [stem, entry] of Object.entries(PHONETIC_DICT)) {
    if (str.includes(stem)) return entry;
  }
  return { rebus: '💡 + 🎯', hint: `${term} Concept` };
};

export const getConceptualRebus = (term: string, fallbackRebus?: string, fallbackHint?: string): RebusEntry => {
  if (fallbackRebus && fallbackRebus.includes('=')) {
    return { rebus: fallbackRebus, hint: fallbackHint || 'Concept Story' };
  }
  const str = clean(term);
  for (const [stem, entry] of Object.entries(CONCEPT_DICT)) {
    if (str.includes(stem)) return entry;
  }
  return { rebus: '📖 + 💡 = 🎯', hint: 'Core Curriculum Concept' };
};

export const resolveRebus = (item: WordBreakdownItem, style: RebusStyle = 'phonetic'): RebusEntry => {
  if (style === 'conceptual') {
    return getConceptualRebus(item.term, item.conceptualRebus, item.conceptualHint);
  }
  return getPhoneticRebus(item.term, item.phoneticRebus || item.emojiRebus, item.phoneticHint);
};
