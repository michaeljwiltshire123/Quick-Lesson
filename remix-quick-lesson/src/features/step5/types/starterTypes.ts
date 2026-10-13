export type DiscussionStarterFormatType =
  | 'true_false'
  | 'forced_dichotomy'
  | 'paradox'
  | 'would_you_rather'
  | 'predict_disaster'
  | 'finger_scale'
  | 'socratic_tension';

export interface DiscussionStarterCategoryMeta {
  type: DiscussionStarterFormatType;
  title: string;
  description: string;
  badgeColor: string;
}

export const STARTER_CATEGORY_METADATA: Record<DiscussionStarterFormatType, DiscussionStarterCategoryMeta> = {
  true_false: {
    type: 'true_false',
    title: 'True or False',
    description: 'Subtle, real-world misconceptions testing foundational principles.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  forced_dichotomy: {
    type: 'forced_dichotomy',
    title: 'Forced Dichotomy',
    description: 'Two opposing higher-order claims with no single right answer.',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  paradox: {
    type: 'paradox',
    title: 'Paradox',
    description: 'Thought experiments and logical conundrums fitting the topic.',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  would_you_rather: {
    type: 'would_you_rather',
    title: 'Would You Rather',
    description: 'Choice between two difficult constraints tied directly to the concept.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  predict_disaster: {
    type: 'predict_disaster',
    title: 'Predict the Disaster',
    description: 'Hypothetical scenario where a common misconception causes failure.',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  finger_scale: {
    type: 'finger_scale',
    title: '1-10 Finger Scale',
    description: 'Quick gauge for instant classroom confidence voting.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  socratic_tension: {
    type: 'socratic_tension',
    title: 'Socratic Tension',
    description: 'Two competing expert claims to spark immediate student argument.',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
};
