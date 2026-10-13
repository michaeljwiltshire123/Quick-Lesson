import { LadderRungQuestion } from '../typesLadder';

export const BACKUP_SWAP_QUESTIONS: Omit<LadderRungQuestion, 'id' | 'pointValue' | 'rungNumber'>[] = [
  {
    prompt: 'During rapid iterative testing of an educational prototype, what provides the most actionable teacher feedback?',
    choices: [
      'Direct classroom observation of pupil engagement and misconception rates',
      'Assuming all pupils understand without checking formative indicators',
      'Disregarding pupil pacing data and rushing through curriculum points',
      'Relying solely on delayed end-of-term summative reports'
    ],
    correctChoiceIndex: 0,
    explanation: 'Direct classroom observation highlights instant engagement and immediate misconception patterns for real-time pedagogical adjustments.',
    timerSeconds: 20,
    isSafetyNet: false,
    presenterIntro: 'A fresh challenge has arrived! Let us test your diagnostic observation skills!'
  },
  {
    prompt: 'When scaffolding complex tasks for mixed-ability learners, which strategy ensures optimal cognitive load balance?',
    choices: [
      'Chunking content into step-by-step milestones with explicit success criteria',
      'Presenting all multi-step instructions simultaneously without visual aids',
      'Eliminating foundational checks and skipping straight to mastery tests',
      'Forbidding peer discussion and collaborative clarification'
    ],
    correctChoiceIndex: 0,
    explanation: 'Breaking tasks into focused, bite-sized instructional chunks prevents cognitive overload and reinforces sustained understanding.',
    timerSeconds: 20,
    isSafetyNet: false,
    presenterIntro: 'Alternative challenge activated! Let us examine scaffolding techniques!'
  },
  {
    prompt: 'A lesson plan review reveals high pupil anxiety during high-stakes questioning. How should the structure adapt?',
    choices: [
      'Introduce safe-fail checkpoints and low-stakes diagnostic polling',
      'Increase penalisation for initial mistakes to enforce concentration',
      'Remove explanation cards and answer reveal discussions entirely',
      'Shorten response timers to force hasty, unconsidered guesses'
    ],
    correctChoiceIndex: 0,
    explanation: 'Safe-fail checkpoints, such as guaranteed safety nets and formative opinion polls, foster psychological safety and risk-taking in learning.',
    timerSeconds: 20,
    isSafetyNet: false,
    presenterIntro: 'Swapped challenge live! How do we cultivate psychological safety in learning?'
  },
  {
    prompt: 'Which visual representation method is most effective when clarifying abstract conceptual relationships for pupils?',
    choices: [
      'Structured comparative diagrams and dual-coded graphic organisers',
      'Dense unformatted walls of monochrome text without headings',
      'Uncaptioned decorative graphics with no curriculum relevance',
      'Ambiguous symbols that lack clear labels or legend references'
    ],
    correctChoiceIndex: 0,
    explanation: 'Dual-coded graphics and comparative diagrams link visual models to verbal explanations, reinforcing deep conceptual schema.',
    timerSeconds: 20,
    isSafetyNet: false,
    presenterIntro: 'New question unlocked! How do we best illustrate abstract concepts?'
  },
  {
    prompt: 'When analysing real-time formative assessment metrics, what indicates a critical concept misconception across the cohort?',
    choices: [
      'A uniform cluster of pupils selecting the exact same distractor choice',
      'Every pupil immediately selecting the correct answer on the first second',
      'Varying completion speeds with 100% first-time accuracy across rungs',
      'Random distributed clicks showing no discernible pattern or trend'
    ],
    correctChoiceIndex: 0,
    explanation: 'When pupils converge on a specific plausible distractor, it signifies an underlying conceptual misconception rather than a random guess.',
    timerSeconds: 20,
    isSafetyNet: false,
    presenterIntro: 'Fresh alternative question! Spotting cohort-wide misconception indicators!'
  },
  {
    prompt: 'To maximise retrieval strength at the start of a lesson starter, what is the recommended questioning technique?',
    choices: [
      'Spaced retrieval questions that connect prior knowledge to the new objective',
      'Quizzing only on unfamiliar vocabulary that has not yet been taught',
      'Allowing open textbooks for immediate verbatim copying without thinking',
      'Relying strictly on rhetorical questions without pupil response retrieval'
    ],
    correctChoiceIndex: 0,
    explanation: 'Spaced retrieval strengthens neural recall pathways and primes pupil working memory for new incoming curriculum material.',
    timerSeconds: 20,
    isSafetyNet: false,
    presenterIntro: 'Swap complete! Let us test your knowledge of effective retrieval practice!'
  }
];
