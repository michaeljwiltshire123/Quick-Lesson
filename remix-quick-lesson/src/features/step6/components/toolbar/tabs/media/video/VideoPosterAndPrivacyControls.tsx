import React from 'react';
import { extractYouTubeId, getYouTubeSnapshots } from '../../../../../utils/videoLinkValidator';
import { ShieldCheck, Subtitles, Image as ImageIcon } from 'lucide-react';

interface VideoPosterAndPrivacyControlsProps {
  content?: string;
  meta?: Record<string, any>;
  onUpdateMeta: (patch: Record<string, any>) => void;
}

export const VideoPosterAndPrivacyControls: React.FC<VideoPosterAndPrivacyControlsProps> = ({
  content = '', meta = {}, onUpdateMeta,
}) => {
  const ytId = extractYouTubeId(content);
  const snapshots = ytId ? getYouTubeSnapshots(ytId) : null;
  const posterChoice = meta.posterChoice || 'default';
  const forceCaptions = Boolean(meta.forceCaptions);
  const isClassroomClean = meta.isClassroomClean !== false;

  return (
    <div className="space-y-2.5 pt-1 text-xs text-stone-700">
      <div className="space-y-1.5">
        <label className="text-[10px] text-stone-600 font-semibold flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ImageIcon className="w-3 h-3 text-amber-700" />
            <span>Poster Freeze-Frame Picker</span>
          </span>
          <span className="text-[9px] text-stone-500">Preview before play</span>
        </label>
        {snapshots ? (
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'default', label: 'Default', url: snapshots.default },
              { id: 'start', label: '25%', url: snapshots.start },
              { id: 'mid', label: '50%', url: snapshots.mid },
              { id: 'end', label: '75%', url: snapshots.end },
            ].map((snap) => (
              <button
                key={snap.id}
                type="button"
                onClick={() => onUpdateMeta({ posterChoice: snap.id, customPosterUrl: snap.url })}
                className={`p-1 rounded-lg border flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                  posterChoice === snap.id ? 'bg-amber-100 border-amber-500 shadow-2xs' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <img src={snap.url} alt="" className="w-full h-8 object-cover rounded" />
                <span className="text-[9px] font-bold text-stone-700 truncate">{snap.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <input
            type="url"
            value={meta.customPosterUrl || ''}
            placeholder="Custom freeze-frame image URL"
            onChange={(e) => onUpdateMeta({ customPosterUrl: e.target.value, posterChoice: 'custom' })}
            className="w-full text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg"
          />
        )}
      </div>

      <div className="space-y-1.5 pt-1 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-stone-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Classroom Distraction Shield</span>
          </span>
          <input
            type="checkbox"
            checked={isClassroomClean}
            onChange={(e) => onUpdateMeta({ isClassroomClean: e.target.checked })}
            className="accent-amber-700 cursor-pointer"
          />
        </div>
        <p className="text-[9.5px] text-stone-500">Strips algorithm recommendations and uses privacy-enhanced mode.</p>
      </div>

      <div className="space-y-1.5 pt-1 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-stone-800">
            <Subtitles className="w-3.5 h-3.5 text-amber-700" />
            <span>Force Closed Captions (Subtitles)</span>
          </span>
          <input
            type="checkbox"
            checked={forceCaptions}
            onChange={(e) => onUpdateMeta({ forceCaptions: e.target.checked })}
            className="accent-amber-700 cursor-pointer"
          />
        </div>
        <p className="text-[9.5px] text-stone-500">Ensures subtitles display automatically for pupil accessibility.</p>
      </div>
    </div>
  );
};
