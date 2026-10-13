import React from 'react';
import { QrCode, Copy, ExternalLink, CheckCircle2, BookmarkPlus, Play, ShieldCheck, Shuffle } from 'lucide-react';

interface Props {
  roomCode: string;
  isAttached: boolean;
  onAttachToLesson: () => void;
  onCopyLink: () => void;
  onOpenProjector: () => void;
  onOpenSimulator?: () => void;
  onOpenPreFlight?: () => void;
  onShuffleGrid?: () => void;
}

export const GridlockRoomLauncherCard: React.FC<Props> = ({
  roomCode,
  isAttached,
  onAttachToLesson,
  onCopyLink,
  onOpenProjector,
  onOpenSimulator,
  onOpenPreFlight,
  onShuffleGrid,
}) => {
  const studentJoinUrl = `${window.location.origin}?gridlock=${roomCode}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(studentJoinUrl)}`;

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-[#F8F6F0] rounded-xl border border-[#2D2A26]/10 shadow-inner">
          <img src={qrCodeUrl} alt="Room QR Code" className="w-20 h-20 rounded-lg object-contain" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" /> Room Access Code
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Shuffle className="w-3 h-3 text-amber-600" /> Random Order Every Game
            </span>
          </div>
          <div className="text-3xl font-black tracking-widest text-[#2D2A26] font-mono">{roomCode}</div>
          <p className="text-xs text-gray-600">Pupils join via QR code or student link.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
        <button type="button" onClick={onCopyLink} className="py-2.5 px-3 bg-[#F8F6F0] text-[#2D2A26] font-bold text-xs rounded-xl border border-[#2D2A26]/15 hover:bg-black/5 flex items-center justify-center gap-1.5 cursor-pointer">
          <Copy className="w-3.5 h-3.5" /> <span>Copy Link</span>
        </button>

        {onShuffleGrid && (
          <button type="button" onClick={onShuffleGrid} className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-200 flex items-center justify-center gap-1.5 cursor-pointer transition-all" title="Reshuffle hex positions for a fresh match board">
            <Shuffle className="w-3.5 h-3.5 text-amber-700" /> <span>Reshuffle Board</span>
          </button>
        )}

        {onOpenPreFlight && (
          <button type="button" onClick={onOpenPreFlight} className="py-2.5 px-3.5 bg-emerald-50 text-emerald-950 font-black text-xs rounded-xl border border-emerald-300 hover:bg-emerald-100 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> <span>Pre-Flight Audit</span>
          </button>
        )}

        {onOpenSimulator && (
          <button type="button" onClick={onOpenSimulator} className="py-2.5 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all">
            <Play className="w-3.5 h-3.5 fill-current" /> <span>Dual-Screen Preview</span>
          </button>
        )}

        <button type="button" onClick={onOpenProjector} className="py-2.5 px-3.5 bg-amber-50 text-amber-950 font-black text-xs rounded-xl border border-amber-300 hover:bg-amber-100 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all">
          <ExternalLink className="w-3.5 h-3.5 text-amber-700" /> <span>Projector Arena</span>
        </button>

        <button type="button" onClick={onAttachToLesson} className={`py-2.5 px-4 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${isAttached ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-400' : 'bg-[#2D2A26] text-white hover:bg-black'}`}>
          {isAttached ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <BookmarkPlus className="w-4 h-4 text-[#F59E0B]" />}
          <span>{isAttached ? 'Attached' : 'Attach to Lesson'}</span>
        </button>
      </div>
    </div>
  );
};
