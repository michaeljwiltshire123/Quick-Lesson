import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { TTSVoicePreset } from '../types/competitiveQuizTypes';
import { speakPrompt, cancelSpeech } from '../services/ttsPresenterService';

interface Props {
  promptText: string;
  preset: TTSVoicePreset;
  autoSpeak?: boolean;
}

export const TtsPresenterBanner: React.FC<Props> = ({ promptText, preset }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      cancelSpeech();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakPrompt(promptText, preset, () => setIsSpeaking(false));
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-400/30 flex items-center justify-between gap-3 text-white shadow-lg">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSpeaking ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-white/10 text-amber-400'}`}>
          <Volume2 className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
              Live Presenter Voice
            </span>
            <span className="text-[10px] text-gray-400 truncate">({preset.name})</span>
          </div>
          <p className="text-xs text-gray-200 truncate italic">
            "{promptText}"
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleSpeak}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            isSpeaking
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
          <span>{isSpeaking ? 'Mute' : 'Read Aloud'}</span>
        </button>
      </div>
    </div>
  );
};
