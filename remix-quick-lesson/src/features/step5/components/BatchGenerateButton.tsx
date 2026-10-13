import React from 'react';
import { Sparkles } from 'lucide-react';

interface BatchGenerateButtonProps {
  onBatchGenerate: () => void;
  isGenerating?: boolean;
}

export const BatchGenerateButton: React.FC<BatchGenerateButtonProps> = ({
  onBatchGenerate,
  isGenerating = false,
}) => {
  return (
    <button
      onClick={onBatchGenerate}
      disabled={isGenerating}
      className="bg-[#2D2A26] hover:bg-[#1a1816] text-[#F59E0B] border border-[#F59E0B]/30 font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 disabled:opacity-50 cursor-pointer text-sm"
    >
      <Sparkles className={`w-4 h-4 text-[#F59E0B] ${isGenerating ? 'animate-spin' : ''}`} />
      <span>{isGenerating ? 'Generating Sparks...' : 'Batch Generate Verbal Sparks ✨'}</span>
    </button>
  );
};
