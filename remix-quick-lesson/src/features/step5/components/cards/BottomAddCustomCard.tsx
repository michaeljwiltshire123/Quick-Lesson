import React from 'react';
import { Plus } from 'lucide-react';

interface BottomAddCustomCardProps {
  onAddNew: () => void;
}

export const BottomAddCustomCard: React.FC<BottomAddCustomCardProps> = ({ onAddNew }) => {
  return (
    <div className="pt-2">
      <button
        onClick={onAddNew}
        className="w-full py-3.5 px-4 rounded-xl border-2 border-dashed border-[#2D2A26]/20 hover:border-[#D97706] bg-[#F8F6F0]/50 hover:bg-[#F8F6F0] text-[#2D2A26] hover:text-[#D97706] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group active:scale-[0.99]"
      >
        <Plus className="w-4 h-4 text-[#D97706] group-hover:scale-110 transition-transform" />
        <span>Add Custom Card to this Category</span>
      </button>
    </div>
  );
};
