import React from 'react';
import { CanvasTheme } from '../../../../types/slideTypes';
import { Sparkles, Film, ArrowRight, Trash2 } from 'lucide-react';
import { TRANSITIONS_CATALOG } from '../../../../constants/transitionsCatalog';

interface SlideTransitionLauncherCardProps {
  currentTheme?: Partial<CanvasTheme>;
  onOpenTransitionsModal: () => void;
  onClearTransition?: () => void;
}

export const SlideTransitionLauncherCard: React.FC<SlideTransitionLauncherCardProps> = ({
  currentTheme,
  onOpenTransitionsModal,
  onClearTransition,
}) => {
  const currentEntryId = (currentTheme as any)?.transitionEffect || 'none';
  const currentExitId = (currentTheme as any)?.pageExitEffect || 'none';
  const hasTransition = currentEntryId !== 'none' || currentExitId !== 'none';

  const entryItem = TRANSITIONS_CATALOG.find((t) => t.id === currentEntryId);
  const exitItem = TRANSITIONS_CATALOG.find((t) => t.id === currentExitId);

  const entryName = entryItem?.name || (currentEntryId === 'none' ? 'None (Instant)' : currentEntryId.replace(/_/g, ' '));
  const exitName = exitItem?.name || (currentExitId === 'none' ? 'None (Instant)' : currentExitId.replace(/_/g, ' '));

  return (
    <div className="space-y-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-700 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-stone-900 flex items-center gap-1.5 text-xs">
          <Film className="w-4 h-4 text-amber-700" />
          <span>Page Transitions</span>
        </span>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
          60fps Engine
        </span>
      </div>

      <div className="p-2.5 bg-white border border-stone-200 rounded-xl space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-stone-500 font-semibold">Entry Transition:</span>
          <span className="font-bold text-stone-800 capitalize truncate max-w-[140px]">{entryName}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100">
          <span className="text-stone-500 font-semibold">Exit Transition:</span>
          <span className="font-bold text-stone-800 capitalize truncate max-w-[140px]">{exitName}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenTransitionsModal}
        className="w-full py-2.5 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all group"
      >
        <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
        <span>Explore 40+ Live Lesson Transitions</span>
        <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {hasTransition && onClearTransition && (
        <button
          type="button"
          onClick={onClearTransition}
          className="w-full py-1.5 px-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-stone-200 text-stone-600 rounded-lg font-semibold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <Trash2 className="w-3 h-3" />
          <span>Reset to Instant (No Transition)</span>
        </button>
      )}
    </div>
  );
};
