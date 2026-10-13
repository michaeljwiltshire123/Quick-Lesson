import React from 'react';
import { Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

export type MediaSubTabType = 'image' | 'video';

interface MediaSubTabHeaderProps {
  activeSubTab: MediaSubTabType;
  onChangeSubTab: (tab: MediaSubTabType) => void;
}

const TABS = [
  { id: 'image' as const, label: 'Image', icon: ImageIcon },
  { id: 'video' as const, label: 'Video', icon: VideoIcon },
];

export const MediaSubTabHeader: React.FC<MediaSubTabHeaderProps> = ({
  activeSubTab, onChangeSubTab,
}) => {
  return (
    <div className="relative pt-1 select-none">
      <div className="flex items-end gap-1 px-0.5">
        {TABS.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeSubTab(tab.id)}
              className={`relative flex-1 py-2 px-1.5 rounded-t-xl text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all border-t border-x ${
                isActive
                  ? 'bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 text-white border-amber-600 shadow-md z-10 -mb-[2px] pb-2.5'
                  : 'bg-gradient-to-b from-stone-100 to-stone-200 hover:from-white hover:to-stone-100 text-stone-700 border-stone-300 shadow-2xs'
              }`}
            >
              <div className={`absolute top-0 inset-x-0 h-[2px] rounded-t-xl ${isActive ? 'bg-amber-300/60' : 'bg-white/80'}`} />
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-200' : 'text-stone-500'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="h-[3px] bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 w-full rounded-full shadow-xs" />
    </div>
  );
};
