import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Paintbrush, Check, Copy } from 'lucide-react';

interface AnimationPainterProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

interface StampedAnimation {
  animationType?: string;
  animationStep?: number;
  animTrigger?: string;
  animDuration?: number;
  animDelay?: number;
  isBulletBuild?: boolean;
}

let globalAnimationClipboard: StampedAnimation | null = null;

export const AnimationPainter: React.FC<AnimationPainterProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const [copied, setCopied] = useState(false);
  const [clipboard, setClipboard] = useState<StampedAnimation | null>(globalAnimationClipboard);

  const handleCopy = () => {
    if (!selectedElement) return;
    const meta = selectedElement.meta || {};
    const animData: StampedAnimation = {
      animationType: meta.animationType || 'none',
      animationStep: meta.animationStep || 1,
      animTrigger: meta.animTrigger || 'onClick',
      animDuration: meta.animDuration || 1.0,
      animDelay: meta.animDelay || 0,
      isBulletBuild: Boolean(meta.isBulletBuild),
    };
    globalAnimationClipboard = animData;
    setClipboard(animData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = () => {
    if (!selectedElement || !clipboard) return;
    onUpdateElementMeta({ ...clipboard });
  };

  return (
    <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Paintbrush className="w-3.5 h-3.5 text-amber-700" />
          <span>Animation Painter</span>
        </span>
        {clipboard && (
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Style Saved
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!selectedElement}
          className="py-1.5 px-2 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg font-bold text-[11px] text-stone-800 flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-600" />}
          <span>{copied ? 'Copied!' : 'Copy Animation'}</span>
        </button>

        <button
          type="button"
          onClick={handlePaste}
          disabled={!selectedElement || !clipboard}
          className="py-1.5 px-2 bg-amber-800 hover:bg-amber-900 border border-amber-900 rounded-lg font-bold text-[11px] text-white flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 shadow-2xs"
        >
          <Paintbrush className="w-3 h-3 text-amber-200" />
          <span>Apply to Element</span>
        </button>
      </div>
    </div>
  );
};
