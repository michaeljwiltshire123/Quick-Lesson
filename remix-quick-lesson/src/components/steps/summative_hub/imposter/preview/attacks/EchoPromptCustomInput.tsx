import React from 'react';
import { PenTool } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  topicCategory: string;
}

export const EchoPromptCustomInput: React.FC<Props> = ({ value, onChange, topicCategory }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10px] text-white/60 px-0.5">
        <span className="flex items-center gap-1 text-indigo-300 font-bold">
          <PenTool className="w-3 h-3 text-indigo-400" /> Custom Decoy ({topicCategory}):
        </span>
        <span className="font-mono">{value.length}/120</span>
      </div>

      <textarea
        rows={4}
        maxLength={120}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a plausible yet divergent curriculum question to mislead targets..."
        className="w-full px-3 py-2 bg-slate-900 border border-indigo-400/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-400 leading-relaxed resize-none shadow-inner"
      />
      <p className="text-[10px] text-white/50 italic px-0.5">
        Targeted pupils will receive this instead of the normal classroom prompt next round.
      </p>
    </div>
  );
};
