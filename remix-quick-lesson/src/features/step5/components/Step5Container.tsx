import React, { useState } from 'react';
import { Step5Header } from './Step5Header';
import { ChunkListColumn } from './ChunkListColumn';
import { StarterPoolColumn } from './StarterPoolColumn';
import { Step5FooterNav } from './Step5FooterNav';
import { Step5ToStep6Navigation } from './Step5ToStep6Navigation';
import { useStep5Starters } from '../hooks/useStep5Starters';
import { syncStartersToLessonChunks } from '../services/syncStartersToChunks';
import { DiscussionStarterFormatType } from '../types/starterTypes';
import { Step3Stepper } from '../../../components/step3_chunks/Step3Stepper';
import { LessonChunk } from '../../../types';

interface Step5ContainerProps {
  lessonTitle?: string;
  subject?: string;
  chunks?: LessonChunk[];
  onUpdateChunks?: (chunks: LessonChunk[]) => void;
  onBack?: () => void;
  onContinue?: () => void;
}

export const Step5Container: React.FC<Step5ContainerProps> = ({
  lessonTitle = 'Active Lesson', subject = 'General', chunks = [], onUpdateChunks, onBack, onContinue,
}) => {
  const filtered = chunks.length > 0 ? chunks.filter((c) => c.type !== 'warmup' && c.type !== 'closing') : [];
  const activeChunks = filtered.length > 0 ? filtered : [
    { id: 'chunk-1', type: 'teaching' as const, title: 'Introduction & Core Principles', durationMinutes: 15 },
    { id: 'chunk-2', type: 'teaching' as const, title: 'Applied Analysis & Practice', durationMinutes: 20 },
  ];

  const [activeChunkId, setActiveChunkId] = useState<string>(activeChunks[0]?.id || 'chunk-1');
  const [selectedFilter, setSelectedFilter] = useState<DiscussionStarterFormatType>('true_false');
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const [inspectIndexMap, setInspectIndexMap] = useState<Record<string, number>>({});
  const [isSyncing, setIsSyncing] = useState(false);

  const activeChunk = activeChunks.find((c) => c.id === activeChunkId) || activeChunks[0];

  const handleLiveSave = (latest: any[]) => {
    if (onUpdateChunks) onUpdateChunks(syncStartersToLessonChunks(chunks.length > 0 ? chunks : activeChunks, latest));
  };

  const {
    starters, isGenerating, handleBatchGenerate, handleRefreshCategory,
    handleAutoSuggest, handleToggleAttach, handleDeleteCard, handleUpdateCard, handleAddCard,
  } = useStep5Starters(lessonTitle, subject, activeChunk, activeChunks, handleLiveSave);

  const starterCounts = starters.reduce((acc, card) => {
    if (card.milestoneChunkId) acc[card.milestoneChunkId] = (acc[card.milestoneChunkId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleInspectActiveSparks = (chunkId: string) => {
    setActiveChunkId(chunkId);
    const attached = starters.filter((s) => s.milestoneChunkId === chunkId);
    if (attached.length === 0) return;
    const cur = inspectIndexMap[chunkId] || 0;
    setInspectIndexMap({ ...inspectIndexMap, [chunkId]: (cur + 1) % attached.length });
    const target = attached[cur % attached.length];
    if (target) { setSelectedFilter(target.formatType); setHighlightedCardId(target.id); }
  };

  const handleSafeContinue = () => {
    setIsSyncing(true);
    onUpdateChunks?.(syncStartersToLessonChunks(chunks.length > 0 ? chunks : activeChunks, starters));
    setIsSyncing(false);
    onContinue?.();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <Step3Stepper currentStep={5} />
      <Step5Header lessonTitle={lessonTitle} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <ChunkListColumn chunks={activeChunks} activeChunkId={activeChunkId} onSelectChunk={(id) => { setActiveChunkId(id); setHighlightedCardId(null); }} starterCounts={starterCounts} onInspectActiveSparks={handleInspectActiveSparks} />
        </div>
        <div className="lg:col-span-8">
          <StarterPoolColumn activeChunk={activeChunk} starters={starters} selectedFilter={selectedFilter} onSelectFilter={(fmt) => { setSelectedFilter(fmt); setHighlightedCardId(null); }} highlightedCardId={highlightedCardId} onUpdateCard={handleUpdateCard} onAddCard={handleAddCard} onToggleAttach={handleToggleAttach} onDeleteCard={handleDeleteCard} onBatchGenerate={handleBatchGenerate} onRefreshCategory={handleRefreshCategory} onAutoSuggest={handleAutoSuggest} isGenerating={isGenerating} />
        </div>
      </div>
      <Step5ToStep6Navigation onContinueToStep6={handleSafeContinue} isSyncing={isSyncing} />
      <Step5FooterNav onBack={onBack} onContinue={handleSafeContinue} isSyncing={isSyncing} showContinue={false} />
    </div>
  );
};
