import React, { useRef, useEffect } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { QrDesignConfig } from './types';
import { renderDesignerQrToCanvas } from './qrCanvasRenderer';

interface DesignerQrCanvasProps {
  url: string;
  config: QrDesignConfig;
  title?: string;
  size?: number;
}

export const DesignerQrCanvas: React.FC<DesignerQrCanvasProps> = ({
  url,
  config,
  title = '',
  size = 140,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeUrl = url.trim() || 'https://quicklesson.uk/activity-preview';

  useEffect(() => {
    if (canvasRef.current) {
      renderDesignerQrToCanvas(canvasRef.current, activeUrl, config, size);
    }
  }, [activeUrl, config, size]);

  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
      <div className="relative overflow-hidden rounded-xl border border-black/5">
        <canvas
          ref={canvasRef}
          className="w-28 h-28 sm:w-32 sm:h-32 object-contain block transition-all"
          title={`Designer QR for ${title || activeUrl}`}
        />
        {!url.trim() && (
          <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold bg-[#2D2A26]/80 text-white text-center py-0.5 rounded backdrop-blur-xs">
            Live Preview
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#2D2A26]/70">
        <Sparkles className="w-3 h-3 text-[#D97706]" />
        <span>Vector Canvas (Zero Storage)</span>
      </div>

      {url.trim() && (
        <a
          href={activeUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-bold text-[#D97706] hover:underline flex items-center gap-1"
        >
          <ExternalLink className="w-2.5 h-2.5" /> Test Link
        </a>
      )}
    </div>
  );
};
