import React, { useState } from 'react';
import { Image as ImageIcon, Video, Link as LinkIcon, Trash2, ExternalLink, QrCode } from 'lucide-react';
import { ChunkAttachment } from '../../../types';
import { DEFAULT_QR_CONFIG, QrDesignConfig } from '../link_modal/designer_qr/types';
import { AttachmentQrThumbnail } from './AttachmentQrThumbnail';
import { AttachmentQrModal } from './AttachmentQrModal';

interface Props {
  att: ChunkAttachment;
  onRemove: (id: string) => void;
}

export const AttachmentItemCard: React.FC<Props> = ({ att, onRemove }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const imgSrc = att.microThumbnail || (att.type === 'image' ? att.url : undefined);
  const hasQr = Boolean(att.qrDesign || (att.url && (att.type === 'quiz' || att.type === 'document')));
  const qrConfig: QrDesignConfig = (att.qrDesign as QrDesignConfig) || DEFAULT_QR_CONFIG;

  return (
    <div className="p-2.5 bg-white border border-[#2D2A26]/15 rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:border-[#D97706]/40 transition-colors">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {hasQr && att.url ? (
          <AttachmentQrThumbnail
            url={att.url}
            config={qrConfig}
            title={att.name}
            onClick={() => setShowQrModal(true)}
          />
        ) : imgSrc ? (
          <img src={imgSrc} alt={att.name} className="w-12 h-12 rounded-lg object-cover border border-[#2D2A26]/10 shrink-0 bg-[#F8F6F0]" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-[#F8F6F0] border border-[#2D2A26]/10 flex items-center justify-center shrink-0">
            {att.type === 'video' ? <Video className="w-5 h-5 text-[#D97706]" /> : <LinkIcon className="w-5 h-5 text-[#D97706]" />}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[#2D2A26] truncate" title={att.name}>{att.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            {hasQr && att.url && (
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="text-[10px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                title="Click to view full scannable QR code"
              >
                <QrCode className="w-3 h-3 text-[#D97706]" /> Scannable QR
              </button>
            )}
            <span className="text-[10px] font-semibold text-[#D97706] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              {att.type === 'image' ? 'Visual' : att.type === 'video' ? 'Video' : att.type === 'quiz' ? (att.platform === 'kahoot' ? 'Kahoot' : att.platform === 'google_forms' ? 'Google Form' : 'Quiz Link') : att.type === 'document' ? 'Document' : 'Link'}
            </span>
            {att.udlPathway && (
              <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 capitalize">
                UDL: {att.udlPathway}
              </span>
            )}
            {att.url && (
              <a href={att.url} target="_blank" rel="noreferrer" className="text-[10px] text-[#2D2A26]/60 hover:text-[#D97706] flex items-center gap-0.5">
                Open <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <button type="button" onClick={() => onRemove(att.id)} title="Remove attachment" className="p-1.5 text-[#2D2A26]/40 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors shrink-0">
        <Trash2 className="w-4 h-4" />
      </button>

      {showQrModal && att.url && (
        <AttachmentQrModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={att.url} name={att.name} config={qrConfig} />
      )}
    </div>
  );
};
