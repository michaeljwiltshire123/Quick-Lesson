import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Crop } from 'lucide-react';
import { CropTransform, generateCircularThumb } from './cropUtils';
import { CropViewport } from './CropViewport';

interface CircularCropModalProps {
  imageSrc: string;
  onCropComplete: (base64Thumb: string) => void;
  onClose: () => void;
}

export const CircularCropModal: React.FC<CircularCropModalProps> = ({ imageSrc, onCropComplete, onClose }) => {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [transform, setTransform] = useState<CropTransform>({ x: 0, y: 0, scale: 1 });
  const [previewThumb, setPreviewThumb] = useState<string>('');

  useEffect(() => {
    const el = new Image();
    el.crossOrigin = 'anonymous';
    el.onload = () => {
      setImg(el);
      setTransform({ x: 0, y: 0, scale: Math.max(220 / el.width, 220 / el.height, 0.8) });
    };
    el.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (img) setPreviewThumb(generateCircularThumb(img, transform, 240, 80));
  }, [img, transform]);

  const handleApply = () => {
    if (!img) return;
    onCropComplete(generateCircularThumb(img, transform, 240, 80));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-[#2D2A26]/15 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <Crop className="w-4 h-4 text-[#D97706]" /><h3 className="text-sm font-bold text-[#2D2A26]">Circular Icon Cropper</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-[#2D2A26]/50 hover:text-[#2D2A26] rounded-full hover:bg-black/5 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex flex-col items-center gap-3">
          {img ? <CropViewport image={img} transform={transform} onTransformChange={setTransform} size={240} /> : <div className="w-60 h-60 bg-[#F8F6F0] rounded-2xl flex items-center justify-center text-xs text-[#2D2A26]/50">Loading image...</div>}
          <div className="w-full flex items-center gap-2 px-1">
            <ZoomOut className="w-3.5 h-3.5 text-[#2D2A26]/60" />
            <input type="range" min="0.3" max="3" step="0.05" value={transform.scale} onChange={(e) => setTransform((t) => ({ ...t, scale: parseFloat(e.target.value) }))} className="flex-1 accent-[#D97706] cursor-pointer h-1.5 bg-[#2D2A26]/10 rounded-lg" />
            <ZoomIn className="w-3.5 h-3.5 text-[#2D2A26]/60" />
            <button type="button" onClick={() => setTransform((t) => ({ ...t, x: 0, y: 0 }))} title="Reset Position" className="p-1.5 bg-[#F8F6F0] hover:bg-black/5 rounded-lg text-[#2D2A26]/70 border border-[#2D2A26]/15 cursor-pointer"><RotateCcw className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#2D2A26]/10">
          <div className="flex items-center gap-2">
            {previewThumb && <img src={previewThumb} alt="Circular icon badge preview" className="w-9 h-9 rounded-full border-2 border-[#D97706] shadow-xs object-cover" />}
            <span className="text-[11px] font-semibold text-[#2D2A26]/70">Flattened &lt;3KB</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs font-bold text-[#2D2A26]/70 hover:bg-black/5 rounded-xl border border-[#2D2A26]/15 cursor-pointer">Cancel</button>
            <button type="button" onClick={handleApply} className="px-4 py-1.5 text-xs font-bold bg-[#D97706] hover:bg-amber-600 text-white rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"><Check className="w-3.5 h-3.5" /> Apply Icon</button>
          </div>
        </div>
      </div>
    </div>
  );
};
