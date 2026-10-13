import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { User, ShieldCheck, Calendar, Sparkles } from 'lucide-react';

interface TeacherStampsAndPupilTagsProps {
  onInsertElement: (element: SlideElement) => void;
}

export const TeacherStampsAndPupilTags: React.FC<TeacherStampsAndPupilTagsProps> = ({ onInsertElement }) => {
  const insertPupilTag = () => {
    onInsertElement({
      id: `el-tag-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 30,
      y: 35,
      width: 44,
      height: 18,
      content: '⭐ Pupil Spotlight: {student_name} ⭐\nOutstanding analytical reasoning!',
      fillColor: '#FEF3C7',
      borderColor: '#D97706',
      borderWidth: 2,
      textStyle: { bold: true, align: 'center', fontSize: 12, color: '#78350F' },
      meta: { isPupilTag: true },
    });
  };

  const insertStamp = (type: 'dept' | 'period') => {
    const isDept = type === 'dept';
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    onInsertElement({
      id: `el-stamp-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: isDept ? 68 : 68,
      y: isDept ? 80 : 66,
      width: 28,
      height: 14,
      content: isDept ? '🏫 Verified Dept Resource' : `📅 ${dateStr} • Period 1`,
      fillColor: isDept ? '#ECFDF5' : '#EFF6FF',
      borderColor: isDept ? '#059669' : '#2563EB',
      borderWidth: 2,
      textStyle: { bold: true, align: 'center', fontSize: 11, color: isDept ? '#065F46' : '#1E40AF' },
      meta: { isTeacherWatermark: true, stampType: type },
    });
  };

  return (
    <div className="space-y-1.5 pt-1 border-t border-stone-200">
      <div className="flex items-center justify-between text-[11px] font-bold text-stone-800">
        <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" />Pupil Tags & Dept Stamps</span>
      </div>

      <button
        type="button"
        onClick={insertPupilTag}
        className="w-full py-1.5 px-2 bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 text-amber-950 border border-amber-300 font-extrabold rounded-xl cursor-pointer text-center text-xs shadow-2xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
      >
        <User className="w-3.5 h-3.5 text-amber-800" />
        <span>+ Insert Animated {'{student_name}'} Spotlight</span>
      </button>

      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => insertStamp('dept')}
          className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold rounded-xl text-[10px] flex items-center justify-center gap-1 cursor-pointer hover:scale-105 active:scale-90 transition-transform shadow-2xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Dept Badge</span>
        </button>
        <button
          type="button"
          onClick={() => insertStamp('period')}
          className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-bold rounded-xl text-[10px] flex items-center justify-center gap-1 cursor-pointer hover:scale-105 active:scale-90 transition-transform shadow-2xs"
        >
          <Calendar className="w-3.5 h-3.5 text-blue-700" />
          <span>Period Stamp</span>
        </button>
      </div>
    </div>
  );
};
