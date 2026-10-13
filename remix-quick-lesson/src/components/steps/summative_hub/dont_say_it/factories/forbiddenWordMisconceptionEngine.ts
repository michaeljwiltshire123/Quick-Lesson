import { SecretWordCard } from '../types/dontSayItTypes';

export interface MisconceptionRule {
  targetKeyword: string;
  recommendedBannedWords: string[];
  rationale: string;
}

const COMMON_SCIENCE_MISCONCEPTIONS: MisconceptionRule[] = [
  {
    targetKeyword: 'respiration',
    recommendedBannedWords: ['Breathing', 'Lungs', 'Oxygen', 'Energy'],
    rationale: 'Pupils frequently confuse cellular respiration with mechanical breathing/ventilation in lungs.',
  },
  {
    targetKeyword: 'photosynthesis',
    recommendedBannedWords: ['Sunlight', 'Chlorophyll', 'Plant', 'Glucose'],
    rationale: 'Pupils mistake sunlight for a physical reactant rather than a light energy source for reaction.',
  },
  {
    targetKeyword: 'evaporation',
    recommendedBannedWords: ['Boiling', 'Heat', 'Steam', 'Gas'],
    rationale: 'Pupils believe liquids only evaporate at 100°C boiling point rather than at surface room temperatures.',
  },
];

export const auditForbiddenWords = (targetWord: string, candidateBanned: string[]): {
  bannedWords: string[];
  rationale: string;
} => {
  const normalized = targetWord.toLowerCase().trim();
  const matchedRule = COMMON_SCIENCE_MISCONCEPTIONS.find((rule) => normalized.includes(rule.targetKeyword));

  if (matchedRule) {
    return {
      bannedWords: matchedRule.recommendedBannedWords,
      rationale: matchedRule.rationale,
    };
  }

  const sanitizedBanned = candidateBanned.filter((w) => w && w.length > 2).slice(0, 4);

  return {
    bannedWords: sanitizedBanned.length >= 3 ? sanitizedBanned : ['Concept', 'Process', 'System', 'Function'],
    rationale: `Banned terms target core scientific vocabulary & key mechanisms of ${targetWord} to prevent easy verbal shortcuts.`,
  };
};
