import React from 'react';
import { Mic, AlertCircle } from 'lucide-react';

interface TeacherDeliveryLineProps {
  teacherDeliveryLine: string;
  misconceptionWarning: string;
  onChangeDelivery: (newLine: string) => void;
  onChangeMisconception: (newWarning: string) => void;
}

export const TeacherDeliveryLine: React.FC<TeacherDeliveryLineProps> = ({
  teacherDeliveryLine,
  misconceptionWarning,
  onChangeDelivery,
  onChangeMisconception,
}) => {
  return (
    <div className="space-y-3 pt-2">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1.5">
        <label className="block text-xs font-semibold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-amber-700" />
          <span>Teacher Spoken Script</span>
        </label>
        <input
          type="text"
          value={teacherDeliveryLine}
          onChange={(e) => onChangeDelivery(e.target.value)}
          className="w-full bg-white border border-amber-300 focus:border-amber-800 rounded-lg px-3 py-2 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-800/10 shadow-xs"
          placeholder="Exact words for the teacher to speak..."
        />
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-1.5">
        <label className="block text-xs font-semibold text-rose-900 uppercase tracking-wide flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
          <span>Misconception Watch</span>
        </label>
        <input
          type="text"
          value={misconceptionWarning}
          onChange={(e) => onChangeMisconception(e.target.value)}
          className="w-full bg-white border border-rose-300 focus:border-rose-800 rounded-lg px-3 py-2 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-rose-800/10 shadow-xs"
          placeholder="Common student misconception to watch for..."
        />
      </div>
    </div>
  );
};
