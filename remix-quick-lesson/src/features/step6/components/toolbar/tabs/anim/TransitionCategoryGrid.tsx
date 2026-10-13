import React, { useState } from 'react';
import { TRANSITIONS_CATALOG, TransitionItem } from '../../../../constants/transitionsCatalog';
import { Search, Sparkles, Check } from 'lucide-react';

interface TransitionCategoryGridProps {
  selectedTransition: TransitionItem;
  activeTab: 'entry' | 'exit';
  onTabChange: (tab: 'entry' | 'exit') => void;
  onSelectTransition: (item: TransitionItem) => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  standard: '1. Standard Presentation',
  classroom: '2. Classroom & Subject',
  scifi: '3. Sci-Fi & Special',
  wild: '4. Wild & Creative',
};

export const TransitionCategoryGrid: React.FC<TransitionCategoryGridProps> = ({
  selectedTransition, activeTab, onTabChange, onSelectTransition,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = TRANSITIONS_CATALOG.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;
  });

  const grouped = ['standard', 'classroom', 'scifi', 'wild'].reduce((acc, cat) => {
    acc[cat] = filteredItems.filter((i) => i.category === cat);
    return acc;
  }, {} as Record<string, TransitionItem[]>);

  return (
    <div className="space-y-2.5 text-stone-800">
      <div className="flex items-center justify-between gap-2">
        <div className="grid grid-cols-2 gap-1 p-1 bg-stone-200/80 rounded-xl text-xs font-bold w-full max-w-xs">
          <button
            type="button" onClick={() => onTabChange('entry')}
            className={`py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
              activeTab === 'entry' ? 'bg-amber-800 text-white shadow-2xs font-extrabold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Entry Transitions
          </button>
          <button
            type="button" onClick={() => onTabChange('exit')}
            className={`py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
              activeTab === 'exit' ? 'bg-amber-800 text-white shadow-2xs font-extrabold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Exit Transitions
          </button>
        </div>

        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transitions..."
            className="w-full pl-8 pr-2 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
        {Object.entries(grouped).map(([catKey, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={catKey} className="space-y-1.5">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>{CATEGORY_NAMES[catKey]}</span>
                <span className="text-[9.5px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full border border-amber-300">
                  {items.length}
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {items.map((item) => {
                  const isSelected = selectedTransition.id === item.id;
                  return (
                    <button
                      key={item.id} type="button" onClick={() => onSelectTransition(item)}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all relative flex flex-col justify-between h-20 ${
                        isSelected
                          ? 'bg-amber-100 border-amber-600 ring-2 ring-amber-400 font-extrabold text-amber-950 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold leading-tight">{item.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />}
                      </div>
                      <p className="text-[9.5px] text-stone-500 line-clamp-2 leading-tight">{item.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
