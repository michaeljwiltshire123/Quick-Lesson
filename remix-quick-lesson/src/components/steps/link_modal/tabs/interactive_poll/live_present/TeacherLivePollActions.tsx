import React from 'react';
import { Download, RotateCcw, Save, PlusCircle } from 'lucide-react';

interface Props {
  onSimulateVote: () => void;
  onExportImage: () => void;
  onSaveToSlide: () => void;
  onReset: () => void;
}

export const TeacherLivePollActions: React.FC<Props> = ({
  onSimulateVote,
  onExportImage,
  onSaveToSlide,
  onReset,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2D2A26]/10">
    <button
      type="button"
      onClick={onSimulateVote}
      className="px-3 py-1.5 rounded-xl bg-white border border-[#2D2A26]/15 text-xs font-semibold text-[#2D2A26] flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
    >
      <PlusCircle className="w-3.5 h-3.5 text-amber-600" /> Simulate Pupil Vote
    </button>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onExportImage}
        className="px-3 py-1.5 rounded-xl bg-white border border-[#2D2A26]/15 text-xs font-semibold text-[#2D2A26] flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-[#2D2A26]/70" /> Save as Image
      </button>
      <button
        type="button"
        onClick={onSaveToSlide}
        className="px-3 py-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
      >
        <Save className="w-3.5 h-3.5" /> Save to Slide &amp; Reset
      </button>
      <button
        type="button"
        onClick={onReset}
        title="Clear votes"
        className="p-1.5 rounded-xl bg-white border border-[#2D2A26]/15 text-[#2D2A26]/60 hover:text-red-600 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  </div>
);
