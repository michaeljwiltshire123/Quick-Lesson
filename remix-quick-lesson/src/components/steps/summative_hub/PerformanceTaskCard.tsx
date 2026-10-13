import React from 'react';
import {
  FileText, Mic, Palette, PlayCircle, Users, Bug, Download, Share2, Check,
} from 'lucide-react';
import { MultimodalFormat, SummativeTaskChoice } from './typesSummative';
import { TaskCardBadges } from './TaskCardBadges';

interface Props {
  task: SummativeTaskChoice;
  isSelected: boolean;
  onSelect: () => void;
  onExportHandout: (task: SummativeTaskChoice) => void;
  onExportClassroom: (task: SummativeTaskChoice) => void;
}

const FORMAT_ICONS: Record<MultimodalFormat, React.ComponentType<{ className?: string }>> = {
  written_report: FileText,
  written_cer: FileText,
  verbal_pitch: Mic,
  visual_sketchnote: Palette,
  practical_demo: PlayCircle,
  peer_audit: Users,
  data_debug: Bug,
};

export const PerformanceTaskCard: React.FC<Props> = ({
  task, isSelected, onSelect, onExportHandout, onExportClassroom,
}) => {
  const Icon = FORMAT_ICONS[task.format] || FileText;

  return (
    <div
      onClick={onSelect}
      className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all cursor-pointer select-none ${
        isSelected
          ? 'bg-amber-50/40 border-amber-500 ring-2 ring-amber-400/20 shadow-xs'
          : 'bg-white border-[#2D2A26]/15 hover:border-amber-400/50 hover:bg-[#F8F6F0]/40'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">
                {task.formatLabel}
              </span>
              <h4 className="text-sm font-bold text-[#2D2A26] leading-snug">{task.title}</h4>
            </div>
          </div>
          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
            isSelected ? 'border-amber-600 bg-amber-500 text-white' : 'border-[#2D2A26]/25 bg-white'
          }`}>
            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>

        <p className="text-xs text-[#2D2A26]/75 leading-relaxed">{task.description}</p>
        <TaskCardBadges criteriaCodes={task.criteriaCodes} coveredConcepts={task.coveredConcepts} />
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-[#2D2A26]/10">
        <span className="text-[10px] font-semibold text-[#2D2A26]/50">20-Min Multi-Modal</span>
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onExportHandout(task)}
            title="Download Pupil Handout"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white border border-[#2D2A26]/15 text-[#2D2A26] hover:bg-[#F8F6F0] cursor-pointer shadow-2xs"
          >
            <Download className="w-3 h-3 text-amber-600" />
            <span>Handout</span>
          </button>
          <button
            type="button"
            onClick={() => onExportClassroom(task)}
            title="Post to Google Classroom"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-[#2D2A26] hover:bg-black text-white cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3 h-3 text-amber-400" />
            <span>Classroom</span>
          </button>
        </div>
      </div>
    </div>
  );
};
