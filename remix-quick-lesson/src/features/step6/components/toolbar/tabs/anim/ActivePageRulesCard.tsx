import React from 'react';
import { CanvasTheme } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { Film, Trash2, ArrowRightLeft, Sparkles } from 'lucide-react';

interface ActivePageRulesCardProps {
  currentTheme?: Partial<CanvasTheme>;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
}

export const ActivePageRulesCard: React.FC<ActivePageRulesCardProps> = ({
  currentTheme, onUpdateTheme,
}) => {
  const entryEffect = (currentTheme as any)?.transitionEffect || 'none';
  const exitEffect = (currentTheme as any)?.pageExitEffect || 'none';

  const activeRules = [
    entryEffect !== 'none' ? { key: 'transitionEffect', label: `Page Entry: ${entryEffect}` } : null,
    exitEffect !== 'none' ? { key: 'pageExitEffect', label: `Page Exit: ${exitEffect}` } : null,
  ].filter(Boolean) as { key: string; label: string }[];

  if (activeRules.length === 0) return null;

  const handleRemoveRule = (ruleKey: string) => {
    onUpdateTheme({ [ruleKey]: 'none' } as any);
  };

  const primaryExport = getExportFallbackLabel(entryEffect !== 'none' ? entryEffect : exitEffect);

  return (
    <div className="p-2.5 bg-indigo-50/90 border border-indigo-200 rounded-2xl space-y-2 text-indigo-950 shadow-2xs animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-extrabold text-indigo-950 text-xs">
          <Film className="w-3.5 h-3.5 text-indigo-700" />
          <span>Active Slide Transitions</span>
        </div>
        <span className="text-[10px] font-extrabold text-indigo-900 bg-indigo-200/80 px-2 py-0.5 rounded-full border border-indigo-300">
          {activeRules.length} {activeRules.length === 1 ? 'Transition' : 'Transitions'}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex flex-wrap gap-1">
          {activeRules.map((rule) => (
            <span key={rule.key} className="bg-white border border-indigo-300 text-indigo-950 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-2.5 h-2.5 text-indigo-700" />
              <span>{rule.label}</span>
              <button
                type="button"
                onClick={() => handleRemoveRule(rule.key)}
                className="hover:text-rose-600 cursor-pointer ml-1 p-0.5 text-indigo-400 hover:bg-rose-50 rounded"
                title="Remove Transition"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="p-1 bg-white/90 border border-indigo-200 rounded-lg flex items-center justify-between text-[9.5px]">
          <span className="text-stone-600 flex items-center gap-1">
            <ArrowRightLeft className="w-2.5 h-2.5 text-indigo-700" />
            <span>PowerPoint Export:</span>
          </span>
          <span className="font-bold text-indigo-900 bg-indigo-100/80 px-1.5 py-0.5 rounded">
            Export: {primaryExport}
          </span>
        </div>
      </div>
    </div>
  );
};
