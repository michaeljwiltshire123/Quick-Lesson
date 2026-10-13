export interface SpotlightStep {
  id: string;
  targetId: string;
  title: string;
  description: string;
  actionTip: string;
}

export const SPOTLIGHT_STEPS: SpotlightStep[] = [
  {
    id: 'brief',
    targetId: 'tour-course-brief-section',
    title: 'Syllabus & Module Brief',
    description:
      'Review your extracted syllabus brief here. Click "Reveal Brief" to inspect your vocational scenario, deliverables, and assessed criteria. You can edit them manually at any point.',
    actionTip: 'Click "Reveal Brief" to unfold the criteria, or click Next to proceed.',
  },
  {
    id: 'parameters',
    targetId: 'tour-lesson-parameters',
    title: "Today's Lesson Parameters",
    description:
      "Confirm your lesson title, subject classification, year group, and duration. All fields are completely editable so you can tailor them precisely to your timetable.",
    actionTip: 'Check each field and adjust any details to match your lesson.',
  },
  {
    id: 'aide-memoire',
    targetId: 'tour-aide-memoire',
    title: 'Aide-Mémoire',
    description:
      'Your uploaded materials, pinned notes, and reference videos live here. If you did not include everything earlier, you can link extra videos or jot quick prompts at any stage.',
    actionTip: 'Add supplementary video links or quick reference reminders here.',
  },
  {
    id: 'progression',
    targetId: 'tour-learning-progression',
    title: 'Learning Progression & Sequencing',
    description:
      'Click "Generate Sequence ✨" to break your lesson down into progressive conceptual milestones of what you plan to teach. You can reorder, delete, or add custom steps.',
    actionTip: 'Click "Generate Sequence" to draft conceptual lesson milestones.',
  },
  {
    id: 'suggestions',
    targetId: 'tour-progression-suggestions',
    title: 'AI Progression Suggestions',
    description:
      'Click "Generate Suggestions ✨" to discover supplementary curriculum subtopics and potential student stumbling blocks. Click any item to adopt it into your lesson objectives.',
    actionTip: 'Explore bespoke subtopics and click to add them directly.',
  },
];
