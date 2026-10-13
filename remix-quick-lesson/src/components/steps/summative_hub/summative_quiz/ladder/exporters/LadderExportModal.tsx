import React from 'react';
import { X, QrCode, FileSpreadsheet, ExternalLink } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';
import { exportToGoogleFormsCsv } from './LadderGoogleFormsExporter';
import { exportToKahootCsv } from './LadderKahootCsvExporter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rungs: LadderRungQuestion[];
  title: string;
}

export const LadderExportModal: React.FC<Props> = ({ isOpen, onClose, rungs, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white text-[#2D2A26] rounded-3xl border border-[#2D2A26]/15 shadow-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>LMS & Classroom Exporters</span>
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Export your 10-Step Escalation Rungs to standard formatted spreadsheets for 1-click loading into external Virtual Learning Environments:
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              exportToGoogleFormsCsv(rungs, title);
              onClose();
            }}
            className="w-full p-3 bg-[#F8F6F0] hover:bg-amber-500/10 border border-[#2D2A26]/15 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
          >
            <div>
              <span className="text-xs font-bold block text-gray-800">Google Forms Format (.csv)</span>
              <span className="text-[10px] text-gray-500">Includes question columns, choice variants, and explanation keys.</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => {
              exportToKahootCsv(rungs, title);
              onClose();
            }}
            className="w-full p-3 bg-[#F8F6F0] hover:bg-emerald-500/10 border border-[#2D2A26]/15 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
          >
            <div>
              <span className="text-xs font-bold block text-gray-800">Kahoot Spreadsheet Format (.csv)</span>
              <span className="text-[10px] text-gray-500">Includes question prompts, choice options, timer, and solution index.</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};
