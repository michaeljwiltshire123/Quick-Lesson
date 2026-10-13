import React from 'react';
import { X, QrCode, Sparkles } from 'lucide-react';
import { QrDesignConfig } from '../link_modal/designer_qr/types';
import { DesignerQrCanvas } from '../link_modal/designer_qr/DesignerQrCanvas';

interface Props {
  isOpen: boolean; onClose: () => void; url: string; name: string; config: QrDesignConfig;
}

export const AttachmentQrModal: React.FC<Props> = ({ isOpen, onClose, url, name, config }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <style>{`
        @keyframes projBeam { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.45; filter: brightness(1.4); } }
        @keyframes dust { 0% { transform: translateY(50px) scale(0.5); opacity: 0; } 30% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translateY(-50px) scale(1.3); opacity: 0; } }
        @keyframes lens { 0% { transform: scale(1.18) rotate(-3deg); filter: blur(5px); } 40% { transform: scale(0.97) rotate(1.5deg); filter: blur(2.5px); } 100% { transform: scale(1) rotate(0); filter: blur(0); } }
      `}</style>

      <div className="bg-white border border-[#2D2A26]/20 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative text-center overflow-hidden">
        {/* Cinematic Volumetric Light Projection & Floating Dust Cloud */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-stone-950/20 -z-10">
          <div 
            style={{
              background: 'conic-gradient(from 180deg, transparent 35%, rgba(245, 158, 11, 0.22) 50%, transparent 65%)',
              animation: 'projBeam 4s infinite ease-in-out',
            }}
            className="absolute inset-0 origin-top"
          />
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                left: `${15 + i * 8}%`,
                top: `${30 + (i % 4) * 15}%`,
                animation: `dust 2.5s linear ${i * 0.2}s infinite`,
              }}
              className="absolute w-1 h-1 rounded-full bg-amber-400/50 blur-[0.5px]"
            />
          ))}
        </div>

        <button type="button" onClick={onClose} className="absolute top-3 right-3 p-1.5 text-[#2D2A26]/60 hover:text-[#2D2A26] rounded-lg hover:bg-black/5 cursor-pointer z-20">
          <X className="w-4.5 h-4.5" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-[#D97706] uppercase tracking-wider relative z-10">
          <QrCode className="w-3.5 h-3.5 animate-pulse" /> Classroom Projector QR Code
        </div>

        <h4 className="text-xs font-black text-[#2D2A26] px-4 truncate relative z-10 animate-pulse" title={name}>
          {name}
        </h4>

        {/* Realistic Lens-Focusing Entrance */}
        <div style={{ animation: 'lens 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} className="flex justify-center relative z-10">
          <DesignerQrCanvas url={url} config={config} title={name} size={180} />
        </div>

        <div className="p-2.5 bg-[#F8F6F0]/95 rounded-xl border border-[#2D2A26]/10 text-[11px] text-[#2D2A26]/80 flex items-center gap-2 justify-center relative z-10 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span>Point your phone or tablet camera at the code to open the task.</span>
        </div>

        <button type="button" onClick={onClose} className="w-full py-2.5 bg-[#2D2A26] hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs relative z-10">
          Close Preview
        </button>
      </div>
    </div>
  );
};
