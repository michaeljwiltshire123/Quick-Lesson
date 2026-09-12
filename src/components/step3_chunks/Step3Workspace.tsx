import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LessonChunk, ChunkAttachment, ModuleScheme } from '../../types';
import { ChunksTimeline } from './ChunksTimeline';
import { Step3ResourceModals } from './Step3ResourceModals';
import { splitChunk, mergeChunks, insertChunkAt, deleteChunk, moveChunkUp, moveChunkDown } from './utils/timelineActions';
import { Step3Stepper } from './Step3Stepper';
import { useChunkBatchGenerator } from './hooks/useChunkBatchGenerator';

export interface Step3WorkspaceProps {
  chunks: LessonChunk[]; onUpdateChunks: (chunks: LessonChunk[]) => void; onBack: () => void;
  lessonTitle?: string; subject?: string; gradeLevel?: string; themeNotes?: string; moduleScheme?: ModuleScheme;
}

export const Step3Workspace: React.FC<Step3WorkspaceProps> = ({
  chunks, onUpdateChunks, onBack, lessonTitle = '', subject = '', gradeLevel = '', themeNotes = '', moduleScheme,
}) => {
  const defaultInitialId = chunks.find((c) => c.type === 'teaching')?.id || chunks[0]?.id || '';
  const [activeChunkId, setActiveChunkId] = useState<string>(defaultInitialId);
  const [isVisualOpen, setIsVisualOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    if (!chunks.some((c) => c.id === activeChunkId) && chunks.length > 0) {
      setActiveChunkId(chunks.find((c) => c.type === 'teaching')?.id || chunks[0].id);
    }
  }, [chunks, activeChunkId]);

  const activeChunk = chunks.find((c) => c.id === activeChunkId) || chunks.find((c) => c.type === 'teaching') || chunks[0];

  const handleUpdateSingleChunk = (updated: LessonChunk) => {
    onUpdateChunks(chunks.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleAddAttachment = (partial: Partial<ChunkAttachment>) => {
    if (!activeChunk) return;
    const newAtt: ChunkAttachment = {
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: partial.name || 'Resource', type: partial.type || 'quiz', ...partial,
    };
    onUpdateChunks(chunks.map((c) => (c.id === activeChunk.id ? { ...activeChunk, attachments: [...(activeChunk.attachments || []), newAtt] } : c)));
  };

  const handleRemoveAttachment = (attId: string) => {
    if (!activeChunk) return;
    onUpdateChunks(chunks.map((c) => (c.id === activeChunk.id ? { ...activeChunk, attachments: (activeChunk.attachments || []).filter((a) => a.id !== attId) } : c)));
  };

  useChunkBatchGenerator({ chunks, lessonTitle, subject, gradeLevel, themeNotes, moduleScheme, onUpdateSingleChunk: handleUpdateSingleChunk });

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6" id="step3-workspace-container">
      <Step3Stepper />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#2D2A26]/10 rounded-2xl p-5 shadow-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/20">Step 3: Chunks Workspace</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#2D2A26] mt-1.5">{lessonTitle ? `Storyboard: ${lessonTitle}` : 'Lesson Progression'}</h2>
        </div>
      </div>

      <div className="w-full">
        <ChunksTimeline
          chunks={chunks} activeChunkId={activeChunkId} onSelectChunk={setActiveChunkId} onUpdateSingleChunk={handleUpdateSingleChunk}
          onSplit={(id) => onUpdateChunks(splitChunk(chunks, id))} onMerge={(id) => onUpdateChunks(mergeChunks(chunks, id))} onInsert={(id) => onUpdateChunks(insertChunkAt(chunks, id))}
          onDelete={(id) => { const next = deleteChunk(chunks, id); onUpdateChunks(next); if (activeChunkId === id && next.length > 0) setActiveChunkId(next[0].id); }}
          onMoveUp={(id) => onUpdateChunks(moveChunkUp(chunks, id))} onMoveDown={(id) => onUpdateChunks(moveChunkDown(chunks, id))}
          onOpenVisualModal={() => setIsVisualOpen(true)} onOpenVideoModal={() => setIsVideoOpen(true)} onOpenQuizModal={() => setIsQuizOpen(true)}
          lessonTitle={lessonTitle} subject={subject} gradeLevel={gradeLevel} themeNotes={themeNotes} moduleScheme={moduleScheme}
        />
      </div>

      <Step3ResourceModals isVisualOpen={isVisualOpen} isVideoOpen={isVideoOpen} isQuizOpen={isQuizOpen} onCloseVisual={() => setIsVisualOpen(false)} onCloseVideo={() => setIsVideoOpen(false)} onCloseQuiz={() => setIsQuizOpen(false)} activeChunk={activeChunk} lessonTitle={lessonTitle} subject={subject} gradeLevel={gradeLevel} themeNotes={themeNotes} moduleScheme={moduleScheme} onAddAttachment={handleAddAttachment} onRemoveAttachment={handleRemoveAttachment} onUpdateSingleChunk={handleUpdateSingleChunk} />

      <footer className="w-full bg-[#F8F6F0] pt-4 pb-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
        <button type="button" onClick={onBack} className="px-5 py-2.5 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] text-xs font-bold rounded-xl border border-[#2D2A26]/20 shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-98">
          <ArrowLeft className="w-4 h-4" /><span>← Back to Parameters Workspace</span>
        </button>
      </footer>
    </div>
  );
};
