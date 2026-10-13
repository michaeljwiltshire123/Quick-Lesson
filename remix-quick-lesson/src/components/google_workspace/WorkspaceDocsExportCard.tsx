import React, { useState } from 'react';
import { FileText, Presentation, ExternalLink, CheckCircle } from 'lucide-react';
import { exportLessonToGoogleDocs } from '../../services/google/googleDocsService';
import { exportLessonToGoogleSlides } from '../../services/google/googleSlidesService';
import { LessonChunk, ModuleScheme } from '../../types';

interface WorkspaceDocsExportCardProps {
  lessonTitle: string;
  subject: string;
  gradeLevel: string;
  chunks: LessonChunk[];
  moduleScheme: ModuleScheme;
  onRequestConfirm: (title: string, message: string, action: () => Promise<void>) => void;
}

export const WorkspaceDocsExportCard: React.FC<WorkspaceDocsExportCardProps> = ({
  lessonTitle, subject, gradeLevel, chunks, moduleScheme, onRequestConfirm,
}) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [slideUrl, setSlideUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExportDoc = () => {
    onRequestConfirm('Create Google Doc Lesson Plan?', `Generate Google Doc for "${lessonTitle}"?`, async () => {
      setIsExporting('doc');
      try {
        const res = await exportLessonToGoogleDocs(lessonTitle, subject, gradeLevel, chunks, moduleScheme);
        setDocUrl(res.url);
      } finally { setIsExporting(null); }
    });
  };

  const handleExportSlides = () => {
    onRequestConfirm('Create Google Slides Presentation?', `Generate Slides deck for "${lessonTitle}"?`, async () => {
      setIsExporting('slides');
      try {
        const res = await exportLessonToGoogleSlides(lessonTitle, subject, chunks);
        setSlideUrl(res.url);
      } finally { setIsExporting(null); }
    });
  };

  return (
    <div className="p-4 rounded-xl border border-[#2D2A26]/10 bg-white/70 space-y-3">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]/80">Google Docs & Slides</h4>
        <p className="text-[11px] text-[#2D2A26]/60">Export structured schemes of work and classroom slide decks.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 rounded-lg border border-[#2D2A26]/10 bg-white flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600 shrink-0" /><span className="text-xs font-semibold text-[#2D2A26]">Lesson Plan Doc</span></div>
          {docUrl ? (
            <a href={docUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /><span>Open Google Doc</span><ExternalLink className="w-3 h-3" /></a>
          ) : (
            <button type="button" onClick={handleExportDoc} disabled={isExporting !== null} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50">
              {isExporting === 'doc' ? 'Creating…' : 'Export to Docs'}
            </button>
          )}
        </div>
        <div className="p-3 rounded-lg border border-[#2D2A26]/10 bg-white flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2"><Presentation className="w-4 h-4 text-amber-600 shrink-0" /><span className="text-xs font-semibold text-[#2D2A26]">Presentation Deck</span></div>
          {slideUrl ? (
            <a href={slideUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-amber-600 font-semibold hover:underline"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /><span>Open Google Slides</span><ExternalLink className="w-3 h-3" /></a>
          ) : (
            <button type="button" onClick={handleExportSlides} disabled={isExporting !== null} className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50">
              {isExporting === 'slides' ? 'Creating…' : 'Export to Slides'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
