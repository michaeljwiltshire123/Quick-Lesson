import React, { useRef } from 'react';
import { FlipHorizontal, FlipVertical, Maximize, Lock, Unlock, Upload } from 'lucide-react';
import { compressImageWithDetails } from '../../../../utils/imageCompressor';

interface ImageTransformControlsProps {
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
  onReplaceContent?: (newUrl: string) => void;
}

export const ImageTransformControls: React.FC<ImageTransformControlsProps> = ({
  meta = {}, onUpdateMeta, onReplaceContent,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isFlipH = Boolean(meta.flipH);
  const isFlipV = Boolean(meta.flipV);
  const isAspectLocked = Boolean(meta.lockAspect);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const details = await compressImageWithDetails(file, 960);
      onReplaceContent?.(details.dataUrl);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => onUpdateMeta({ flipH: !isFlipH })}
          className={`py-1.5 px-2 rounded-lg border text-[10.5px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
            isFlipH ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
          }`}
        >
          <FlipHorizontal className="w-3.5 h-3.5 text-amber-700" />
          <span>Flip Horizontal</span>
        </button>

        <button
          type="button"
          onClick={() => onUpdateMeta({ flipV: !isFlipV })}
          className={`py-1.5 px-2 rounded-lg border text-[10.5px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
            isFlipV ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
          }`}
        >
          <FlipVertical className="w-3.5 h-3.5 text-amber-700" />
          <span>Flip Vertical</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-stone-200">
        <button
          type="button"
          onClick={() => onUpdateMeta({ lockAspect: !isAspectLocked })}
          className={`py-1.5 px-2 rounded-lg border text-[10.5px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
            isAspectLocked ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
          }`}
        >
          {isAspectLocked ? <Lock className="w-3.5 h-3.5 text-amber-700" /> : <Unlock className="w-3.5 h-3.5 text-stone-500" />}
          <span>{isAspectLocked ? 'Aspect Locked' : 'Aspect Free'}</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="py-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[10.5px] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-amber-700" />
          <span>Replace Image</span>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      </div>
    </div>
  );
};
