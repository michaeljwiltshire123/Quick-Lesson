import React from 'react';
import { QrCode, Copy, Sparkles, CheckCircle2, Eye, Presentation } from 'lucide-react';

interface Props {
  roomCode: string;
  isAttached: boolean;
  onAttachToLesson: () => void;
  onCopyLink: () => void;
  onCopySlidesEmbed: () => void;
  onLaunchPreview: () => void;
}

export const DontSayItRoomLauncherCard: React.FC<Props> = ({
  roomCode,
  isAttached,
  onAttachToLesson,
  onCopyLink,
  onCopySlidesEmbed,
  onLaunchPreview,
}) => {
  return (
    <div className="bg-[#2D2A26] text-white p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
              Live Classroom Game
            </span>
            <span className="text-[11px] text-gray-400">Taboo-Style Concept Showdown</span>
          </div>
          <h3 className="text-xl font-black tracking-tight text-white">
            Don't Say It! Room Launcher
          </h3>
        </div>

        <div className="flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10">
          <div className="text-right">
            <div className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Student Join Code</div>
            <div className="text-xl font-black font-mono tracking-wider text-amber-400">{roomCode}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <QrCode className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
        <button
          type="button"
          onClick={onAttachToLesson}
          className={`py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isAttached
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md'
          }`}
        >
          {isAttached ? <CheckCircle2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          <span>{isAttached ? 'Attached to Lesson' : 'Attach to Lesson'}</span>
        </button>

        <button
          type="button"
          onClick={onLaunchPreview}
          className="py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ring-2 ring-amber-300/70"
        >
          <Eye className="w-4 h-4 text-slate-950" />
          <span>Preview Game & Phones</span>
        </button>

        <button
          type="button"
          onClick={onCopyLink}
          className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
        >
          <Copy className="w-3.5 h-3.5 text-gray-400" />
          <span>Copy Student Link</span>
        </button>

        <button
          type="button"
          onClick={onCopySlidesEmbed}
          className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
        >
          <Presentation className="w-3.5 h-3.5 text-amber-400" />
          <span>Slides Embed Link</span>
        </button>
      </div>
    </div>
  );
};
