import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { ModuleBriefUploader } from './ModuleBriefUploader';

export interface SyllabusQuestionCardProps {
  moduleBriefFile: { name: string; content: string } | null;
  onUploadModuleBrief: (file: { name: string; content: string } | null) => void;
  onNextStep: () => void;
}

export const SyllabusQuestionCard: React.FC<SyllabusQuestionCardProps> = ({
  moduleBriefFile,
  onUploadModuleBrief,
  onNextStep,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasBrief, setHasBrief] = useState<boolean | null>(moduleBriefFile ? true : null);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <h2 className="text-lg md:text-xl font-bold text-[#2D2A26] leading-snug">
            Welcome to Quick Lesson. It helps the AI to know if this lesson is part of an ongoing term syllabus. Do you have a module brief?
          </h2>
          <div className="relative inline-block mt-1">
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-1 rounded-full text-[#2D2A26]/60 hover:text-[#F59E0B] hover:bg-[#F8F6F0] transition-colors cursor-pointer"
              aria-label="Module brief information"
            >
              <Info className="w-5 h-5" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-7 w-72 p-3 bg-[#2D2A26] text-white text-xs rounded-xl shadow-lg z-20 leading-relaxed border border-white/10">
                Think of a Module Brief as your course's master blueprint. It maps out the big picture—real-world scenarios, final projects, and grading standards (like BTEC or GCSE) for the whole term. It's different from a Scheme of Work (SOL), which is just a weekly calendar of topics!
              </div>
            )}
          </div>
        </div>
      </div>

      {hasBrief !== true ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setHasBrief(true)}
            className="py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Yes, upload
          </button>
          <button
            type="button"
            onClick={onNextStep}
            className="py-3 px-4 bg-[#F8F6F0] hover:bg-[#2D2A26]/5 text-[#2D2A26] font-semibold text-sm rounded-xl border border-[#2D2A26]/15 transition-colors cursor-pointer"
          >
            No, go to next step
          </button>
        </div>
      ) : (
        <ModuleBriefUploader
          moduleBriefFile={moduleBriefFile}
          onUploadModuleBrief={onUploadModuleBrief}
          onNextStep={onNextStep}
          onResetSelection={() => setHasBrief(false)}
        />
      )}
    </div>
  );
};
