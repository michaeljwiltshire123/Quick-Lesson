import React, { useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { QrDesignConfig } from '../link_modal/designer_qr/types';
import { renderDesignerQrToCanvas } from '../link_modal/designer_qr/qrCanvasRenderer';

interface Props {
  url: string;
  config: QrDesignConfig;
  size?: number;
  title?: string;
  onClick?: () => void;
}

export const AttachmentQrThumbnail: React.FC<Props> = ({
  url, config, size = 64, title = '', onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeUrl = url.trim() || 'https://quicklesson.uk/activity';

  useEffect(() => {
    if (canvasRef.current) {
      renderDesignerQrToCanvas(canvasRef.current, activeUrl, config, size * 2);
    }
  }, [activeUrl, config, size]);

  return (
    <div
      onClick={onClick}
      title="Click to enlarge scannable QR code for students"
      className="relative group w-14 h-14 rounded-lg overflow-hidden border border-[#2D2A26]/15 shrink-0 bg-white cursor-pointer shadow-2xs hover:ring-2 hover:ring-[#D97706]/40 transition-all flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="w-full h-full object-contain block"
        title={`QR code for ${title || activeUrl}`}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
        <Maximize2 className="w-3.5 h-3.5 drop-shadow-md text-amber-300" />
      </div>
    </div>
  );
};
