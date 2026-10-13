import React from 'react';
import { Award } from 'lucide-react';
import { ModuleScheme } from '../../../types';

interface Props {
  lessonTitle: string;
  moduleScheme?: ModuleScheme;
  selectedFormatLabel?: string;
}

export const Step4SummativeHeader: React.FC<Props> = ({
  lessonTitle, moduleScheme, selectedFormatLabel,
}) => (
  <div className="bg-white border border-[#2D2A26]/10 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/20">
        Step 4: Summative Assessment Hub
      </span>
      <h2 className="text-lg sm:text-xl font-bold text-[#2D2A26] mt-1.5">
        {lessonTitle ? `Summative Assessment: ${lessonTitle}` : 'Summative Assessment Hub'}
      </h2>
      {moduleScheme?.vocationalScenario && (
        <p className="text-xs text-[#2D2A26]/70 mt-1 max-w-2xl">{moduleScheme.vocationalScenario}</p>
      )}
    </div>
    <div className="flex items-center gap-2.5 bg-amber-50/90 px-3.5 py-2 rounded-xl border border-amber-300/80 shadow-2xs shrink-0">
      <div className="p-1 rounded-lg bg-amber-500/15 text-[#D97706]">
        <Award className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#D97706]">Assessment Mode</span>
        <span className="text-xs font-bold text-[#2D2A26]">
          {selectedFormatLabel || 'Select Assessment'}
        </span>
      </div>
    </div>
  </div>
);
