import React from 'react';
import { QrCode, Copy, Sparkles, CheckCircle2, Eye, Presentation, Zap, FileDown } from 'lucide-react';

interface Props {
  roomCode: string;
  isAttached: boolean;
  onAttachToLesson: () => void;
  onCopyLink: () => void;
  onCopySlidesEmbed: () => void;
  onLaunchLobby: () => void;
  onOpenExport?: () => void;
  onOpenPreview?: () => void;
}

export const CompetitiveQuizLauncherCard: React.FC<Props> = ({
  roomCode,
  isAttached,
  onAttachToLesson,
  onCopyLink,
  onCopySlidesEmbed,
  onLaunchLobby,
  onOpenExport,
  onOpenPreview,
}) => {
  return (
    <div className="bg-[#2D2A26] text-white p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Real-Time Arena</span>
            </span>
            <span className="text-[11px] text-gray-400">8 High-Energy Formats</span>
          </div>
          <h3 className="text-xl font-black tracking-tight text-white">Battle Quiz Arena</h3>
        </div>

        <div className="flex items-center gap-3 bg-black/40 px-3.5 py-2 rounded-2xl border border-white/10">
          <div className="text-right">
            <div className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Join Code</div>
            <div className="text-xl font-black font-mono text-amber-400">{roomCode}</div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <QrCode className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-1">
        <button
          type="button"
          onClick={onAttachToLesson}
          className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isAttached ? 'bg-emerald-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
          }`}
        >
          {isAttached ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>{isAttached ? 'Attached' : 'Attach'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenPreview || onLaunchLobby}
          className="py-2.5 px-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/25 ring-2 ring-amber-300/60 transition-all hover:scale-102"
        >
          <Eye className="w-3.5 h-3.5 text-slate-950 fill-current" />
          <span>Live Arena Preview</span>
        </button>

        <button
          type="button"
          onClick={onOpenExport}
          className="py-2.5 px-3 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Print & Export</span>
        </button>

        <button
          type="button"
          onClick={onCopyLink}
          className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
        >
          <Copy className="w-3.5 h-3.5 text-gray-400" />
          <span>Pupil Link</span>
        </button>

        <button
          type="button"
          onClick={onCopySlidesEmbed}
          className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
        >
          <Presentation className="w-3.5 h-3.5 text-amber-400" />
          <span>Slides Embed</span>
        </button>
      </div>
    </div>
  );
};
