import React from 'react';
import { Plus } from 'lucide-react';

interface BottomAddCustomCardButtonProps {
  onAddNew: () => void;
  filterLabel: string;
}

export const BottomAddCustomCardButton: React.FC<BottomAddCustomCardButtonProps> = ({
  onAddNew,
  filterLabel,
}) => {
  return (
    <div className="pt-4 border-t border-[#2D2A26]/10 flex justify-center">
      <button
        onClick={onAddNew}
        className="w-full sm:w-auto px-6 py-3 bg-[#F8F6F0] hover:bg-[#efece4] text-[#2D2A26] hover:text-[#1a1816] text-xs font-bold rounded-xl border border-dashed border-[#2D2A26]/30 hover:border-[#D97706] shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
      >
        <div className="w-5 h-5 rounded-full bg-white group-hover:bg-[#F59E0B] text-[#D97706] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
          <Plus className="w-3.5 h-3.5" />
        </div>
        <span>Craft Custom Discussion Card in {filterLabel}</span>
      </button>
    </div>
  );
};
