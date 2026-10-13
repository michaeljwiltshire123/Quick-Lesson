import React, { useState } from 'react';
import { X, Printer, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';
import { PrintablePupilWorksheet } from './PrintablePupilWorksheet';
import { TeacherAnswerKeySheet } from './TeacherAnswerKeySheet';
import { exportQuestionsToGoogleFormsCsv } from './GoogleFormsCsvExporter';

interface Props {
  isOpen: boolean;
  lessonTitle: string;
  questions: QuestionCard[];
  onClose: () => void;
}

export const ExportModal: React.FC<Props> = ({
  isOpen,
  lessonTitle,
  questions,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'pupil' | 'teacher'>('menu');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-5 max-w-2xl w-full text-white space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-black uppercase tracking-wider text-emerald-300">
              Assessment Export & Print Hub
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${activeTab === 'menu' ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-gray-300'}`}
          >
            Export Options
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pupil')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${activeTab === 'pupil' ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-gray-300'}`}
          >
            Pupil Sheet Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('teacher')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${activeTab === 'teacher' ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-gray-300'}`}
          >
            Teacher Key Preview
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'menu' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4">
              <button
                type="button"
                onClick={() => exportQuestionsToGoogleFormsCsv(lessonTitle, questions)}
                className="p-4 bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400 rounded-2xl flex flex-col items-center gap-2 text-center transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
                <span className="text-xs font-black">Google Forms CSV</span>
                <span className="text-[10px] text-gray-400">Download formatted CSV for instant LMS import</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('pupil'); }}
                className="p-4 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400 rounded-2xl flex flex-col items-center gap-2 text-center transition-all cursor-pointer"
              >
                <Printer className="w-8 h-8 text-blue-400" />
                <span className="text-xs font-black">Print Pupil Test</span>
                <span className="text-[10px] text-gray-400">Formatted paper worksheet for classroom print</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('teacher'); }}
                className="p-4 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400 rounded-2xl flex flex-col items-center gap-2 text-center transition-all cursor-pointer"
              >
                <FileText className="w-8 h-8 text-amber-400" />
                <span className="text-xs font-black">Teacher Mark Scheme</span>
                <span className="text-[10px] text-gray-400">Printable answer key with diagnostic rationales</span>
              </button>
            </div>
          )}

          {activeTab === 'pupil' && <PrintablePupilWorksheet lessonTitle={lessonTitle} questions={questions} />}
          {activeTab === 'teacher' && <TeacherAnswerKeySheet lessonTitle={lessonTitle} questions={questions} />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] text-gray-400">{questions.length} questions prepared</span>
          {activeTab !== 'menu' && (
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
