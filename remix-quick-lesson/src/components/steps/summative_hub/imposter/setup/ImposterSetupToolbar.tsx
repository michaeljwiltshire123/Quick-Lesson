import React from 'react';
import { QrCode, CheckCircle2, Play, Printer, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
  offlinePrintable: boolean;
  isAttached: boolean;
  onAttach: () => void;
  onOpenSimulator?: () => void;
  onOpenInspector?: () => void;
  onLaunchLobby?: () => void;
  onGenerateAi?: () => void;
  isGenerating?: boolean;
}

export const ImposterSetupToolbar: React.FC<Props> = ({
  offlinePrintable,
  isAttached,
  onAttach,
  onOpenSimulator,
  onOpenInspector,
  onLaunchLobby,
  onGenerateAi,
  isGenerating,
}) => (
  <div className="pt-3 border-t border-[#2D2A26]/10 flex flex-wrap items-center justify-between gap-3">
    <div className="text-[11px] text-[#2D2A26]/70">
      <span className="font-bold text-[#2D2A26]">Lesson Planning Mode: </span>
      Attaches Imposter rules, question deck, and room access to lesson plan.
    </div>
    <div className="flex flex-wrap items-center gap-2">
      {offlinePrintable && (
        <button
          type="button"
          onClick={() => window.print()}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-[#F8F6F0] border border-[#2D2A26]/20 text-[#2D2A26] flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Role Cards</span>
        </button>
      )}
      {onGenerateAi && (
        <button
          type="button"
          disabled={isGenerating}
          onClick={onGenerateAi}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>{isGenerating ? 'Synthesising Questions...' : 'Generate AI Questions ✨'}</span>
        </button>
      )}
      {onOpenInspector && (
        <button
          type="button"
          onClick={onOpenInspector}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/20 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Question Check</span>
        </button>
      )}
      {onOpenSimulator && (
        <button
          type="button"
          onClick={onOpenSimulator}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F8F6F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/20 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Quiz Preview</span>
        </button>
      )}
      {onLaunchLobby && (
        <button
          type="button"
          onClick={onLaunchLobby}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#2D2A26] hover:bg-black text-white flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
          <span>Start Live Class</span>
        </button>
      )}
      <button
        type="button"
        onClick={onAttach}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-xs active:scale-98 transition-all ${
          isAttached
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
            : 'bg-[#2D2A26] hover:bg-black text-white'
        }`}
      >
        {isAttached ? <CheckCircle2 className="w-3.5 h-3.5" /> : <QrCode className="w-3.5 h-3.5 text-[#F59E0B]" />}
        <span>{isAttached ? 'Attached to Plan' : 'Attach to Plan'}</span>
      </button>
    </div>
  </div>
);
