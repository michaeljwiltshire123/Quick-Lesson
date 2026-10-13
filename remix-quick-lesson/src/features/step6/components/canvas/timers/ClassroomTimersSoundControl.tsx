import React from 'react';
import { ChimeSound } from '../../../types/timerTypes';
import { playEndAlarm } from '../../../utils/classroomAudioChimes';
import { Volume2, VolumeX } from 'lucide-react';

interface ClassroomTimersSoundControlProps {
  sound: ChimeSound;
  enableFiveSec: boolean;
  onSoundChange: (s: ChimeSound) => void;
  onEnableFiveSecChange: (e: boolean) => void;
}

const SOUNDS: { id: ChimeSound; label: string }[] = [
  { id: 'marimba', label: 'Marimba Chords' },
  { id: 'zen', label: 'Zen Singing Bowl' },
  { id: 'schoolBell', label: 'British School Bell' },
  { id: 'digital', label: 'Digital Fanfare' },
  { id: 'silent', label: 'Silent Mode' },
];

export const ClassroomTimersSoundControl: React.FC<ClassroomTimersSoundControlProps> = ({
  sound, enableFiveSec, onSoundChange, onEnableFiveSecChange,
}) => {
  return (
    <div className="space-y-1.5 pt-2 border-t border-stone-100">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
          {sound === 'silent' ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-700" />}
          <span>Alarm Chime & Sounds</span>
        </label>
        <button
          type="button" onClick={() => playEndAlarm(sound)}
          className="text-[10px] text-amber-800 font-bold hover:underline cursor-pointer"
        >
          Test Chime 🔊
        </button>
      </div>

      <div className="flex flex-wrap gap-1">
        {SOUNDS.map((s) => (
          <button
            key={s.id} type="button" onClick={() => onSoundChange(s.id)}
            className={`px-2 py-1 rounded-lg border text-[10px] font-semibold cursor-pointer ${
              sound === s.id ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-1.5 text-[10.5px] text-stone-600 font-medium pt-1 cursor-pointer">
        <input
          type="checkbox" checked={enableFiveSec}
          onChange={(e) => onEnableFiveSecChange(e.target.checked)}
          className="accent-amber-700 rounded"
        />
        <span>Play gentle 5-second countdown alert ticks</span>
      </label>
    </div>
  );
};
