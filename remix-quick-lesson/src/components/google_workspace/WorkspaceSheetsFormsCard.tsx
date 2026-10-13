import React, { useState } from 'react';
import { Table, CheckSquare, ExternalLink, CheckCircle } from 'lucide-react';
import { exportProgressionToGoogleSheets } from '../../services/google/googleSheetsService';
import { createGoogleFormQuiz } from '../../services/google/googleFormsService';
import { LessonChunk, ModuleScheme } from '../../types';

interface WorkspaceSheetsFormsCardProps {
  lessonTitle: string;
  chunks: LessonChunk[];
  moduleScheme: ModuleScheme;
  onRequestConfirm: (title: string, message: string, action: () => Promise<void>) => void;
}

export const WorkspaceSheetsFormsCard: React.FC<WorkspaceSheetsFormsCardProps> = ({
  lessonTitle, chunks, moduleScheme, onRequestConfirm,
}) => {
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [formUrl, setFormUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleExportSheet = () => {
    onRequestConfirm('Export Progression to Google Sheets?', `Generate assessment rubric spreadsheet for "${lessonTitle}"?`, async () => {
      setIsProcessing('sheet');
      try {
        const res = await exportProgressionToGoogleSheets(lessonTitle, chunks, moduleScheme);
        setSheetUrl(res.url);
      } finally { setIsProcessing(null); }
    });
  };

  const handleExportForm = () => {
    onRequestConfirm('Create Google Form Formative Quiz?', `Generate formative quiz in Google Forms for "${lessonTitle}"?`, async () => {
      setIsProcessing('form');
      try {
        const res = await createGoogleFormQuiz(lessonTitle, chunks);
        setFormUrl(res.responderUri);
      } finally { setIsProcessing(null); }
    });
  };

  return (
    <div className="p-4 rounded-xl border border-[#2D2A26]/10 bg-white/70 space-y-3">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]/80">Google Sheets & Forms</h4>
        <p className="text-[11px] text-[#2D2A26]/60">Generate progression rubrics and formative quiz surveys.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 rounded-lg border border-[#2D2A26]/10 bg-white flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2"><Table className="w-4 h-4 text-emerald-600 shrink-0" /><span className="text-xs font-semibold text-[#2D2A26]">Progression Rubric</span></div>
          {sheetUrl ? (
            <a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold hover:underline"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /><span>Open Google Sheets</span><ExternalLink className="w-3 h-3" /></a>
          ) : (
            <button type="button" onClick={handleExportSheet} disabled={isProcessing !== null} className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50">
              {isProcessing === 'sheet' ? 'Creating…' : 'Export to Sheets'}
            </button>
          )}
        </div>
        <div className="p-3 rounded-lg border border-[#2D2A26]/10 bg-white flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2"><CheckSquare className="w-4 h-4 text-purple-600 shrink-0" /><span className="text-xs font-semibold text-[#2D2A26]">Formative Quiz</span></div>
          {formUrl ? (
            <a href={formUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-purple-600 font-semibold hover:underline"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /><span>Open Google Form</span><ExternalLink className="w-3 h-3" /></a>
          ) : (
            <button type="button" onClick={handleExportForm} disabled={isProcessing !== null} className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50">
              {isProcessing === 'form' ? 'Creating…' : 'Create Form Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
