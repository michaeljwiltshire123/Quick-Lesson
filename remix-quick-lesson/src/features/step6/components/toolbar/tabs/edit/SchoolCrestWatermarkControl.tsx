import React, { useState, useEffect } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { compressImageWithDetails, computeFittedElementDimensions } from '../../../../utils/imageCompressor';
import { ShieldCheck, Upload, Trash2 } from 'lucide-react';
import { SchoolCrestLockAndOpacity } from './SchoolCrestLockAndOpacity';

interface SchoolCrestWatermarkControlProps {
  existingCrest?: SlideElement;
  onAddCrestToAllSlides?: (crestElement: SlideElement) => void;
  onRemoveCrestFromAllSlides?: () => void;
  onUpdateCrestOpacity?: (opacity: number) => void;
  onToggleCrestLock?: (isLocked: boolean) => void;
}

export const SchoolCrestWatermarkControl: React.FC<SchoolCrestWatermarkControlProps> = ({
  existingCrest, onAddCrestToAllSlides, onRemoveCrestFromAllSlides, onUpdateCrestOpacity, onToggleCrestLock,
}) => {
  const [crestThumbnail, setCrestThumbnail] = useState<string | null>(existingCrest?.content || null);
  const [opacity, setOpacity] = useState<number>(existingCrest?.meta?.opacity ?? 75);
  const isLocked = existingCrest?.meta?.isLocked ?? true;

  useEffect(() => {
    if (existingCrest?.content) setCrestThumbnail(existingCrest.content);
    if (existingCrest?.meta?.opacity !== undefined) setOpacity(existingCrest.meta.opacity);
  }, [existingCrest]);

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
        caption: 'School Crest / Watermark',
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
    <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
      <div className="flex items-center justify-between text-[11px] font-bold text-stone-800">
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-700" />Master School Crest</span>
        <span className="text-[10px] text-amber-900 bg-amber-100 font-bold px-1.5 py-0.5 rounded">All Slides</span>
      </div>

      <div className="flex items-center gap-2 pt-0.5">
        {crestThumbnail ? (
          <div className="relative w-12 h-12 bg-white rounded-lg border border-stone-300 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
            <img src={crestThumbnail} alt="Crest preview" className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg border-2 border-dashed border-stone-300 flex items-center justify-center shrink-0 text-stone-400">
            <ShieldCheck className="w-5 h-5 opacity-40" />
          </div>
        )}

        <div className="flex-1 space-y-1">
          <label className="w-full py-1.5 px-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer shadow-2xs">
            <Upload className="w-3 h-3 text-amber-200" />
            <span>{crestThumbnail ? 'Replace Crest' : 'Upload Crest'}</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
          {crestThumbnail && onRemoveCrestFromAllSlides && (
            <button type="button" onClick={() => { setCrestThumbnail(null); onRemoveCrestFromAllSlides(); }} className="w-full py-1 px-2 bg-white hover:bg-rose-50 text-rose-700 border border-stone-200 rounded-lg font-semibold text-[10px] flex items-center justify-center gap-1 cursor-pointer">
              <Trash2 className="w-3 h-3" /><span>Remove from All</span>
            </button>
          )}
        </div>
      </div>

      {crestThumbnail && (
        <SchoolCrestLockAndOpacity
          isLocked={isLocked} opacity={opacity}
          onToggleCrestLock={onToggleCrestLock} onUpdateCrestOpacity={onUpdateCrestOpacity} setOpacity={setOpacity}
        />
      )}
    </div>
  );
};
