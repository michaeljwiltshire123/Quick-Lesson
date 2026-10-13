import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getExportFallbackLabel } from '../../../../services/animationExportMapper';
import { Route, Sparkles, ArrowRightLeft } from 'lucide-react';

interface FlowingPathwaysControlsProps {
  selectedElement?: SlideElement;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
}

const PATHWAY_OPTIONS = [
  { id: 'none', label: 'No Pathway' },
  { id: 'linear_slide', label: 'Linear Glide Path' },
  { id: 'curved_arc', label: 'Curved Arc Reveal' },
  { id: 'flowing_pathway', label: 'Flowing Diagram Pathway' },
];

export const FlowingPathwaysControls: React.FC<FlowingPathwaysControlsProps> = ({
  selectedElement, onUpdateElementMeta,
}) => {
  const currentPath = selectedElement?.meta?.motionPathway || 'none';
  const pathFallback = getExportFallbackLabel(currentPath === 'none' ? '' : 'flowing_path');

  return (
    <div className="space-y-2 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700">
      <div className="font-bold text-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Route className="w-3.5 h-3.5 text-amber-700" />
          <span>Flowing Pathways & Motion Paths</span>
        </span>
        {currentPath !== 'none' && (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> Pathway Active
          </span>
        )}
      </div>

      <select
        value={currentPath}
        onChange={(e) => onUpdateElementMeta({ motionPathway: e.target.value })}
        className="w-full text-xs font-semibold bg-white border border-stone-300 rounded-lg p-1.5 focus:outline-none"
      >
        {PATHWAY_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.label}</option>
        ))}
      </select>

      {currentPath !== 'none' && (
        <div className="p-1 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between text-[10px]">
          <span className="text-stone-600 flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3 text-amber-700" />
            <span>PowerPoint / Slides Export:</span>
          </span>
          <span className="font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-amber-300">
            Export: {pathFallback}
          </span>
        </div>
      )}
    </div>
  );
};
