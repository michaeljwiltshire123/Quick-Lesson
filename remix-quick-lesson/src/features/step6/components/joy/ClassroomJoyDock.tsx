import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { SoundboardAndConfetti } from './SoundboardAndConfetti';
import { SpinWheelAndNoiseMeter } from './SpinWheelAndNoiseMeter';
import { SpotlightAndDiscoMode } from './SpotlightAndDiscoMode';
import { StampsAndFortuneCookie } from './StampsAndFortuneCookie';
import { ClassroomMemeModal } from './ClassroomMemeModal';
import { Sparkles, ChevronUp, ChevronDown, Disc3, Volume2, Flashlight, Laugh } from 'lucide-react';

interface ClassroomJoyDockProps {
  onInsertElement: (element: SlideElement) => void;
}

export const ClassroomJoyDock: React.FC<ClassroomJoyDockProps> = ({ onInsertElement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalType, setModalType] = useState<'wheel' | 'meter' | null>(null);
  const [isMemeOpen, setIsMemeOpen] = useState(false);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [isDiscoActive, setIsDiscoActive] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 2500);
  };

  return (
    <>
      <div className="fixed bottom-3 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none">
        {isExpanded && (
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-700 shadow-2xl animate-in slide-in-from-bottom-2">
            <SoundboardAndConfetti onTriggerConfetti={triggerConfetti} />
            <div className="h-4 w-px bg-stone-700 mx-0.5" />
            <button type="button" onClick={() => setModalType('wheel')} className="p-1.5 hover:bg-stone-800 text-amber-300 rounded-lg cursor-pointer transition-colors" title="Random Student Picker"><Disc3 className="w-4 h-4" /></button>
            <button type="button" onClick={() => setModalType('meter')} className="p-1.5 hover:bg-stone-800 text-emerald-300 rounded-lg cursor-pointer transition-colors" title="Noise Traffic Light"><Volume2 className="w-4 h-4" /></button>
            <button type="button" onClick={() => setIsMemeOpen(true)} className="p-1.5 hover:bg-stone-800 text-yellow-300 rounded-lg cursor-pointer transition-colors" title="Educational Meme Generator"><Laugh className="w-4 h-4" /></button>
            <button type="button" onClick={() => setIsSpotlightActive(!isSpotlightActive)} className={`p-1.5 rounded-lg cursor-pointer transition-colors ${isSpotlightActive ? 'bg-yellow-400 text-black' : 'hover:bg-stone-800 text-yellow-300'}`} title="Flashlight Spotlight"><Flashlight className="w-4 h-4" /></button>
            <button type="button" onClick={() => setIsDiscoActive(!isDiscoActive)} className={`p-1.5 rounded-lg cursor-pointer transition-colors ${isDiscoActive ? 'bg-purple-600 text-white' : 'hover:bg-stone-800 text-purple-300'}`} title="Party Disco Mode"><Sparkles className="w-4 h-4" /></button>
            <div className="h-4 w-px bg-stone-700 mx-0.5" />
            <StampsAndFortuneCookie onInsertStamp={onInsertElement} />
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-full shadow-lg border border-stone-700 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          title="Toggle Classroom Joy & Engagement Suite"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Classroom Joy Dock</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-stone-400" /> : <ChevronUp className="w-3.5 h-3.5 text-stone-400" />}
        </button>
      </div>

      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          <div className="text-6xl animate-bounce">🎉 🌟 ✨ 🎊 🚀 💫 🎈</div>
        </div>
      )}

      <SpinWheelAndNoiseMeter isOpen={Boolean(modalType)} type={modalType || 'wheel'} onClose={() => setModalType(null)} />
      <ClassroomMemeModal isOpen={isMemeOpen} onClose={() => setIsMemeOpen(false)} onInsertMeme={onInsertElement} />
      <SpotlightAndDiscoMode isSpotlightActive={isSpotlightActive} isDiscoActive={isDiscoActive} onToggleSpotlight={() => setIsSpotlightActive(false)} onToggleDisco={() => setIsDiscoActive(false)} />
    </>
  );
};
