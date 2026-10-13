import React from 'react';
import { Smartphone, Monitor, Gauge } from 'lucide-react';

interface VideoAspectAndSpeedControlsProps {
  aspectRatio?: string;
  playbackSpeed?: number;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9 Cinema', icon: Monitor, desc: 'Standard widescreen' },
  { id: '9:16', label: '9:16 Shorts', icon: Smartphone, desc: 'Vertical mobile frame' },
  { id: '4:3', label: '4:3 Classic', icon: Monitor, desc: 'Retro presentation' },
];

const SPEED_PRESETS = [0.5, 0.75, 1, 1.25, 1.5];

export const VideoAspectAndSpeedControls: React.FC<VideoAspectAndSpeedControlsProps> = ({
  aspectRatio = '16:9', playbackSpeed = 1, onUpdateMeta,
}) => {
  return (
    <div className="space-y-2.5 pt-1 text-xs text-stone-700">
      <div className="space-y-1">
        <label className="text-[10px] text-stone-600 font-semibold flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Monitor className="w-3 h-3 text-amber-700" />
            <span>Frame Ratio (Shorts & Vertical)</span>
          </span>
          {aspectRatio === '9:16' && (
            <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1 rounded">No Black Bars</span>
          )}
        </label>
        <div className="grid grid-cols-3 gap-1">
          {ASPECT_RATIOS.map((item) => {
            const Icon = item.icon;
            const isSel = aspectRatio === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onUpdateMeta({ aspectRatio: item.id })}
                className={`p-1.5 rounded-lg border text-center cursor-pointer transition-all ${
                  isSel ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
                title={item.desc}
              >
                <Icon className="w-3.5 h-3.5 mx-auto mb-0.5 text-stone-600" />
                <div className="text-[10px] truncate">{item.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1 pt-1 border-t border-stone-200">
        <label className="text-[10px] text-stone-600 font-semibold flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3 text-amber-700" />
            <span>Playback Speed Governor</span>
          </span>
          <span className="text-[10px] font-mono font-extrabold text-amber-800">{playbackSpeed}× Speed</span>
        </label>
        <div className="grid grid-cols-5 gap-1">
          {SPEED_PRESETS.map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => onUpdateMeta({ playbackSpeed: spd })}
              className={`py-1 rounded-lg border text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                playbackSpeed === spd ? 'bg-amber-800 border-amber-900 text-white' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {spd}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
