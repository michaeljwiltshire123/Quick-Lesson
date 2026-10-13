import React, { useState } from 'react';
import { TRANSITIONS_CATALOG, TransitionItem } from '../../../../constants/transitionsCatalog';
import { TransitionPreviewStage } from './TransitionPreviewStage';
import { TransitionCategoryGrid } from './TransitionCategoryGrid';
import { Wand2, X, Check, Sparkles } from 'lucide-react';

interface LiveLessonTransitionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTransition: (transitionId: string, applyToAll: boolean, isExit?: boolean) => void;
}

export const LiveLessonTransitionsModal: React.FC<LiveLessonTransitionsModalProps> = ({
  isOpen, onClose, onApplyTransition,
}) => {
  const [selectedTransition, setSelectedTransition] = useState<TransitionItem>(TRANSITIONS_CATALOG[0]);
  const [activeTab, setActiveTab] = useState<'entry' | 'exit'>('entry');
  const [speed, setSpeed] = useState(0.6);
  const [applied, setApplied] = useState(false);
  const [appliedAll, setAppliedAll] = useState(false);

  if (!isOpen) return null;

  const handleApplySlide = (applyToAll: boolean = false) => {
    onApplyTransition(selectedTransition.id, applyToAll, activeTab === 'exit');
    if (applyToAll) {
      setAppliedAll(true);
    } else {
      setApplied(true);
    }
    setTimeout(() => {
      setApplied(false);
      setAppliedAll(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-[#FAF9F5] border border-stone-300 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col justify-between shadow-2xl overflow-hidden text-stone-900">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 border border-amber-300 rounded-2xl">
              <Sparkles className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-base font-black text-stone-900">Live Lesson Transitions Library</h2>
              <p className="text-xs text-stone-500 font-medium">Explore 40+ classroom, sci-fi, and wild 60fps presentation transitions</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 bg-stone-100 hover:bg-stone-200 rounded-2xl text-stone-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <TransitionPreviewStage
            selectedTransition={selectedTransition}
            activeTab={activeTab}
            speed={speed}
            onSpeedChange={setSpeed}
          />

          <TransitionCategoryGrid
            selectedTransition={selectedTransition}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSelectTransition={setSelectedTransition}
          />
        </div>

        <div className="flex items-center justify-between px-6 py-3.5 border-t border-stone-200 bg-white">
          <span className="text-xs font-bold text-stone-600">
            Selected: <strong className="text-amber-900">{selectedTransition.name}</strong> ({activeTab.toUpperCase()})
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button" onClick={() => handleApplySlide(true)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded-xl font-bold text-xs cursor-pointer shadow-2xs transition-all flex items-center gap-1.5"
            >
              {appliedAll && <Check className="w-4 h-4 text-emerald-600" />}
              <span>{appliedAll ? 'Applied to Every Slide!' : 'Apply Across Whole Deck'}</span>
            </button>
            <button
              type="button" onClick={() => handleApplySlide(false)}
              className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
            >
              {applied ? <Check className="w-4 h-4 text-emerald-300" /> : <Wand2 className="w-4 h-4 text-amber-300" />}
              <span>{applied ? 'Applied!' : `Apply ${activeTab === 'exit' ? 'Exit' : 'Entry'} Transition`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
