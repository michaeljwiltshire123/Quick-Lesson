import React from 'react';
import { PlayCircle, Activity, LogOut } from 'lucide-react';

export type AnimCategory = 'entrance' | 'motion_3d' | 'exit';

interface AnimationSegmentedCategorySelectorProps {
  activeCategory: AnimCategory;
  onSelectCategory: (cat: AnimCategory) => void;
}

export const AnimationSegmentedCategorySelector: React.FC<AnimationSegmentedCategorySelectorProps> = ({
  activeCategory, onSelectCategory,
}) => {
  return (
    <div className="grid grid-cols-3 gap-0.5 p-1 bg-stone-200/80 rounded-xl text-[10px] font-bold border border-stone-300 select-none">
      <button
        type="button"
        onClick={() => onSelectCategory('entrance')}
        className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${
          activeCategory === 'entrance' ? 'bg-white text-amber-900 shadow-2xs font-extrabold' : 'text-stone-600 hover:text-stone-900'
        }`}
      >
        <PlayCircle className="w-3 h-3 text-amber-700" />
        <span>1. Entrance</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectCategory('motion_3d')}
        className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${
          activeCategory === 'motion_3d' ? 'bg-white text-amber-900 shadow-2xs font-extrabold' : 'text-stone-600 hover:text-stone-900'
        }`}
      >
        <Activity className="w-3 h-3 text-amber-700" />
        <span>2. In-Place & 3D</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectCategory('exit')}
        className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all ${
          activeCategory === 'exit' ? 'bg-white text-amber-900 shadow-2xs font-extrabold' : 'text-stone-600 hover:text-stone-900'
        }`}
      >
        <LogOut className="w-3 h-3 text-amber-700" />
        <span>3. Exit</span>
      </button>
    </div>
  );
};
