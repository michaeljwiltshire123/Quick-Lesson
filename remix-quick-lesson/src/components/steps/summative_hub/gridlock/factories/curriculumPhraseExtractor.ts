import { LessonChunk } from '../../../../../types';

export interface CurriculumPhrase {
  text: string;
  firstLetter: string;
  wordCount: number;
  chunkTitle: string;
  chunkIntent: string;
  anchorQuestion?: {
    letter: string;
    targetAnswer: string;
    prompt: string;
    acceptableAnswers: string[];
  };
}

const FORBIDDEN_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'your',
  'were', 'will', 'into', 'each', 'what', 'when', 'they', 'them', 'their',
  'how', 'why', 'who', 'some', 'about', 'skill', 'feeling', 'detail',
  'knowledge', 'remember', 'finalising', 'effort', 'everything', 'zone',
  'task', 'motion', 'direction', 'choice', 'creativity', 'being', 'making',
  'doing', 'using', 'helps', 'allow', 'learn', 'students', 'class', 'look',
  'good', 'part', 'time', 'also', 'such', 'like', 'many', 'more', 'most'
]);

function buildAnchor(phrase: string, chunkTitle: string): CurriculumPhrase['anchorQuestion'] | undefined {
  const words = phrase.trim().split(/\s+/);
  if (words.length < 2) return undefined;
  const lastWord = words[words.length - 1];
  const firstLetter = lastWord[0].toUpperCase();
  const leading = words.slice(0, -1).join(' ');
  return {
    letter: firstLetter,
    targetAnswer: lastWord,
    prompt: `What '${firstLetter}' completes the ${chunkTitle} term: ${leading} ${firstLetter}... ?`,
    acceptableAnswers: [
      lastWord.toLowerCase(),
      phrase.toLowerCase(),
      lastWord,
      phrase,
    ],
  };
}

export function extractCurriculumPhrases(lessonTitle: string, chunks: LessonChunk[] = []): CurriculumPhrase[] {
  const results: CurriculumPhrase[] = [];
  const seen = new Set<string>();

  const processChunk = (chunk: LessonChunk) => {
    const raw = `${chunk.title || ''}. ${chunk.learningIntent || ''}. ${chunk.coreExplanation || ''}`;
    const clean = raw.replace(/[^\w\s-]/g, ' ');
    const tokens = clean.split(/\s+/).filter((t) => t.length > 2);

    for (let i = 0; i < tokens.length; i++) {
      const w1 = tokens[i];
      const w2 = tokens[i + 1];
      const lower1 = w1.toLowerCase();

      // 2-word phrase anchor extraction
      if (w2 && !FORBIDDEN_WORDS.has(lower1) && !FORBIDDEN_WORDS.has(w2.toLowerCase())) {
        const p2 = `${w1.charAt(0).toUpperCase() + w1.slice(1).toLowerCase()} ${w2.charAt(0).toUpperCase() + w2.slice(1).toLowerCase()}`;
        if (!seen.has(p2.toLowerCase())) {
          seen.add(p2.toLowerCase());
          results.push({
            text: p2,
            firstLetter: p2[0].toUpperCase(),
            wordCount: 2,
            chunkTitle: chunk.title || lessonTitle,
            chunkIntent: chunk.learningIntent || '',
            anchorQuestion: buildAnchor(p2, chunk.title || lessonTitle),
          });
        }
      }

      // Single technical keyword extraction
      if (w1.length >= 4 && !FORBIDDEN_WORDS.has(lower1) && !seen.has(lower1)) {
        seen.add(lower1);
        const term = w1.charAt(0).toUpperCase() + w1.slice(1).toLowerCase();
        results.push({
          text: term,
          firstLetter: term[0].toUpperCase(),
          wordCount: 1,
          chunkTitle: chunk.title || lessonTitle,
          chunkIntent: chunk.learningIntent || '',
        });
      }
    }
  };

  chunks.forEach(processChunk);
  return results;
}
