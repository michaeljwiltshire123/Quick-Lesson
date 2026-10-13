import React, { useState, useEffect } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { compressImageWithDetails, computeFittedElementDimensions } from '../../utils/imageCompressor';
import { X, ShieldCheck, Upload, Trash2 } from 'lucide-react';
import { LogoManagerControls } from './LogoManagerControls';

interface LogoManagerModalProps {
  isOpen: boolean;
  existingCrest?: SlideElement;
  onClose: () => void;
  onAddCrestToAllSlides?: (crestElement: SlideElement) => void;
  onRemoveCrestFromAllSlides?: () => void;
  onUpdateCrestOpacity?: (opacity: number) => void;
  onToggleCrestLock?: (isLocked: boolean) => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({
  isOpen, existingCrest, onClose, onAddCrestToAllSlides, onRemoveCrestFromAllSlides, onUpdateCrestOpacity, onToggleCrestLock,
}) => {
  const [crestThumbnail, setCrestThumbnail] = useState<string | null>(existingCrest?.content || null);
  const [opacity, setOpacity] = useState<number>(existingCrest?.meta?.opacity ?? 75);
  const isLocked = existingCrest?.meta?.isLocked ?? true;

  useEffect(() => {
    if (existingCrest?.content) setCrestThumbnail(existingCrest.content);
    if (existingCrest?.meta?.opacity !== undefined) setOpacity(existingCrest.meta.opacity);
  }, [existingCrest]);

  if (!isOpen) return null;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const details = await compressImageWithDetails(file, 320);
      setCrestThumbnail(details.dataUrl);
      const { width, height } = computeFittedElementDimensions(details.aspectRatio, 15);
      const x = Math.max(2, Math.min(84, 97 - width));
      const y = 3;

      onAddCrestToAllSlides?.({
        id: `el-crest-${Date.now()}`,
        type: 'image',
        x, y, width, height,
        content: details.dataUrl,
        caption: 'School Logo / Crest',
        meta: {
          isSchoolCrest: true,
          isSchoolLogo: true,
          opacity,
          isLocked: false,
          naturalAspect: details.aspectRatio,
          linkToSlideId: 'slide-aims-outcomes',
          isAimsReturnAnchor: true,
        },
      });
    } catch { /* ignored */ }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl max-w-sm w-full p-4 space-y-3 text-stone-800">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <h3 className="font-extrabold text-sm text-stone-900">Add School Logo / Crest</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-snug">
          Upload your school crest. It will automatically pin across all slides and provide an automatic link back to the Lesson Aims page.
        </p>

        <div className="flex items-center gap-2 pt-1">
          {crestThumbnail ? (
            <div className="relative w-14 h-14 bg-stone-50 rounded-xl border border-stone-300 p-1 flex items-center justify-center shrink-0 shadow-2xs">
              <img src={crestThumbnail} alt="Logo preview" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl border-2 border-dashed border-stone-300 flex items-center justify-center shrink-0 text-stone-400 bg-stone-50">
              <ShieldCheck className="w-6 h-6 opacity-40 text-stone-500" />
            </div>
          )}

          <div className="flex-1 space-y-1.5">
            <label className="w-full py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors">
              <Upload className="w-3.5 h-3.5 text-amber-200" />
              <span>{crestThumbnail ? 'Replace Logo' : 'Upload Logo'}</span>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
            {crestThumbnail && onRemoveCrestFromAllSlides && (
              <button type="button" onClick={() => { setCrestThumbnail(null); onRemoveCrestFromAllSlides(); }} className="w-full py-1 px-2 bg-white hover:bg-rose-50 text-rose-700 border border-stone-200 rounded-lg font-semibold text-[10.5px] flex items-center justify-center gap-1 cursor-pointer">
                <Trash2 className="w-3 h-3" /><span>Remove Logo from All</span>
              </button>
            )}
          </div>
        </div>

        {crestThumbnail && (
          <LogoManagerControls
            isLocked={isLocked} opacity={opacity}
            onToggleLock={(l) => onToggleCrestLock?.(l)}
            onUpdateOpacity={(o) => { setOpacity(o); onUpdateCrestOpacity?.(o); }}
          />
        )}
      </div>
    </div>
  );
};
