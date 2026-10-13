import React from 'react';
import { ExternalLink, Sparkles, Gift } from 'lucide-react';
import { AI_VIDEO_PLATFORMS } from './presetData';

export const AiVideoPlatformLaunchers: React.FC = () => {
  return (
    <div className="space-y-2 pt-1 border-t border-[#2D2A26]/10">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#2D2A26] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Launch AI Video Generators
        </span>
        <span className="text-[11px] font-semibold text-[#2D2A26]/65 flex items-center gap-1">
          <Gift className="w-3 h-3 text-[#D97706]" /> Free teacher allowances noted
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {AI_VIDEO_PLATFORMS.map((plat) => {
          const isFullFree = plat.freeTier.includes('100%');
          return (
            <a
              key={plat.name}
              href={plat.url}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white hover:bg-[#F8F6F0] border border-[#2D2A26]/15 hover:border-[#D97706]/50 rounded-xl flex flex-col justify-between gap-1.5 shadow-2xs transition-all group"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-[#2D2A26] group-hover:text-[#D97706] transition-colors truncate">
                  {plat.name}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#2D2A26]/40 group-hover:text-[#D97706] shrink-0" />
              </div>
              <div className="flex items-center justify-between gap-1 pt-0.5">
                <span className="text-[10px] text-[#2D2A26]/60 truncate">{plat.desc}</span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border shrink-0 ${
                    isFullFree
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  {plat.freeTier}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
