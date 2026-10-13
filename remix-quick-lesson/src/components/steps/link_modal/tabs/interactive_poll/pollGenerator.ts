import { PollOption, PollSuggestion, PollType } from './types';

export const DEFAULT_OPTIONS_FOR_TYPE: Record<PollType, string[]> = {
  [PollType.Single]: ['Core foundational mechanism', 'Common alternate hypothesis', 'Unverified variable', 'Misconceived outcome'],
  [PollType.Multi]: ['Key criterion A', 'Supporting evidence B', 'Secondary outcome C', 'Distractor factor D'],
  [PollType.Likert]: ['1 - Strongly Disagree', '2 - Disagree', '3 - Neutral', '4 - Agree', '5 - Strongly Agree'],
  [PollType.Ranking]: ['Step 1: Baseline Assessment', 'Step 2: Methodological Application', 'Step 3: Critical Evaluation'],
  [PollType.Open]: [],
  [PollType.Image]: ['Diagram A: Primary structure', 'Diagram B: Counter-example', 'Diagram C: Operational flow'],
  [PollType.Wordcloud]: [],
};

export async function fetchPollSuggestions(
  conceptTitle: string,
  subject?: string,
  gradeLevel?: string
): Promise<PollSuggestion[]> {
  const title = conceptTitle.trim() || 'Core Concept';
  try {
    const res = await fetch('/api/generate-lesson-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'pivot_questions',
        chunkTitle: title,
        subject: subject || 'General Curriculum',
        gradeLevel: gradeLevel || 'Key Stage 4',
      }),
    });
    const data = await res.json();
    if (Array.isArray(data?.questions) && data.questions.length > 0) {
      return data.questions.slice(0, 4).map((q: { id?: string; question?: string; answer?: string }, idx: number) => {
        const pType = idx === 0 ? PollType.Single : idx === 1 ? PollType.Likert : idx === 2 ? PollType.Ranking : PollType.Wordcloud;
        return {
          id: q.id || `sugg-${idx}`,
          question: q.question || `Diagnostic check for ${title}`,
          pollType: pType,
          options: DEFAULT_OPTIONS_FOR_TYPE[pType],
          misconceptionExplainer: q.answer ? `Clarification: ${q.answer}` : `Addresses common misconceptions regarding ${title}.`,
        };
      });
    }
  } catch {
    // Graceful fallback to client suggestions
  }

  return [
    {
      id: 'f1', question: `Which statement best captures the underlying mechanism of ${title}?`,
      pollType: PollType.Single, options: ['Direct causation', 'Observable correlation', 'External condition', 'Secondary artefact'],
      misconceptionExplainer: `Pupils frequently confuse correlation with foundational causation when analysing ${title}.`,
    },
    {
      id: 'f2', question: `Rate your confidence in explaining the key stages of ${title} without looking at notes:`,
      pollType: PollType.Likert, options: DEFAULT_OPTIONS_FOR_TYPE[PollType.Likert],
      misconceptionExplainer: `Gauges pupil self-efficacy before transitioning to independent problem-solving.`,
    },
    {
      id: 'f3', question: `Rank the operational sequence of ${title} in priority order:`,
      pollType: PollType.Ranking, options: [`1. Baseline assessment`, `2. Parameter execution`, `3. Critical validation`],
      misconceptionExplainer: `Ensures procedural fluency and chronological precision in pupil reasoning.`,
    },
    {
      id: 'f4', question: `Submit one crucial keyword that defines ${title} in practice:`,
      pollType: PollType.Wordcloud, options: [],
      misconceptionExplainer: `Highlights vocabulary gaps and immediate conceptual consensus across the cohort.`,
    },
  ];
}

export function createDefaultOptions(type: PollType): PollOption[] {
  const texts = DEFAULT_OPTIONS_FOR_TYPE[type] || [];
  return texts.map((text, i) => ({ id: `opt-${Date.now()}-${i}`, text }));
}
