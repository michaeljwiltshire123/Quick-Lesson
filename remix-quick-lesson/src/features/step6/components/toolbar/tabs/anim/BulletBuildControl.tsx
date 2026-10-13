import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { ListPlus, Sparkles, Check } from 'lucide-react';

interface BulletBuildControlProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

export const BulletBuildControl: React.FC<BulletBuildControlProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const isTextElement = selectedElement?.type === 'text';
  const isBulletBuild = Boolean(selectedElement?.meta?.isBulletBuild);

  return (
    <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <ListPlus className="w-3.5 h-3.5 text-amber-700" />
          <span>Sequential Bullet Build</span>
        </span>
        {isBulletBuild && (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-0.5">
            <Check className="w-2.5 h-2.5" /> Active
          </span>
        )}
      </div>

      <p className="text-[10px] text-stone-500">
        Reveal paragraph and list items one click at a time during classroom projection.
      </p>

      <button
        type="button"
        disabled={!isTextElement}
        onClick={() => onUpdateElementMeta({ isBulletBuild: !isBulletBuild })}
        className={`w-full py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
          isBulletBuild
            ? 'bg-amber-800 text-white border-amber-900 shadow-2xs'
            : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
        } disabled:opacity-40`}
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>{isBulletBuild ? 'Disable Bullet Build' : 'Enable Bullet-by-Bullet Build'}</span>
      </button>

      {!isTextElement && selectedElement && (
        <span className="text-[9.5px] text-stone-400 italic block text-center">
          Select a text box to enable sequential bullet reveals.
        </span>
      )}
    </div>
  );
};
