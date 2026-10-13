import React from 'react';
import { Home } from 'lucide-react';

interface MediaLogoAimsBadgeProps {
  onJumpToAims: () => void;
}

export const MediaLogoAimsBadge: React.FC<MediaLogoAimsBadgeProps> = ({ onJumpToAims }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onJumpToAims();
      }}
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-amber-800 hover:bg-amber-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md cursor-pointer pointer-events-auto z-40 transition-all hover:scale-105 whitespace-nowrap active:scale-95"
      title="Click to jump back to Lesson Aims & Learning Intentions"
    >
      <Home className="w-2.5 h-2.5" />
      <span>Return to Aims</span>
    </button>
  );
};
