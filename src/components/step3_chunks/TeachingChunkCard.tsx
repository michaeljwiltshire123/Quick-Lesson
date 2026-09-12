import React, { useState, useEffect } from 'react';
import { LessonChunk, ChunkAttachment, ModuleScheme } from '../../types';
import { TheoryBulletsEditor } from './components/TheoryBulletsEditor';
import { ExamplesDemonstrationEditor } from './components/ExamplesDemonstrationEditor';
import { InteractiveToolbelt } from '../steps/InteractiveToolbelt';

interface TeachingChunkCardProps {
  chunk: LessonChunk; index: number; onUpdateChunk: (updated: LessonChunk) => void;
  onOpenVisualModal: () => void; onOpenVideoModal: () => void; onOpenQuizModal?: () => void;
  lessonTitle?: string; subject?: string; gradeLevel?: string; themeNotes?: string; moduleScheme?: ModuleScheme;
}

export const TeachingChunkCard: React.FC<TeachingChunkCardProps> = ({
  chunk, onUpdateChunk, onOpenVisualModal, onOpenVideoModal, onOpenQuizModal,
  lessonTitle, subject, gradeLevel, themeNotes, moduleScheme,
}) => {
  const [title, setTitle] = useState(chunk.title);
  const [vocab, setVocab] = useState(chunk.vocabulary || '');
  const [script, setScript] = useState(chunk.teacherScript || '');
  const [notes, setNotes] = useState(chunk.classroomNotes || '');
  const [intent, setIntent] = useState(chunk.learningIntent || '');

  useEffect(() => {
    setTitle(chunk.title); setVocab(chunk.vocabulary || ''); setScript(chunk.teacherScript || '');
    setNotes(chunk.classroomNotes || ''); setIntent(chunk.learningIntent || '');
  }, [chunk]);

  const save = (key: keyof LessonChunk, val: string) => { if (chunk[key] !== val) onUpdateChunk({ ...chunk, [key]: val }); };
  const addAtt = (att: ChunkAttachment) => onUpdateChunk({ ...chunk, attachments: [...(chunk.attachments || []), att] });
  const remAtt = (id: string) => onUpdateChunk({ ...chunk, attachments: (chunk.attachments || []).filter((a) => a.id !== id) });

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-2xs space-y-3 relative">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap flex-1">
          {vocab.split(',').map((v) => v.trim()).filter(Boolean).map((v, i) => (
            <span key={i} className="text-[10px] font-bold bg-[#F8F6F0] text-[#2D2A26] px-2.5 py-0.5 rounded-full border border-[#2D2A26]/10">{v}</span>
          ))}
          <input type="text" value={vocab} onChange={(e) => setVocab(e.target.value)} onBlur={() => save('vocabulary', vocab)} placeholder="+ Add Vocab Tags..." className="text-[10px] font-semibold bg-[#F8F6F0]/60 text-[#2D2A26] px-2 py-0.5 rounded-full border border-dashed border-[#2D2A26]/20 focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60 mb-0.5">Slide Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => save('title', title)} className="w-full text-sm font-bold bg-[#F8F6F0]/50 border border-[#2D2A26]/15 rounded-xl px-3 py-1.5 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30" />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60 mb-0.5">Core Explanation Script</label>
        <textarea value={script} onChange={(e) => setScript(e.target.value)} onBlur={() => save('teacherScript', script)} rows={2} placeholder="1-2 sentence teacher explanation script..." className="w-full text-xs bg-[#F8F6F0]/40 border border-[#2D2A26]/15 rounded-xl p-2 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 leading-snug" />
      </div>

      <TheoryBulletsEditor classroomNotes={notes} onChangeNotes={(updated) => save('classroomNotes', updated)} />

      <ExamplesDemonstrationEditor
        intent={intent}
        chunkTitle={chunk.title}
        lessonTitle={lessonTitle}
        subject={subject}
        gradeLevel={gradeLevel}
        themeNotes={themeNotes}
        moduleScheme={moduleScheme}
        onChangeIntent={(val) => setIntent(val)}
        onSaveIntent={(val) => save('learningIntent', val)}
      />

      {chunk.metaphorBadge && <div className="text-xs font-bold text-[#D97706] bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">💡 METAPHOR: {chunk.metaphorBadge}</div>}
      {chunk.formativeTaskTitle && <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"><span className="uppercase text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300 mr-2">{chunk.formativeTaskBadge || 'TASK'}</span>{chunk.formativeTaskTitle}</div>}
      {chunk.lociAttached && (
        <div
          onClick={onOpenQuizModal}
          className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-2 rounded-xl border border-amber-300 flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
        >
          <span className="flex items-center gap-1.5">
            🏛️ Loci Memory Palace attached: <span className="underline">{chunk.lociRouteName || 'Route Walkthrough'}</span>
          </span>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-amber-300 font-bold">Open Completed Loci</span>
        </div>
      )}

      <InteractiveToolbelt attachments={chunk.attachments} onAddAttachment={addAtt} onRemoveAttachment={remAtt} onOpenVisualModal={onOpenVisualModal} onOpenVideoModal={onOpenVideoModal} onOpenQuizModal={onOpenQuizModal} />
    </div>
  );
};
