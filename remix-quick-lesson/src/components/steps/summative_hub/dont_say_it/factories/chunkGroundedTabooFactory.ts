import { SecretWordCard } from '../types/dontSayItTypes';
import { auditForbiddenWords } from './forbiddenWordMisconceptionEngine';

export interface LessonChunkInput {
  title?: string;
  notes?: string;
  content?: string;
}

export const extractTabooCardFromChunk = (
  chunk: LessonChunkInput,
  chunkIndex: number,
  lessonTitle: string
): SecretWordCard => {
  const targetTitle = chunk.title || `Concept ${chunkIndex + 1}`;
  const notesText = chunk.notes || chunk.content || lessonTitle;

  const matches = (notesText.match(/\b[A-Z][a-z]{3,}\b/g) || []) as string[];
  const candidateBanned = matches
    .filter((w: string) => w.toLowerCase() !== targetTitle.toLowerCase())
    .slice(0, 4);

  const audited = auditForbiddenWords(targetTitle, candidateBanned);

  return {
    id: `card-chunk-${chunkIndex}-${Date.now().toString(36)}`,
    targetWord: targetTitle,
    studentBannedWords: audited.bannedWords,
    aiFallbackBannedWords: audited.bannedWords,
    activeBannedWords: audited.bannedWords,
    chunkIndex,
    chunkTitle: targetTitle,
    hint: `Core concept from Section ${chunkIndex + 1}: ${targetTitle}`,
    bloomsLevel: chunkIndex % 2 === 0 ? 'Understand' : 'Analyse',
    misconceptionRationale: audited.rationale,
    difficulty: chunkIndex === 0 ? 'foundational' : chunkIndex === 1 ? 'core' : 'stretch',
  };
};

export const generateGroundedTabooDeck = async (
  lessonTitle: string,
  chunks: LessonChunkInput[] = [],
  onProgress?: (progressText: string, percentage: number) => void
): Promise<SecretWordCard[]> => {
  const activeChunks = chunks.length > 0 ? chunks : [
    { title: `${lessonTitle} - Key Definitions`, notes: 'Foundational facts and essential terminology' },
    { title: `${lessonTitle} - Core Mechanisms`, notes: 'Processes, rules, and cause-effect relationships' },
    { title: `${lessonTitle} - Practical Applications`, notes: 'Edge cases and problem-solving scenarios' },
  ];

  const deck: SecretWordCard[] = [];

  for (let i = 0; i < activeChunks.length; i++) {
    const chunk = activeChunks[i];
    onProgress?.(`Extracting Taboo Target Words for Section ${i + 1}: ${chunk.title}...`, Math.round(((i + 1) / activeChunks.length) * 100));
    await new Promise((res) => setTimeout(res, 120));
    deck.push(extractTabooCardFromChunk(chunk, i, lessonTitle));
  }

  return deck;
};
