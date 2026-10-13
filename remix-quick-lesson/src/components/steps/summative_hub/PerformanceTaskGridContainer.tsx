import React from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { SummativeTaskChoice } from './typesSummative';
import { PerformanceTaskCard } from './PerformanceTaskCard';

interface Props {
  tasks: SummativeTaskChoice[];
  selectedTaskId: string | null;
  isLoading: boolean;
  onSelectTask: (taskId: string) => void;
  onRefreshTasks: () => void;
  onExportHandout: (task: SummativeTaskChoice) => void;
  onExportClassroom: (task: SummativeTaskChoice) => void;
}

export const PerformanceTaskGridContainer: React.FC<Props> = ({
  tasks, selectedTaskId, isLoading, onSelectTask, onRefreshTasks, onExportHandout, onExportClassroom,
}) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
      <div>
        <h3 className="text-sm font-bold text-[#2D2A26] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Multimodal Performance Task Menu</span>
        </h3>
        <p className="text-xs text-[#2D2A26]/70">
          Select one 20-minute task format to assess criterion coverage.
        </p>
      </div>

      <button
        type="button"
        disabled={isLoading}
        onClick={onRefreshTasks}
        className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2D2A26]/15 bg-white hover:bg-black/5 text-xs font-semibold text-[#2D2A26] cursor-pointer disabled:opacity-50 transition-all shadow-2xs"
      >
        <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Regenerating...' : 'Regenerate Tasks'}</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {tasks.map((task) => (
        <PerformanceTaskCard
          key={task.id}
          task={task}
          isSelected={selectedTaskId === task.id}
          onSelect={() => onSelectTask(task.id)}
          onExportHandout={onExportHandout}
          onExportClassroom={onExportClassroom}
        />
      ))}
    </div>
  </div>
);
