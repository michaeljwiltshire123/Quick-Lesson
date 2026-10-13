import React, { useState } from 'react';
import { Lightbulb, Copy, Check, MessageSquare } from 'lucide-react';

interface Props {
  quizTitle: string;
  topMisconception?: string;
}

export const ReteachCoachCard: React.FC<Props> = ({
  quizTitle,
  topMisconception = 'Confusing foundational application rules with secondary decorative steps',
}) => {
  const [copied, setCopied] = useState(false);

  const script = `Class, looking at our quiz results for ${quizTitle}, 38% of us picked Option B on Question 3. Remember: when applying this core rule, we must always evaluate the primary structural requirement first before adding secondary details. Let's do a quick 30-second whiteboard check together now.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1E1C1A] text-white p-4.5 rounded-2xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200">
            2-Minute Reteach Coach Script
          </h3>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-amber-300 cursor-pointer transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Script'}</span>
        </button>
      </div>

      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
        <div className="text-[10px] font-bold text-amber-300 uppercase">Primary Class Misconception</div>
        <div className="text-xs text-gray-200 font-medium">{topMisconception}</div>
      </div>

      <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-gray-400">
          <MessageSquare className="w-3 h-3 text-emerald-400" />
          <span>Verbatim Teacher Script</span>
        </div>
        <p className="text-xs text-gray-300 italic leading-relaxed">
          "{script}"
        </p>
      </div>
    </div>
  );
};
