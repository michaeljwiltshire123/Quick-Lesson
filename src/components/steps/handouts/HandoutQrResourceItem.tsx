import React from 'react';
import { Square, Swords } from 'lucide-react';
import { ChunkAttachment } from '../../../types';
import { DesignerQrCanvas } from '../link_modal/designer_qr/DesignerQrCanvas';
import { DEFAULT_QR_CONFIG } from '../link_modal/designer_qr/types';

interface HandoutQrResourceItemProps {
  attachment: ChunkAttachment;
}

export const HandoutQrResourceItem: React.FC<HandoutQrResourceItemProps> = ({ attachment }) => {
  if (!attachment.url) return null;
  const isQrEnabled = attachment.qrDesign?.enabled === true;
  const qrConfig = (attachment.qrDesign as any) || DEFAULT_QR_CONFIG;
  const hasQuests = Array.isArray(attachment.questSteps) && attachment.questSteps.length > 0;

  return (
    <div className="p-3 bg-white border border-[#2D2A26]/15 rounded-xl flex flex-col sm:flex-row items-start gap-3 shadow-2xs break-inside-avoid">
      {isQrEnabled && (
        <div className="shrink-0 self-center sm:self-start">
          <DesignerQrCanvas url={attachment.url} config={qrConfig} title={attachment.name} size={100} />
        </div>
      )}
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#2D2A26] truncate">{attachment.name}</span>
          {attachment.udlPathway && (
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wide">
              UDL {attachment.udlPathway}
            </span>
          )}
          {attachment.sharingMode && attachment.sharingMode !== 'standard' && (
            <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wide">
              {attachment.sharingMode === 'copy' ? 'Force Copy' : 'Template Preview'}
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#2D2A26]/60 truncate font-mono">{attachment.url}</p>
        {attachment.cfuPrompt ? (
          <p className="text-xs italic text-[#2D2A26]/85 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60 leading-relaxed">
            "{attachment.cfuPrompt}"
          </p>
        ) : (
          <p className="text-[11px] italic text-[#2D2A26]/50">
            {isQrEnabled ? 'Scan QR code to access the digital classroom task.' : 'Access the digital classroom task via the resource link.'}
          </p>
        )}

        {hasQuests && (
          <div className="pt-1 space-y-1">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
              <Swords className="w-3 h-3" /> Student Quest Check-steps:
            </div>
            <div className="space-y-1 pl-1">
              {attachment.questSteps!.map((step, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-[#2D2A26]">
                  <Square className="w-3.5 h-3.5 text-[#2D2A26]/40 shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
