import React from 'react';
import { Tv, Monitor, Sun } from 'lucide-react';

interface VideoFrameControlsProps {
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

const VIDEO_CORNERS = [
  { val: 0, label: 'Sharp' },
  { val: 12, label: 'Cinema' },
  { val: 24, label: 'Pill' },
];

const VIDEO_SHADOWS = [
  { id: 'none', label: 'None' },
  { id: 'soft', label: 'Room Drop' },
  { id: 'floating', label: 'Floating' },
  { id: 'glow', label: 'Cinema Glow' },
];

const VIDEO_BORDERS = [
  { w: 0, label: 'Frameless' },
  { w: 2, label: 'Display 2px' },
  { w: 4, label: 'Bezel 4px' },
];

export const VideoFrameControls: React.FC<VideoFrameControlsProps> = ({ meta = {}, onUpdateMeta }) => {
  const radius = meta.imageRadius ?? 12;
  const shadow = meta.shadowStyle || 'soft';
  const borderWidth = meta.imageBorderWidth ?? 0;

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="space-y-1">
        <span className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
          <Monitor className="w-3 h-3 text-amber-700" /><span>Screen Corners</span>
        </span>
        <div className="grid grid-cols-3 gap-1">
          {VIDEO_CORNERS.map((c) => (
            <button
              key={c.val} type="button" onClick={() => onUpdateMeta({ imageRadius: c.val })}
              className={`py-1 px-1 rounded-lg border text-[10px] font-semibold text-center cursor-pointer transition-colors ${
                radius === c.val ? 'bg-amber-700 border-amber-800 text-white' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >{c.label}</button>
          ))}
        </div>
      </div>

      <div className="space-y-1 pt-1 border-t border-stone-200">
        <span className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
          <Sun className="w-3 h-3 text-amber-700" /><span>Screen Elevation & Shadow</span>
        </span>
        <div className="grid grid-cols-2 gap-1">
          {VIDEO_SHADOWS.map((s) => (
            <button
              key={s.id} type="button"
              onClick={() => onUpdateMeta({ shadowStyle: s.id, shadowDistance: s.id === 'glow' ? 0 : 12, shadowBlur: s.id === 'glow' ? 20 : 18, shadowColor: s.id === 'glow' ? '#D97706' : '#1C1917' })}
              className={`py-1 px-1.5 rounded-lg border text-[10px] font-semibold text-center cursor-pointer transition-colors ${
                shadow === s.id ? 'bg-amber-700 border-amber-800 text-white' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >{s.label}</button>
          ))}
        </div>
      </div>

      <div className="space-y-1 pt-1 border-t border-stone-200">
        <span className="text-[10px] text-stone-600 font-semibold flex items-center gap-1">
          <Tv className="w-3 h-3 text-amber-700" /><span>Monitor Frame Bezel</span>
        </span>
        <div className="grid grid-cols-3 gap-1">
          {VIDEO_BORDERS.map((b) => (
            <button
              key={b.w} type="button" onClick={() => onUpdateMeta({ imageBorderWidth: b.w, imageBorderColor: '#1C1917' })}
              className={`py-1 px-1 rounded-lg border text-[10px] font-semibold text-center cursor-pointer transition-colors ${
                borderWidth === b.w ? 'bg-amber-700 border-amber-800 text-white' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >{b.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
};
