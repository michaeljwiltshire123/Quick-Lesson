import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { TimerMode, ClockFormat, DigitalStyle, AnalogueStyle, ChimeSound } from '../../types/timerTypes';
import { ClassroomTimersClockSelector } from './timers/ClassroomTimersClockSelector';
import { ClassroomTimersSoundControl } from './timers/ClassroomTimersSoundControl';
import { X, Timer, Calendar, Plus } from 'lucide-react';

interface ClassroomTimersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertTimer: (element: SlideElement) => void;
}

export const ClassroomTimersModal: React.FC<ClassroomTimersModalProps> = ({
  isOpen, onClose, onInsertTimer,
}) => {
  const [timerMode, setTimerMode] = useState<TimerMode>('duration');
  const [format, setFormat] = useState<ClockFormat>('digital');
  const [digitalStyle, setDigitalStyle] = useState<DigitalStyle>('radial');
  const [analogueStyle, setAnalogueStyle] = useState<AnalogueStyle>('wall');
  const [mins, setMins] = useState(3);
  const [secs, setSecs] = useState(0);
  const [sound, setSound] = useState<ChimeSound>('marimba');
  const [enableFiveSec, setEnableFiveSec] = useState(true);

  // Date countdown state
  const [dateLabel, setDateLabel] = useState('GCSE Science Exam');
  const [targetDate, setTargetDate] = useState('2026-06-15T09:00');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (timerMode === 'targetDate') {
      onInsertTimer({
        id: `el-timer-${Date.now()}`,
        type: 'shape', shapeType: 'rounded',
        x: 65, y: 70, width: 30, height: 22,
        content: dateLabel || 'Milestone Countdown',
        fillColor: '#FFFFFF', borderColor: '#D97706', borderWidth: 2,
        meta: { isTimer: true, timerMode: 'targetDate', targetDateTime: targetDate },
      });
    } else {
      const isWide = format === 'digital' && digitalStyle === 'horizon';
      onInsertTimer({
        id: `el-timer-${Date.now()}`,
        type: 'shape', shapeType: 'rounded',
        x: 68, y: isWide ? 78 : 65, width: isWide ? 28 : 24, height: isWide ? 15 : 26,
        content: `⏱️ ${mins}:${secs < 10 ? `0${secs}` : secs} Task`,
        fillColor: '#FFFFFF', borderColor: '#D97706', borderWidth: 2,
        meta: {
          isTimer: true, timerMode: 'duration', clockFormat: format, digitalStyle, analogueStyle,
          durationMinutes: mins, durationSeconds: secs, chimeSound: sound, enableFiveSecCountdown: enableFiveSec,
        },
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl max-w-md w-full p-4 space-y-3 text-stone-800">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-amber-700" />
            <h3 className="font-extrabold text-base text-stone-900">Classroom Timers & Countdown</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200">
          <button type="button" onClick={() => setTimerMode('duration')} className={`py-1 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${timerMode === 'duration' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600'}`}><Timer className="w-3.5 h-3.5" />Activity Timer</button>
          <button type="button" onClick={() => setTimerMode('targetDate')} className={`py-1 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${timerMode === 'targetDate' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600'}`}><Calendar className="w-3.5 h-3.5" />Date Countdown</button>
        </div>

        {timerMode === 'duration' ? (
          <>
            <ClassroomTimersClockSelector format={format} digitalStyle={digitalStyle} analogueStyle={analogueStyle} onFormatChange={setFormat} onDigitalStyleChange={setDigitalStyle} onAnalogueStyleChange={setAnalogueStyle} />
            <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
              <label className="text-[11px] font-bold text-stone-700">Duration:</label>
              <input type="number" min={0} max={60} value={mins} onChange={(e) => setMins(Math.max(0, Number(e.target.value)))} className="w-14 p-1 bg-stone-50 border border-stone-300 rounded-lg text-center text-xs font-bold" />
              <span className="text-xs text-stone-500">mins</span>
              <input type="number" min={0} max={59} value={secs} onChange={(e) => setSecs(Math.max(0, Math.min(59, Number(e.target.value))))} className="w-14 p-1 bg-stone-50 border border-stone-300 rounded-lg text-center text-xs font-bold" />
              <span className="text-xs text-stone-500">secs</span>
            </div>
            <ClassroomTimersSoundControl sound={sound} enableFiveSec={enableFiveSec} onSoundChange={setSound} onEnableFiveSecChange={setEnableFiveSec} />
          </>
        ) : (
          <div className="space-y-2 py-1">
            <div><label className="text-[10px] font-bold text-stone-600 block mb-0.5">Milestone Label</label><input type="text" value={dateLabel} onChange={(e) => setDateLabel(e.target.value)} placeholder="e.g. Science Fair, GCSE Exam" className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-xl" /></div>
            <div><label className="text-[10px] font-bold text-stone-600 block mb-0.5">Target Date & Time</label><input type="datetime-local" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-xl" /></div>
          </div>
        )}

        <button type="button" onClick={handleAdd} className="w-full py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors">
          <Plus className="w-4 h-4" /><span>+ Add Timer to Slide</span>
        </button>
      </div>
    </div>
  );
};
