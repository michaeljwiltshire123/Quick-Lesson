import React, { useState, useEffect } from 'react';
import { LessonChunk } from '../../../types';
import { DiscussionStarterCard } from '../types/starterCard';
import { DiscussionStarterFormatType } from '../types/starterTypes';
import { FormatFilterPills } from './FormatFilterPills';
import { BatchGenerateButton } from './BatchGenerateButton';
import { AutoSuggestButton } from './AutoSuggestButton';
import { BottomAddCustomCardButton } from './BottomAddCustomCardButton';
import { StarterConceptCard } from './cards/StarterConceptCard';
import { MessageSquare } from 'lucide-react';

interface StarterPoolColumnProps {
  activeChunk: LessonChunk;
  starters: DiscussionStarterCard[];
  highlightedCardId?: string | null;
  selectedFilter: DiscussionStarterFormatType;
  onSelectFilter: (fmt: DiscussionStarterFormatType) => void;
  onUpdateCard: (updated: DiscussionStarterCard) => void;
  onAddCard: (newCard: DiscussionStarterCard) => void;
  onToggleAttach: (cardId: string, chunkId: string) => void;
  onDeleteCard: (cardId: string) => void;
  onBatchGenerate: () => void;
  onRefreshCategory?: (formatType: DiscussionStarterFormatType) => void;
  onAutoSuggest: () => void;
  isGenerating: boolean;
}

export const StarterPoolColumn: React.FC<StarterPoolColumnProps> = ({
  activeChunk,
  starters,
  highlightedCardId,
  selectedFilter,
  onSelectFilter,
  onUpdateCard,
  onAddCard,
  onToggleAttach,
  onDeleteCard,
  onBatchGenerate,
  onRefreshCategory,
  onAutoSuggest,
  isGenerating,
}) => {
  const chunkStarters = starters.filter((c) => c.conceptId === activeChunk.id);

  const counts = chunkStarters.reduce((acc, card) => {
    acc[card.formatType] = (acc[card.formatType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filtered = chunkStarters.filter((s) => s.formatType === selectedFilter);
  const hasGeneratedStarters = starters.length > 0;

  const handleAddNew = () => {
    onAddCard({
      id: `custom-${Date.now()}`,
      conceptId: activeChunk.id,
      milestoneChunkId: '',
      formatType: selectedFilter,
      promptText: 'Type your diagnostic discussion prompt here...',
      misconceptionWarning: 'Note common student error to watch for...',
      teacherDeliveryLine: 'Classroom delivery instruction...',
    });
  };

  const filterLabels: Record<DiscussionStarterFormatType, string> = {
    true_false: 'True / False',
    forced_dichotomy: 'Forced Choice',
    paradox: 'Paradox',
    would_you_rather: 'Would You Rather',
    predict_disaster: 'Predict Disaster',
    finger_scale: 'Finger Scale (1-10)',
    socratic_tension: 'Socratic Tension',
  };

  return (
    <div className="bg-white border border-[#2D2A26]/10 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-3 pb-5 border-b border-[#2D2A26]/10">
        <AutoSuggestButton onAutoSuggest={onAutoSuggest} disabled={!hasGeneratedStarters || isGenerating} />
        <BatchGenerateButton onBatchGenerate={onBatchGenerate} isGenerating={isGenerating} />
      </div>

      <FormatFilterPills
        selectedFilter={selectedFilter}
        onSelectFilter={onSelectFilter}
        counts={counts}
        onRefreshCategory={onRefreshCategory}
        isGenerating={isGenerating}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-[#F8F6F0]/60 rounded-2xl border-2 border-dashed border-[#2D2A26]/15 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 text-[#D97706] flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-[#2D2A26] text-base">No discussion starters in this category</h4>
          <p className="text-[#2D2A26]/60 text-sm max-w-md mx-auto">
            Click <span className="font-semibold text-[#2D2A26]">"Batch Generate Verbal Sparks ✨"</span> above or use <span className="font-semibold text-[#2D2A26]">"Refresh Category"</span> to generate questions for <span className="font-semibold text-[#2D2A26]">{activeChunk.title}</span>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((card) => (
            <StarterConceptCard
              key={card.id}
              card={card}
              activeChunkId={activeChunk.id}
              isHighlighted={highlightedCardId === card.id}
              onUpdateCard={onUpdateCard}
              onToggleAttach={onToggleAttach}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </div>
      )}

      <BottomAddCustomCardButton onAddNew={handleAddNew} filterLabel={filterLabels[selectedFilter]} />
    </div>
  );
};
