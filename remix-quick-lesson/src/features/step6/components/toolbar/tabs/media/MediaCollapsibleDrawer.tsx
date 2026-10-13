import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MediaCollapsibleDrawerProps {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const MediaCollapsibleDrawer: React.FC<MediaCollapsibleDrawerProps> = ({
  title, icon, badge, isOpen, onToggle, children,
}) => {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden transition-all shadow-2xs">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-2.5 flex items-center justify-between font-bold text-stone-800 text-[11px] hover:bg-stone-100 transition-colors cursor-pointer select-none text-left"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5">
          {icon}
          <span>{title}</span>
        </span>
        <div className="flex items-center gap-1.5">
          {badge && (
            <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-semibold capitalize">
              {badge}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-2.5 pt-1 border-t border-stone-200/80 animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
