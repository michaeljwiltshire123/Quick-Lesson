import React from 'react';
import { CanvasAspectRatio } from '../../types/slideTypes';
import { Undo2, Redo2, BringToFront, SendToBack, Grid, Monitor, Tablet, FileText, Sun, Moon } from 'lucide-react';

interface CanvasToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  hasSelectedElement: boolean;
  aspectRatio: CanvasAspectRatio;
  isGridVisible: boolean;
  isDarkMode?: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onChangeAspectRatio: (ratio: CanvasAspectRatio) => void;
  onToggleGrid: () => void;
  onToggleDarkMode?: () => void;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  canUndo, canRedo, hasSelectedElement, aspectRatio, isGridVisible, isDarkMode = false,
  onUndo, onRedo, onBringToFront, onSendToBack, onChangeAspectRatio, onToggleGrid, onToggleDarkMode,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white border border-stone-200 px-3.5 py-2 rounded-2xl shadow-xs">
      <div className="flex items-center gap-1 border-r border-stone-200 pr-2">
        <button type="button" disabled={!canUndo} onClick={onUndo} className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer" title="Undo">
          <Undo2 className="w-4 h-4" />
        </button>
        <button type="button" disabled={!canRedo} onClick={onRedo} className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer" title="Redo">
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r border-stone-200 pr-2">
        <button type="button" disabled={!hasSelectedElement} onClick={onBringToFront} className="px-2 py-1 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center gap-1 cursor-pointer" title="Bring to Front">
          <BringToFront className="w-3.5 h-3.5 text-amber-700" /><span className="hidden sm:inline">Front</span>
        </button>
        <button type="button" disabled={!hasSelectedElement} onClick={onSendToBack} className="px-2 py-1 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center gap-1 cursor-pointer" title="Send to Back">
          <SendToBack className="w-3.5 h-3.5 text-stone-500" /><span className="hidden sm:inline">Back</span>
        </button>
      </div>

      <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-xl">
        {(['16:9', '4:3', 'A4'] as CanvasAspectRatio[]).map((ratio) => (
          <button key={ratio} type="button" onClick={() => onChangeAspectRatio(ratio)} className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${aspectRatio === ratio ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}>
            {ratio === '16:9' ? <Monitor className="w-3 h-3" /> : ratio === '4:3' ? <Tablet className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
            <span>{ratio}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <button type="button" onClick={onToggleGrid} className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer ${isGridVisible ? 'bg-amber-50 border-amber-300 text-amber-900' : 'border-stone-200 text-stone-600'}`} title="Grid Guide">
          <Grid className="w-3.5 h-3.5 text-amber-700" /><span className="hidden md:inline">Grid</span>
        </button>
        {onToggleDarkMode && (
          <button type="button" onClick={onToggleDarkMode} className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer ${isDarkMode ? 'bg-stone-900 border-stone-800 text-amber-300' : 'bg-white border-stone-200 text-stone-700'}`} title="Toggle Dark/Light Projector Mode">
            {isDarkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
