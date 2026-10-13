import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Timer } from 'lucide-react';

interface ClassroomTaskTimersProps {
  onInsertElement: (element: SlideElement) => void;
}

export const ClassroomTaskTimers: React.FC<ClassroomTaskTimersProps> = ({ onInsertElement }) => {
  return (
    <div className="space-y-1.5 p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
      <div className="font-bold text-stone-800 flex items-center gap-1.5 text-[11px]">
        <Timer className="w-3.5 h-3.5 text-amber-700" />
        <span>Classroom Task Timers</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 pt-0.5">
        {[1, 2, 5].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() =>
              onInsertElement({
                id: `el-timer-${Date.now()}`,
                type: 'shape',
                shapeType: 'rounded',
                x: 75,
                y: 75,
                width: 22,
                height: 20,
                content: `⏱️ ${m}:00 Task`,
                fillColor: '#FEF3C7',
                borderColor: '#D97706',
                borderWidth: 2,
                meta: { isTimer: true },
              })
            }
            className="py-1 px-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg font-bold text-[10px] cursor-pointer shadow-2xs"
          >
            + {m}m
          </button>
        ))}
      </div>
    </div>
  );
};
