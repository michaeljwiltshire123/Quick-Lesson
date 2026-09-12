import React from 'react';
import { QrCode, CheckCircle2, Circle } from 'lucide-react';
import { QrDesignConfig } from './types';
import { DesignerQrCanvas } from './DesignerQrCanvas';
import { QrStyleControls } from './QrStyleControls';

interface LinkQrDesignerSectionProps {
  url: string;
  title?: string;
  config: QrDesignConfig;
  onChange: (updated: Partial<QrDesignConfig>) => void;
}

export const LinkQrDesignerSection: React.FC<LinkQrDesignerSectionProps> = ({
  url,
  title = '',
  config,
  onChange,
}) => {
  return (
    <div className="p-3.5 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 rounded-2xl border border-[#D97706]/20 shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-[#D97706]" />
          <span className="text-xs font-bold text-[#2D2A26]">Designer QR Studio (Handout & Screen)</span>
        </div>
        <button
          type="button"
          onClick={() => onChange({ enabled: !config.enabled })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98 ${
            config.enabled
              ? 'bg-[#D97706] text-white ring-2 ring-[#D97706]/30'
              : 'bg-[#F8F6F0] text-[#2D2A26]/70 border border-[#2D2A26]/20 hover:bg-white'
          }`}
        >
          {config.enabled ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          ) : (
            <Circle className="w-3.5 h-3.5 text-[#2D2A26]/40" />
          )}
          <span>Create and add QR Code</span>
        </button>
      </div>

      {config.enabled && (
        <div className="flex flex-col md:flex-row items-start gap-3.5">
          <div className="shrink-0 mx-auto md:mx-0">
            <DesignerQrCanvas url={url} config={config} title={title} size={130} />
          </div>
          <QrStyleControls config={config} onChange={onChange} />
        </div>
      )}

      {!config.enabled && (
        <div className="p-2.5 bg-white/70 rounded-xl border border-dashed border-[#2D2A26]/15 flex items-center justify-between text-xs text-[#2D2A26]/70">
          <span>Click <strong>'Create and add QR Code'</strong> above to customise and embed a scannable QR code for this link.</span>
        </div>
      )}
    </div>
  );
};
