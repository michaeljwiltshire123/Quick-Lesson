import { useState, useEffect } from 'react';
import { DiscussionStarterCard } from '../types/starterCard';
import { DiscussionStarterFormatType } from '../types/starterTypes';
import { generateDiscussionStartersForChunk } from '../services/starterGeneratorService';
import { autoSuggestAndAttachStarters } from '../services/autoSuggestEngine';
import { extractStartersFromChunks } from '../services/extractStartersFromChunks';
import { LessonChunk } from '../../../types';

export function useStep5Starters(
  lessonTitle: string,
  subject: string,
  activeChunk: LessonChunk,
  allChunks: LessonChunk[],
  onSaveToLessonChunks?: (starters: DiscussionStarterCard[]) => void
) {
  // Single Master Storage (Central Vault): read directly from lesson chunks first
  const [starters, setStarters] = useState<DiscussionStarterCard[]>(() => {
    return extractStartersFromChunks(allChunks);
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Keep starter edits in lesson chunk state; avoid a cross-lesson browser cache.
  useEffect(() => {
    onSaveToLessonChunks?.(starters);
  }, [starters]);

  const handleBatchGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await Promise.all(allChunks.map((chunk) => generateDiscussionStartersForChunk({
        lessonTitle, subject, chunkId: chunk.id, chunkTitle: chunk.title,
        lessonNotes: chunk.classroomNotes || chunk.learningIntent,
      })));
      const replaced = new Set(allChunks.map((chunk) => chunk.id));
      setStarters([...generated.flat(), ...starters.filter((card) => !replaced.has(card.conceptId))]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefreshCategory = async (fmt: DiscussionStarterFormatType) => {
    setIsGenerating(true);
    try {
      const generated = await generateDiscussionStartersForChunk({
        lessonTitle,
        subject,
        chunkId: activeChunk.id,
        chunkTitle: activeChunk.title,
        formatType: fmt,
        lessonNotes: activeChunk.classroomNotes || activeChunk.learningIntent,
      });
      const keptStarters = starters.filter((s) => !(s.conceptId === activeChunk.id && s.formatType === fmt));
      setStarters([...generated, ...keptStarters]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAutoSuggest = () => {
    const updated = autoSuggestAndAttachStarters(starters, allChunks);
    setStarters(updated);
  };

  const handleToggleAttach = (cardId: string, chunkId: string) => {
    setStarters(starters.map((s) => (s.id === cardId ? { ...s, milestoneChunkId: s.milestoneChunkId === chunkId ? '' : chunkId } : s)));
  };

  const handleDeleteCard = (cardId: string) => setStarters(starters.filter((s) => s.id !== cardId));
  const handleUpdateCard = (updated: DiscussionStarterCard) => setStarters(starters.map((s) => (s.id === updated.id ? updated : s)));
  const handleAddCard = (newCard: DiscussionStarterCard) => setStarters([newCard, ...starters]);

  return {
    starters,
    isGenerating,
    handleBatchGenerate,
    handleRefreshCategory,
    handleAutoSuggest,
    handleToggleAttach,
    handleDeleteCard,
    handleUpdateCard,
    handleAddCard,
  };
}
