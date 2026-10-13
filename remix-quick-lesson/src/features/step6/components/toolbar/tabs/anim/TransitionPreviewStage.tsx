import React, { useState, useEffect } from 'react';
import { TransitionItem } from '../../../../constants/transitionsCatalog';
import { getSpecificTransitionStyle } from '../../../../utils/transitionStyleMap';
import { AnimationKeyframesStyle } from '../../../canvas/AnimationKeyframesStyle';
import { SpecialClassroomKeyframesStyle } from '../../../canvas/SpecialClassroomKeyframesStyle';
import { ExitClassroomKeyframesStyle } from '../../../canvas/ExitClassroomKeyframesStyle';
import { NoveltyTransitionsKeyframes } from '../../../canvas/NoveltyTransitionsKeyframes';
import { TransitionSlideCards } from './preview/TransitionSlideCards';
import { Play, ArrowRightLeft, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface TransitionPreviewStageProps {
  selectedTransition: TransitionItem;
  activeTab: 'entry' | 'exit';
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const TransitionPreviewStage: React.FC<TransitionPreviewStageProps> = ({
  selectedTransition, activeTab, speed, onSpeedChange,
}) => {
  const [animKey, setAnimKey] = useState(0);

  const handleReplay = () => setAnimKey((k) => k + 1);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [selectedTransition.id, activeTab]);

  const combinedAnimStyle = getSpecificTransitionStyle(selectedTransition.id, activeTab, speed);

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-4 text-stone-100 flex flex-col justify-between space-y-3 shadow-xl select-none">
      <AnimationKeyframesStyle />
      <SpecialClassroomKeyframesStyle />
      <ExitClassroomKeyframesStyle />
      <NoveltyTransitionsKeyframes />

      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-extrabold text-xs text-amber-200">{selectedTransition.name} ({activeTab.toUpperCase()})</span>
        </div>
        <span className="text-[10px] font-bold text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-700/80 uppercase">
          {selectedTransition.category}
        </span>
      </div>

      <TransitionSlideCards
        selectedTransition={selectedTransition}
        activeTab={activeTab}
        animKey={animKey}
        combinedAnimStyle={combinedAnimStyle}
        speed={speed}
      />

      <div className="space-y-2 pt-1 border-t border-stone-800">
        <div className="flex items-center justify-between text-xs text-stone-400 font-semibold">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> Speed:</span>
          <div className="flex items-center gap-1">
            {[0.3, 0.6, 1.2].map((s) => (
              <button
                key={s} type="button" onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                  speed === s ? 'bg-amber-600 text-white font-black' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                }`}
              >
                {s === 0.3 ? 'Fast 0.3s' : s === 0.6 ? 'Standard 0.6s' : 'Slow 1.2s'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-2 bg-stone-950/80 border border-stone-800 rounded-xl flex items-center justify-between text-[10.5px]">
          <span className="text-stone-400 flex items-center gap-1.5">
            <ArrowRightLeft className="w-3 h-3 text-amber-400" /> PowerPoint Export Fallback:
          </span>
          <span className="font-bold text-amber-300 bg-stone-800 px-2 py-0.5 rounded border border-stone-700 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> {selectedTransition.exportFallback}
          </span>
        </div>

        <button
          type="button" onClick={handleReplay}
          className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
        >
          <Play className="w-3.5 h-3.5 text-amber-400" /> Replay Motion
        </button>
      </div>
    </div>
  );
};
