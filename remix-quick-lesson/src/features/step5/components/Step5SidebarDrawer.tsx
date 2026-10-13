import React from 'react';
import { Lightbulb, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

interface Step5SidebarDrawerProps {
  onQuickAddTip?: (tipText: string) => void;
}

export const Step5SidebarDrawer: React.FC<Step5SidebarDrawerProps> = () => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <Lightbulb className="w-5 h-5 text-amber-700" />
        <h3 className="font-bold text-stone-900 text-base">Pedagogical Discussion Tips</h3>
      </div>

      <div className="space-y-4 text-xs text-stone-700">
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
          <div className="font-semibold text-amber-900 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Surface Misconceptions Early</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Present the starter before introducing formal definitions. Let students debate first so they feel the gap in their intuition.
          </p>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Structured Turn-and-Talk</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Enforce 30 seconds of absolute silence for individual thought before turning to a partner. This prevents anchor bias.
          </p>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5">
          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Socratic Follow-ups</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Never confirm right or wrong immediately. Ask: "What evidence made you change your mind just then?"
          </p>
        </div>
      </div>
    </div>
  );
};
