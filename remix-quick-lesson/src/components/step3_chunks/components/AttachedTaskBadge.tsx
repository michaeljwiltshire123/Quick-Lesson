import React from 'react';
import { Users, X } from 'lucide-react';

interface AttachedTaskBadgeProps {
  badge?: string;
  grouping?: string;
  title?: string;
  details?: string;
  onRemove: () => void;
}

export const AttachedTaskBadge: React.FC<AttachedTaskBadgeProps> = ({
  badge,
  grouping,
  title,
  details,
  onRemove,
}) => {
  return (
    <div className="bg-[#F8F6F0]/80 border border-[#2D2A26]/15 rounded-xl p-3.5 relative">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F59E0B]/20 text-amber-900 px-2 py-0.5 rounded-full">{badge}</span>
          <span className="text-[10px] font-semibold text-[#2D2A26]/70 flex items-center gap-1"><Users className="w-3 h-3" /> {grouping}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          title="Remove task"
          className="p-1 text-[#2D2A26]/50 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <h5 className="text-xs font-bold text-[#2D2A26]">{title}</h5>
      <p className="text-[11px] text-[#2D2A26]/70 mt-0.5 leading-relaxed">{details}</p>
    </div>
  );
};
