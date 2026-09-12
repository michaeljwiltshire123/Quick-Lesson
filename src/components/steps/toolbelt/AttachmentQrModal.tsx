import React from 'react';
import { X, QrCode, Sparkles } from 'lucide-react';
import { QrDesignConfig } from '../link_modal/designer_qr/types';
import { DesignerQrCanvas } from '../link_modal/designer_qr/DesignerQrCanvas';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  name: string;
  config: QrDesignConfig;
}

export const AttachmentQrModal: React.FC<Props> = ({
  isOpen, onClose, url, name, config,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 text-[#2D2A26]/60 hover:text-[#2D2A26] rounded-lg hover:bg-black/5 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#D97706] uppercase tracking-wider">
          <QrCode className="w-4 h-4" /> Classroom Projector QR Code
        </div>

        <h4 className="text-sm font-black text-[#2D2A26] px-4 truncate" title={name}>
          {name}
        </h4>

        <div className="flex justify-center">
          <DesignerQrCanvas url={url} config={config} title={name} size={180} />
        </div>

        <div className="p-2.5 bg-[#F8F6F0] rounded-xl border border-[#2D2A26]/10 text-xs text-[#2D2A26]/80 flex items-center gap-2 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span>Point your phone or tablet camera at the code to open the task.</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-[#2D2A26] hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs"
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};
