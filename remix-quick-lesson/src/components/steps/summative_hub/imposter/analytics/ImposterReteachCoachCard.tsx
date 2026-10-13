import React, { useState } from 'react';
import { Lightbulb, Copy, Check, MessageSquareQuote } from 'lucide-react';

interface Props {
  lessonTitle: string;
  misconceptionFocus?: string;
  scriptOverride?: string;
}

export const ImposterReteachCoachCard: React.FC<Props> = ({
  lessonTitle,
  misconceptionFocus = 'Over-generalising technical terminology during peer discussions',
  scriptOverride,
}) => {
  const [copied, setCopied] = useState(false);

  const defaultScript = scriptOverride ||
    `"Right class, let's pause. Many of our imposters successfully bluffed because we accepted vague descriptions. Remember, when explaining ${lessonTitle || 'this concept'}, look for precise terminology—specifically the exact mechanisms and active components we mapped out in our milestone goals, rather than general everyday comparisons."`;

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider">
              2-Minute Reteach Coach
            </h4>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            Key Misconception Identified
          </span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-amber-900 block">Vulnerability Area</span>
          <p className="text-xs font-semibold text-amber-950 mt-0.5">{misconceptionFocus}</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-[#2D2A26]/10 space-y-1.5 relative">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2D2A26]/60 uppercase">
            <MessageSquareQuote className="w-3.5 h-3.5 text-purple-600" />
            <span>Teacher Script Starter</span>
          </div>
          <p className="text-xs text-[#2D2A26] italic leading-relaxed">
            {defaultScript}
          </p>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 bg-white border border-[#2D2A26]/20 hover:bg-black/5 text-[#2D2A26] font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Script Copied' : 'Copy Script'}</span>
        </button>
      </div>
    </div>
  );
};
