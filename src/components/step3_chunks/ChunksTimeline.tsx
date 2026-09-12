import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Scissors, Merge, Trash2 } from 'lucide-react';
import { LessonChunk, ModuleScheme } from '../../types';
import { TeachingChunkCard } from './TeachingChunkCard';
import { WarmupClosingCard } from './WarmupClosingCard';
import { ClassroomActionSlate } from './components/ClassroomActionSlate';
import { FormativeActivitiesModal } from './FormativeActivitiesModal';
import { CheckQuestionModal } from './components/CheckQuestionModal';

interface ChunksTimelineProps {
  chunks: LessonChunk[]; activeChunkId: string | null; onSelectChunk: (id: string) => void;
  onUpdateSingleChunk: (updated: LessonChunk) => void; onSplit: (id: string) => void; onMerge: (id: string) => void;
  onInsert: (id: string) => void; onDelete: (id: string) => void; onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void; onOpenVisualModal: () => void; onOpenVideoModal: () => void;
  onOpenQuizModal: () => void;
  lessonTitle?: string; subject?: string; gradeLevel?: string; themeNotes?: string; moduleScheme?: ModuleScheme;
}

export const ChunksTimeline: React.FC<ChunksTimelineProps> = ({
  chunks, activeChunkId, onSelectChunk, onUpdateSingleChunk, onSplit, onMerge, onInsert,
  onDelete, onMoveUp, onMoveDown, onOpenVisualModal, onOpenVideoModal, onOpenQuizModal,
  lessonTitle, subject, gradeLevel, themeNotes, moduleScheme,
}) => {
  const [isFormativeOpen, setIsFormativeOpen] = useState(false);
  const [isCheckOpen, setIsCheckOpen] = useState(false);

  const warmup = chunks.find((c) => c.type === 'warmup');
  const teaching = chunks.filter((c) => c.type === 'teaching');
  const closing = chunks.find((c) => c.type === 'closing');

  const activeChunk = chunks.find((c) => c.id === activeChunkId) || teaching[0] || chunks[0];
  const activeTeachingIdx = teaching.findIndex((c) => c.id === activeChunk?.id);
  const isTeaching = activeChunk?.type === 'teaching';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start" id="chunks-detail-board">
      <div className="lg:col-span-1 bg-white border border-[#2D2A26]/10 rounded-2xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]/60 px-2 mb-2">Lesson Steps</h3>
        {warmup && <button type="button" onClick={() => onSelectChunk(warmup.id)} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${activeChunkId === warmup.id ? 'bg-[#2D2A26] text-white' : 'bg-[#F8F6F0]/60 text-[#2D2A26]'}`}>Warm-up</button>}
        {teaching.map((chunk, idx) => (
          <button key={chunk.id} type="button" onClick={() => onSelectChunk(chunk.id)} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold cursor-pointer truncate ${activeChunkId === chunk.id ? 'bg-[#2D2A26] text-white' : 'bg-[#F8F6F0]/60 text-[#2D2A26]'}`}>
            Step {idx + 1}: {chunk.title}
          </button>
        ))}
        {closing && <button type="button" onClick={() => onSelectChunk(closing.id)} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${activeChunkId === closing.id ? 'bg-[#2D2A26] text-white' : 'bg-[#F8F6F0]/60 text-[#2D2A26]'}`}>Closing</button>}
      </div>

      <div className="lg:col-span-3 space-y-3">
        {activeChunk && (
          <div className="bg-white border border-[#2D2A26]/10 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
            <span className="text-xs font-bold text-[#2D2A26]">Card Controls</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {isTeaching && (
                <>
                  <button type="button" disabled={activeTeachingIdx <= 0} onClick={() => onMoveUp(activeChunk.id)} className="px-2 py-1 bg-[#F8F6F0] disabled:opacity-30 border border-[#2D2A26]/15 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><ChevronUp className="w-3 h-3" /> Up</button>
                  <button type="button" disabled={activeTeachingIdx >= teaching.length - 1} onClick={() => onMoveDown(activeChunk.id)} className="px-2 py-1 bg-[#F8F6F0] disabled:opacity-30 border border-[#2D2A26]/15 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><ChevronDown className="w-3 h-3" /> Down</button>
                  <button type="button" onClick={() => onSplit(activeChunk.id)} className="px-2 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><Scissors className="w-3 h-3" /> Split</button>
                  <button type="button" onClick={() => onMerge(activeChunk.id)} className="px-2 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><Merge className="w-3 h-3" /> Merge</button>
                  {teaching.length > 1 && <button type="button" onClick={() => onDelete(activeChunk.id)} className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><Trash2 className="w-3 h-3" /> Delete</button>}
                </>
              )}
              <button type="button" onClick={() => onInsert(activeChunk.id)} className="px-2.5 py-1 bg-[#F59E0B] text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><Plus className="w-3 h-3" /> Insert</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
          <div className="xl:col-span-2 space-y-3">
            {activeChunk?.type === 'warmup' && <WarmupClosingCard chunk={activeChunk} phaseLabel="Warm-up & Retrieval" onUpdateChunk={onUpdateSingleChunk} />}
            {activeChunk?.type === 'teaching' && activeTeachingIdx !== -1 && <TeachingChunkCard chunk={activeChunk} index={activeTeachingIdx} onUpdateChunk={onUpdateSingleChunk} onOpenVisualModal={onOpenVisualModal} onOpenVideoModal={onOpenVideoModal} onOpenQuizModal={onOpenQuizModal} lessonTitle={lessonTitle} subject={subject} gradeLevel={gradeLevel} themeNotes={themeNotes} moduleScheme={moduleScheme} />}
            {activeChunk?.type === 'closing' && <WarmupClosingCard chunk={activeChunk} phaseLabel="Plenary & Synthesis" onUpdateChunk={onUpdateSingleChunk} />}
          </div>
          <div className="xl:col-span-1 space-y-3">
            {activeChunk && (
              <ClassroomActionSlate chunk={activeChunk} onUpdateChunk={onUpdateSingleChunk} onOpenFormativeModal={() => setIsFormativeOpen(true)} onOpenCheckModal={() => setIsCheckOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {activeChunk && (
        <>
          <FormativeActivitiesModal isOpen={isFormativeOpen} onClose={() => setIsFormativeOpen(false)} conceptTitle={activeChunk.title} subject={subject} gradeLevel={gradeLevel} themeNotes={themeNotes} moduleScheme={moduleScheme} onSelectTask={(title, details, badge, grouping) => onUpdateSingleChunk({ ...activeChunk, formativeTaskTitle: title, formativeTaskDetails: details, formativeTaskBadge: badge, formativeTaskGrouping: grouping })} />
          <CheckQuestionModal isOpen={isCheckOpen} chunkTitle={activeChunk.title} onClose={() => setIsCheckOpen(false)} onAttachQuestions={(newAtts) => onUpdateSingleChunk({ ...activeChunk, attachments: [...(activeChunk.attachments || []), ...newAtts] })} />
        </>
      )}
    </div>
  );
};
