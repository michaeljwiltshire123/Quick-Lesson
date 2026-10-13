import React from 'react';
import { Ghost, PenTool } from 'lucide-react';

interface Props {
  mode: 'bank' | 'custom';
  onSelectMode: (mode: 'bank' | 'custom') => void;
  bankCount: number;
}

export const EchoPromptModeToggle: React.FC<Props> = ({ mode, onSelectMode, bankCount }) => {
  return (
    <div className="flex bg-slate-900 p-0.5 rounded-xl border border-white/10">
      <button
        type="button"
        onClick={() => onSelectMode('bank')}
        className={`flex-1 py-1.5 px-2 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
          mode === 'bank' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Ghost className="w-3 h-3" />
        <span>Ghost Bank ({bankCount})</span>
      </button>
      <button
        type="button"
        onClick={() => onSelectMode('custom')}
        className={`flex-1 py-1.5 px-2 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
          mode === 'custom' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
        }`}
      >
        <PenTool className="w-3 h-3" />
        <span>Write Custom</span>
      </button>
    </div>
  );
};
