import React from 'react';
import { Printer, QrCode, BookOpen, Layers } from 'lucide-react';
import { LessonChunk, ModuleScheme } from '../../types';
import { HandoutQrResourceItem } from './handouts/HandoutQrResourceItem';

interface Step9DifferentiatorHandoutsProps {
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  chunks: LessonChunk[];
  moduleScheme?: ModuleScheme;
}

export const Step9DifferentiatorHandouts: React.FC<Step9DifferentiatorHandoutsProps> = ({
  lessonTitle = 'Lesson Handout', subject = 'General', gradeLevel = 'Secondary', chunks = [],
}) => {
  const allAttachments = chunks.flatMap((c) => c.attachments || []).filter((a) => Boolean(a.url));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#2D2A26]/10 print:hidden">
        <div>
          <h2 className="text-lg font-bold text-[#2D2A26]">Printable Differentiated Handouts</h2>
          <p className="text-xs text-[#2D2A26]/70">Includes scannable QR codes and Checking-for-Understanding prompts.</p>
        </div>
        <button type="button" onClick={handlePrint} className="px-4 py-2 bg-[#2D2A26] hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer">
          <Printer className="w-4 h-4 text-[#F59E0B]" /> Print Handout
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2D2A26]/15 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
        <div className="border-b border-[#2D2A26]/15 pb-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#2D2A26]/60 uppercase tracking-wider">
            <span>{subject} • {gradeLevel}</span>
            <span>Student Study Guide & Activity Sheet</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2D2A26]">{lessonTitle}</h1>
        </div>

        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#2D2A26] flex items-center gap-2 border-b border-[#2D2A26]/10 pb-1">
            <BookOpen className="w-4 h-4 text-[#D97706]" /> 1. Lesson Core Progression
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {chunks.map((chunk, idx) => (
              <div key={chunk.id || idx} className="p-3 bg-[#F8F6F0]/60 rounded-xl border border-[#2D2A26]/10 space-y-1">
                <span className="text-xs font-bold text-[#2D2A26]">Step {idx + 1}: {chunk.title}</span>
                {chunk.classroomNotes && <p className="text-xs text-[#2D2A26]/80">{chunk.classroomNotes}</p>}
                {chunk.learningIntent && <p className="text-xs font-mono text-[#2D2A26]/70">{chunk.learningIntent}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#2D2A26] flex items-center gap-2 border-b border-[#2D2A26]/10 pb-1">
            <QrCode className="w-4 h-4 text-[#D97706]" /> 4. Linked Digital Resources & Media References
          </h3>
          {allAttachments.length === 0 ? (
            <div className="p-4 text-center bg-[#F8F6F0]/50 rounded-xl border border-dashed border-[#2D2A26]/15">
              <p className="text-xs text-[#2D2A26]/60">No digital QR resources linked to this lesson yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allAttachments.map((att) => (
                <HandoutQrResourceItem key={att.id} attachment={att} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
