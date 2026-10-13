import React from 'react';
import { WifiOff, ShieldCheck, PenTool } from 'lucide-react';

interface ZeroTechFallbackBoxProps {
  fallbackPlan?: string;
  onUpdateFallbackPlan: (plan: string) => void;
}

const DEFAULT_ZERO_TECH_SUGGESTIONS = [
  'Mini-whiteboards: pupils hold up letter or working out.',
  'Finger voting: 1–5 fingers held against chest for quick CFU.',
  'Stand up / Sit down for True vs. False check.',
  'Turn-and-talk pair share with 30-second silent thinking time.',
];

export const ZeroTechFallbackBox: React.FC<ZeroTechFallbackBoxProps> = ({
  fallbackPlan = '',
  onUpdateFallbackPlan,
}) => {
  return (
    <div className="space-y-3 bg-stone-50/70 p-4 rounded-2xl border border-stone-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-stone-600" />
          <h4 className="text-xs font-bold text-stone-800">Zero-Tech & Physical Fallback Plan</h4>
        </div>
        <span className="text-[10px] text-stone-500 font-medium flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" /> No-Internet Ready
        </span>
      </div>

      <p className="text-[11px] text-stone-600">
        Contingency instructions if classroom internet drops or student devices fail during delivery:
      </p>

      <textarea
        rows={3}
        value={fallbackPlan}
        onChange={(e) => onUpdateFallbackPlan(e.target.value)}
        placeholder="e.g. If Wi-Fi fails, prompt pupils to write option on mini-whiteboards or hold 1–4 fingers to chest..."
        className="w-full text-xs font-medium bg-white border border-stone-300 rounded-xl p-3 text-stone-800 focus:outline-none focus:border-amber-600 leading-relaxed resize-none"
      />

      <div className="flex flex-wrap gap-1.5 pt-1">
        {DEFAULT_ZERO_TECH_SUGGESTIONS.map((sug, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onUpdateFallbackPlan(fallbackPlan ? `${fallbackPlan}\n• ${sug}` : `• ${sug}`)}
            className="text-[10px] font-medium bg-white border border-stone-200 hover:border-amber-400 text-stone-600 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
          >
            <PenTool className="w-2.5 h-2.5 text-amber-700" />
            <span className="truncate max-w-[200px]">{sug}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
