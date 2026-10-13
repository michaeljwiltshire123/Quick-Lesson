import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Presentation, QrCode } from 'lucide-react';

interface Props {
  roomCode: string;
  onRegenerateCode: () => void;
  lessonTitle: string;
}

export const RoomLauncherCard: React.FC<Props> = ({ roomCode, onRegenerateCode, lessonTitle }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSlides, setCopiedSlides] = useState(false);

  const joinUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/imposter/join?code=${roomCode}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(joinUrl)}`;
  const slidesEmbedUrl = `${joinUrl}&embed=slides&title=${encodeURIComponent(lessonTitle || 'Classroom Imposter')}`;

  const copyToClipboard = async (text: string, setStatus: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(true);
      setTimeout(() => setStatus(false), 2000);
    } catch {
      setStatus(false);
    }
  };

  return (
    <div id="imposter-room-launcher-card" className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-amber-700 uppercase">Room Access Code</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-2xl font-black font-mono text-[#2D2A26] tracking-widest">{roomCode}</span>
            <button
              id="btn-regenerate-room-code"
              type="button"
              onClick={onRegenerateCode}
              className="p-1 rounded-lg hover:bg-black/5 text-[#2D2A26]/60 hover:text-[#2D2A26] transition-colors"
              title="Generate new 4-letter code"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <button
          id="btn-copy-join-link"
          type="button"
          onClick={() => copyToClipboard(joinUrl, setCopiedLink)}
          className="py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-white border border-[#2D2A26]/15 hover:border-[#2D2A26]/30 text-[#2D2A26] flex items-center gap-1.5 shadow-2xs"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedLink ? 'Copied' : 'Copy link'}
        </button>
      </div>

      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#2D2A26]/10">
        <img
          src={qrUrl}
          alt={`Scan to join room ${roomCode}`}
          className="w-20 h-20 rounded-lg border border-[#2D2A26]/10 shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26]">
            <QrCode className="w-3.5 h-3.5 text-amber-600" />
            Quick Student Join
          </div>
          <p className="text-[11px] text-[#2D2A26]/70 leading-snug">
            Pupils point their device camera here to instantly enter room <strong className="font-mono">{roomCode}</strong>.
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#2D2A26]/80 font-medium">
          <Presentation className="w-3.5 h-3.5 text-amber-600" />
          <span>Google Slides Embed Link</span>
        </div>
        <button
          id="btn-copy-slides-embed"
          type="button"
          onClick={() => copyToClipboard(slidesEmbedUrl, setCopiedSlides)}
          className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1"
        >
          {copiedSlides ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          {copiedSlides ? 'Copied embed URL' : 'Copy URL'}
        </button>
      </div>
    </div>
  );
};
