import React, { useState } from 'react';
import { LessonChunk, ChunkAttachment } from '../../../../../types';
import { LimerickFormState, LimerickItem } from './types';
import { LimerickForm } from './LimerickForm';
import { LimerickGrid } from './LimerickGrid';
import { generateLimerickOptionsApi } from './limerickGenerator';
import { LimerickWhiteboardSyncBadge } from './LimerickWhiteboardSyncBadge';

interface Props {
  activeChunk?: LessonChunk;
  slideTitle?: string;
  subject?: string;
  gradeLevel?: string;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
}

export const LimerickTabContainer: React.FC<Props> = ({ activeChunk, slideTitle, subject, gradeLevel, onAddAttachment }) => {
  const [formState, setFormState] = useState<LimerickFormState>({
    concept: activeChunk?.title || slideTitle || '',
    takeawayGoal: '',
    mnemonic: '',
    style: 'limerick'
  });

  const [generating, setGenerating] = useState(false);
  const [items, setItems] = useState<LimerickItem[]>([]);
  const [isAttachedSync, setIsAttachedSync] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    const results = await generateLimerickOptionsApi(formState, subject, gradeLevel);
    setItems(results);
    setGenerating(false);
  };

  const handleSelect = (id: string) => {
    setItems(items.map(it => it.id === id ? { ...it, selected: !it.selected } : it));
  };

  const handleAttach = (item: LimerickItem) => {
    onAddAttachment?.({
      id: `att-lim-${Date.now()}`,
      name: `${item.title} (${item.style})`,
      type: 'document',
      platform: 'other',
      udlPathway: 'auditory'
    });
  };

  const handleAttachAllSelected = () => {
    items.filter(it => it.selected).forEach(it => handleAttach(it));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-6">
      <LimerickForm formState={formState} onChange={setFormState} onGenerate={handleGenerate} generating={generating} />
      {items.length > 0 && (
        <>
          <LimerickWhiteboardSyncBadge
            isAttached={isAttachedSync}
            verses={items}
            onToggleAttach={setIsAttachedSync}
            slideTitle={slideTitle || formState.concept}
          />
          <LimerickGrid items={items} onSelect={handleSelect} onAttach={handleAttach} onAttachAllSelected={handleAttachAllSelected} />
        </>
      )}
    </div>
  );
};
