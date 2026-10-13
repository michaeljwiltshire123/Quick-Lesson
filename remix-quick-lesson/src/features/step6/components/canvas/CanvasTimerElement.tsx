import React, { useState, useEffect } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { GoogleSlidesBoundingBox } from './GoogleSlidesBoundingBox';
import { ResizeDirection } from './resizeHandler';
import { DigitalClockFace } from './timers/DigitalClockFace';
import { AnalogClockFace } from './timers/AnalogClockFace';
import { DateCountdownFace } from './timers/DateCountdownFace';
import { playStartChime, playFiveSecTick, playEndAlarm } from '../../utils/classroomAudioChimes';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface CanvasTimerElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

export const CanvasTimerElement: React.FC<CanvasTimerElementProps> = ({
  element, isSelected, onSelect, onStartDrag, onStartResize,
}) => {
  const meta = element.meta || {};
  const isTargetDate = meta.timerMode === 'targetDate';
  const totalSeconds = (meta.durationMinutes ?? 2) * 60 + (meta.durationSeconds ?? 0);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((s) => {
          const next = Math.max(0, s - 1);
          if (next > 0 && next <= 5 && meta.enableFiveSecCountdown !== false) {
            playFiveSecTick(next);
          }
          if (next === 0) playEndAlarm(meta.chimeSound || 'marimba');
          return next;
        });
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, meta.chimeSound, meta.enableFiveSecCountdown]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progressPct = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;
  const isUrgent = secondsLeft <= 30 || progressPct >= 85;
  const isWarning = !isUrgent && progressPct >= 50;
  const accentColor = isUrgent ? '#DC2626' : isWarning ? '#D97706' : '#059669';

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isRunning && secondsLeft === totalSeconds) playStartChime(meta.chimeSound || 'marimba');
    setIsRunning(!isRunning);
  };

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseDown={onStartDrag}
      style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%` }}
      className={`absolute flex flex-col justify-between p-2.5 rounded-2xl border-2 bg-white/95 shadow-md select-none cursor-move z-20 transition-colors duration-300 ${
        isUrgent ? 'border-red-500 bg-red-50/90' : isWarning ? 'border-amber-500 bg-amber-50/90' : 'border-stone-300'
      } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : 'hover:outline hover:outline-1 hover:outline-blue-300'}`}
    >
      {isSelected && <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />}

      <div className="flex-1 flex items-center justify-center pointer-events-auto cursor-pointer" onClick={handleTogglePlay} title="Click to Start / Pause">
        {isTargetDate ? (
          <DateCountdownFace targetDateTime={meta.targetDateTime} label={element.content} />
        ) : meta.clockFormat === 'analogue' ? (
          <AnalogClockFace mins={mins} secs={secs} style={meta.analogueStyle} progressPct={progressPct} accentColor={accentColor} />
        ) : (
          <DigitalClockFace mins={mins} secs={secs} style={meta.digitalStyle} progressPct={progressPct} accentColor={accentColor} isRunning={isRunning} />
        )}
      </div>

      {!isTargetDate && (
        <div className="flex items-center justify-center gap-2 pt-1 border-t border-stone-200/80 pointer-events-auto">
          <button type="button" onClick={handleTogglePlay} className="px-2 py-1 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer">
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); setIsRunning(false); setSecondsLeft(totalSeconds); }} className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[10px] flex items-center gap-1 cursor-pointer">
            <RotateCcw className="w-3 h-3" /><span>Reset</span>
          </button>
        </div>
      )}
    </div>
  );
};
