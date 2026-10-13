import React, { useState } from 'react';
import { X, QrCode, FileText, ExternalLink, Check } from 'lucide-react';
import { LociScriptOutput } from './types';
import { generateLociDocumentData } from './lociDocExporter';
import { ChunkAttachment } from '../../../../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scriptData: LociScriptOutput;
  routeName: string;
  onSendToQr: (url: string, title: string) => void;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
}

export const LociExportDocModal: React.FC<Props> = ({
  isOpen, onClose, scriptData, routeName, onSendToQr, onAddAttachment,
}) => {
  const [mode, setMode] = useState<'journey' | 'cards'>('journey');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;
  const doc = generateLociDocumentData(scriptData, mode, routeName);

  const handleSendToQr = () => {
    onSendToQr(doc.url, doc.title);
    onClose();
  };

  const handleDirectAttach = () => {
    onAddAttachment?.({
      type: 'document',
      name: doc.title,
      url: doc.url,
      qrDesign: { enabled: false },
    });
    setCopied(true);
    setTimeout(() => { setCopied(false); onClose(); }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D97706]" />
            <h3 className="text-sm font-black text-[#2D2A26]">Add Document Link</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-[#2D2A26]/60 hover:text-[#2D2A26] cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex rounded-xl bg-[#E8E3D8] p-1 gap-1">
          <button type="button" onClick={() => setMode('journey')} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${mode === 'journey' ? 'bg-white text-[#2D2A26] shadow-2xs' : 'text-[#2D2A26]/60'}`}>Journey Walkthrough</button>
          <button type="button" onClick={() => setMode('cards')} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${mode === 'cards' ? 'bg-white text-[#2D2A26] shadow-2xs' : 'text-[#2D2A26]/60'}`}>Revision Cards</button>
        </div>

        <div className="bg-white p-3 rounded-xl border border-[#2D2A26]/10 space-y-2">
          <span className="text-xs font-bold text-[#2D2A26]">Would you like to attach this as a scannable QR code as well?</span>
          <p className="text-[11px] text-[#2D2A26]/70 leading-relaxed">
            Sending to the Link &amp; QR studio generates a classroom QR code for students to scan on paper handouts or digital slides.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <button type="button" onClick={handleSendToQr} className="w-full py-2.5 bg-[#D97706] hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs">
            <QrCode className="w-4 h-4" /> Yes, Send to Link &amp; QR Studio
          </button>
          <button type="button" onClick={handleDirectAttach} className="w-full py-2 bg-white hover:bg-[#F8F6F0] border border-[#2D2A26]/15 text-[#2D2A26] text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer">
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <FileText className="w-4 h-4 text-[#D97706]" />}
            {copied ? 'Attached!' : 'No, Attach Direct Document Link'}
          </button>
          <a href={doc.url} target="_blank" rel="noreferrer" className="w-full py-1.5 text-center text-[11px] font-semibold text-[#2D2A26]/70 hover:text-[#2D2A26] flex items-center justify-center gap-1 cursor-pointer">
            <ExternalLink className="w-3.5 h-3.5" /> Preview document in new tab
          </a>
        </div>
      </div>
    </div>
  );
};
