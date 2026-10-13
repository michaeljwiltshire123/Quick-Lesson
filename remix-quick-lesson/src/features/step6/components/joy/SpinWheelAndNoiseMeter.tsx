import React, { useState, useEffect } from 'react';
import { Disc3, Mic, MicOff, Volume2, X } from 'lucide-react';

interface SpinWheelAndNoiseMeterProps {
  isOpen: boolean;
  type: 'wheel' | 'meter';
  onClose: () => void;
}

const DEFAULT_NAMES = ['Oliver', 'Amelia', 'Jack', 'Isla', 'Noah', 'Mia', 'Leo', 'Ava', 'George', 'Sophia'];

export const SpinWheelAndNoiseMeter: React.FC<SpinWheelAndNoiseMeterProps> = ({ isOpen, type, onClose }) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(25);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isOpen && type === 'meter' && isListening) {
      interval = setInterval(() => {
        setVolumeLevel(Math.floor(Math.random() * 60) + 15);
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isOpen, type, isListening]);

  if (!isOpen) return null;

  const handleSpin = () => {
    setIsSpinning(true);
    setSelectedName(null);
    let counter = 0;
    const spinInterval = setInterval(() => {
      setSelectedName(DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)]);
      counter++;
      if (counter > 15) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 max-w-sm w-full space-y-4 animate-in zoom-in-95 text-stone-800">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
            {type === 'wheel' ? <Disc3 className={`w-4 h-4 text-amber-600 ${isSpinning ? 'animate-spin' : ''}`} /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span>{type === 'wheel' ? 'Random Pupil Name Picker' : 'Classroom Noise Traffic Light'}</span>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        {type === 'wheel' ? (
          <div className="text-center space-y-3 py-2">
            <div className={`text-2xl font-black p-4 rounded-xl border-2 transition-all ${isSpinning ? 'bg-amber-100 text-amber-900 border-amber-400 scale-105' : selectedName ? 'bg-emerald-100 text-emerald-900 border-emerald-500 scale-110' : 'bg-stone-50 border-stone-200 text-stone-500'}`}>
              {selectedName || 'Ready to Spin!'}
            </div>
            <button type="button" disabled={isSpinning} onClick={handleSpin} className="w-full py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl cursor-pointer shadow-md active:scale-95 transition-all">
              {isSpinning ? 'Spinning...' : '🎲 Spin for Next Student'}
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className={`w-8 h-8 rounded-full border-2 transition-all ${volumeLevel < 45 ? 'bg-emerald-500 border-emerald-600 shadow-md scale-110' : 'bg-stone-200'}`} />
              <div className={`w-8 h-8 rounded-full border-2 transition-all ${volumeLevel >= 45 && volumeLevel < 70 ? 'bg-amber-500 border-amber-600 shadow-md scale-110' : 'bg-stone-200'}`} />
              <div className={`w-8 h-8 rounded-full border-2 transition-all ${volumeLevel >= 70 ? 'bg-rose-500 border-rose-600 shadow-md scale-110 animate-pulse' : 'bg-stone-200'}`} />
            </div>
            <p className="text-xs font-semibold text-stone-600">
              {volumeLevel < 45 ? '🟢 Great focus & quiet work' : volumeLevel < 70 ? '🟡 Partner discussion level' : '🔴 Shhh! Exceeding quiet threshold'}
            </p>
            <button type="button" onClick={() => setIsListening(!isListening)} className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${isListening ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}`}>
              {isListening ? <><MicOff className="w-3.5 h-3.5" /> Pause Noise Monitor</> : <><Mic className="w-3.5 h-3.5" /> Start Noise Monitor</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
