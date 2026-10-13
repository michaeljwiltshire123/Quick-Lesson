import { SummativeQuizQuestion } from './typesSummativeQuiz';

export const DEFAULT_QUIZ_QUESTIONS: SummativeQuizQuestion[] = [
  {
    id: 'q-1',
    questionNumber: 1,
    prompt: 'What is the primary objective of formative assessment during a design sprint?',
    choices: ['Summative grading', 'Iterative diagnostic feedback', 'Final compliance audit', 'Budget allocation'],
    correctChoiceIndex: 1,
    explanation: 'Formative assessment provides actionable feedback to guide student iteration while work is in progress.',
  },
  {
    id: 'q-2',
    questionNumber: 2,
    prompt: 'When evaluating media credibility, which criterion assesses authorial bias?',
    choices: ['Typography styling', 'Publisher reputation and peer review', 'Loading speed', 'Domain suffix length'],
    correctChoiceIndex: 1,
    explanation: 'Publisher reputation and editorial oversight directly indicate academic rigor and bias mitigation.',
  },
  {
    id: 'q-3',
    questionNumber: 3,
    prompt: 'Which protocol ensures accessible digital design for visually impaired users?',
    choices: ['High contrast text and ARIA labels', 'Flashing warning banners', 'Complex font nesting', 'Autoplay audio elements'],
    correctChoiceIndex: 0,
    explanation: 'High contrast and ARIA accessibility markup ensure screen readers and visually impaired users can navigate effectively.',
  },
];
