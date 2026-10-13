import React, { useState, useEffect } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Play, RotateCcw, Sparkles, Copy, Check } from 'lucide-react';

interface ElementStudioPreviewStageProps {
  element: SlideElement;
  animationType: string;
  trigger: string;
  duration: number;
  delay: number;
  emphasisEffect?: string;
  emphasisRepeat?: number;
  onCopyAnimation?: () => void;
  isCopied?: boolean;
}

export const ElementStudioPreviewStage: React.FC<ElementStudioPreviewStageProps> = ({
  element, animationType, trigger, duration, delay, emphasisEffect, emphasisRepeat = 1, onCopyAnimation, isCopied,
}) => {
  const [playKey, setPlayKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setPlayKey((k) => k + 1);
      setIsPlaying(true);
    }, 50);
  };

  useEffect(() => {
    handleReplay();
  }, [animationType, duration, delay, emphasisEffect, emphasisRepeat]);

  const label = element.caption || (element.type === 'text' ? element.content?.slice(0, 30) : `${element.type.toUpperCase()} Card`);

  return (
    <div className="space-y-3 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-stone-800 text-xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Live Animation Stage Preview</span>
        </span>
        <div className="flex items-center gap-1.5">
          {onCopyAnimation && (
            <button
              type="button"
              onClick={onCopyAnimation}
              className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-[10.5px] font-bold text-stone-700 flex items-center gap-1 cursor-pointer"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-amber-700" />}
              <span>{isCopied ? 'Copied!' : 'Copy Animation'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleReplay}
            className="px-2.5 py-1 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-[10.5px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Replay</span>
          </button>
        </div>
      </div>

      <div className="h-56 bg-stone-900 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden border border-stone-800 shadow-inner">
        <div className="absolute top-2.5 left-3 text-[10px] font-bold text-stone-400 font-mono">
          Speed: {duration.toFixed(1)}s • Delay: {delay.toFixed(1)}s • {trigger}
        </div>

        <div
          key={playKey}
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
          className={`p-4 bg-amber-100/90 border-2 border-amber-400 rounded-xl text-stone-900 text-center font-bold shadow-xl max-w-xs transition-all ${
            animationType === 'fade_in' ? 'animate-in fade-in' :
            animationType === 'slide_in_left' ? 'animate-in slide-in-from-left' :
            animationType === 'slide_in_bottom' ? 'animate-in slide-in-from-bottom' :
            animationType === 'zoom_in' ? 'animate-in zoom-in-75' :
            animationType === 'bounce' ? 'animate-bounce' :
            emphasisEffect === 'pulse' ? 'animate-pulse' :
            emphasisEffect === 'spin' ? 'animate-spin' : ''
          }`}
        >
          <div className="text-xs uppercase tracking-wider text-amber-900/70 font-black mb-1">{element.type}</div>
          <div className="text-sm font-extrabold text-stone-950 truncate">{label || 'Interactive Element'}</div>
          {emphasisRepeat > 1 && (
            <div className="text-[10px] text-amber-800 font-bold mt-1 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block">
              Repeat × {emphasisRepeat}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
