import React from 'react';
import { Pen, Highlighter, Check, RotateCcw } from 'lucide-react';

interface DrawingToolbarBadgeProps {
  tool: 'pen' | 'highlighter';
  color: string;
  strokeWidth: number;
  onSelectTool: (t: 'pen' | 'highlighter') => void;
  onSelectColor: (c: string) => void;
  onSelectWidth: (w: number) => void;
  onClear: () => void;
  onDone: () => void;
}

const COLORS = ['#000000', '#EF4444', '#2563EB', '#10B981', '#F59E0B', '#FACC15'];

export const DrawingToolbarBadge: React.FC<DrawingToolbarBadgeProps> = ({
  tool, color, strokeWidth, onSelectTool, onSelectColor, onSelectWidth, onClear, onDone,
}) => {
  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2 border border-white/20 select-none">
      <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full">
        <button
          type="button"
          onClick={() => onSelectTool('pen')}
          className={`p-1.5 rounded-full cursor-pointer transition-colors ${tool === 'pen' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'}`}
          title="Pen (solid ink)"
        >
          <Pen className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onSelectTool('highlighter')}
          className={`p-1.5 rounded-full cursor-pointer transition-colors ${tool === 'highlighter' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'}`}
          title="Highlighter (translucent marker)"
        >
          <Highlighter className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onSelectColor(c)}
            style={{ backgroundColor: c }}
            className={`w-4 h-4 rounded-full border border-white/40 cursor-pointer hover:scale-125 transition-transform ${color === c ? 'ring-2 ring-amber-400 scale-110' : ''}`}
          />
        ))}
      </div>

      <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded-full text-[10px]">
        {[0.6, 1.4, 2.5].map((w, i) => (
          <button
            key={w}
            type="button"
            onClick={() => onSelectWidth(w)}
            className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${strokeWidth === w ? 'bg-amber-600 text-white' : 'text-stone-300 hover:text-white'}`}
          >
            {i === 0 ? 'Fine' : i === 1 ? 'Med' : 'Thick'}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClear}
        className="p-1 text-stone-300 hover:text-rose-400 cursor-pointer"
        title="Clear strokes"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={onDone}
        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold flex items-center gap-1 cursor-pointer text-[11px] shadow-xs"
      >
        <Check className="w-3 h-3" />
        <span>Done</span>
      </button>
    </div>
  );
};
