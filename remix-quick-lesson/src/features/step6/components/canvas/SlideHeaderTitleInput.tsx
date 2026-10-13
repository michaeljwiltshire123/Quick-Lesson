import React from 'react';
import { Sparkles } from 'lucide-react';
import { EditableTitleBox } from './elements/EditableTitleBox';

interface SlideHeaderTitleInputProps {
  title: string;
  subtitle?: string;
  isTitleArchetype: boolean;
  isRainbowHeader?: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (sub: string) => void;
}

const isTechnicalPlaceholder = (text?: string): boolean => {
  if (!text) return true;
  const lower = text.toLowerCase().trim();
  return (
    lower === 'classroom visual resource' ||
    lower === 'standard layout' ||
    lower.includes('drag onto concept slide') ||
    lower === 'lesson visual asset' ||
    lower === 'visual teaching asset'
  );
};

export const SlideHeaderTitleInput: React.FC<SlideHeaderTitleInputProps> = ({
  title, subtitle, isTitleArchetype, isRainbowHeader, onUpdateTitle, onUpdateSubtitle,
}) => {
  const showSubtitle = !isTechnicalPlaceholder(subtitle);

  return (
    <div className={`${isTitleArchetype ? 'space-y-3 px-5 pt-7 pb-3 text-center' : 'space-y-0.5'} z-20 w-full`}>
      <div className="border border-dashed border-transparent hover:border-stone-400/60 focus-within:border-amber-600 rounded-xs p-1 transition-all">
        <div className={isRainbowHeader ? 'bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent' : 'text-inherit'}>
          <EditableTitleBox title={title} onChange={onUpdateTitle} isCover={isTitleArchetype} />
        </div>
      </div>
      {showSubtitle && (
        <div className="border border-dashed border-transparent hover:border-stone-300 focus-within:border-amber-500 rounded-xs px-1 py-0.5 flex items-center gap-2 transition-all">
          {isTitleArchetype && <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
          <input
            type="text" value={subtitle || ''} onChange={(e) => onUpdateSubtitle(e.target.value)}
            placeholder="Learning intention or focus aim..." aria-label="Slide Subtitle"
            className={`${isTitleArchetype ? 'text-base md:text-lg text-center' : 'text-xs md:text-sm'} w-full font-medium opacity-80 italic bg-transparent focus:outline-none transition-all`}
          />
        </div>
      )}
    </div>
  );
};
