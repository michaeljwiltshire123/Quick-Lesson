import React, { useState, useEffect } from 'react';
import { Volume2, Play, Square, Mic2 } from 'lucide-react';
import { TTSVoicePreset } from '../types/competitiveQuizTypes';
import { getAvailableVoices, speakPrompt, cancelSpeech } from '../services/ttsPresenterService';

interface Props {
  preset: TTSVoicePreset;
  onChangePreset: (updated: TTSVoicePreset) => void;
}

export const VoiceSelectorCard: React.FC<Props> = ({ preset, onChangePreset }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const v = getAvailableVoices();
      if (v.length > 0) setVoices(v);
    };
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleTestVoice = () => {
    if (isPlaying) {
      cancelSpeech();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    speakPrompt(
      'Welcome to the arena! Ten seconds on the clock. Stay sharp, watch out for deception traps, and lock in your answer!',
      preset,
      () => setIsPlaying(false)
    );
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <div className="flex items-center gap-2">
          <Mic2 className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black uppercase tracking-wider text-[#2D2A26]">
            AI Voice Presenter Engine
          </h4>
        </div>
        <button
          type="button"
          onClick={handleTestVoice}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            isPlaying
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-[#2D2A26] text-white hover:bg-black'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isPlaying ? 'Stop Test' : 'Test Voice'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Selected Voice</label>
          <select
            value={preset.voiceURI}
            onChange={(e) => {
              const selected = voices.find((v) => v.voiceURI === e.target.value);
              onChangePreset({
                ...preset,
                voiceURI: e.target.value,
                name: selected?.name || preset.name,
                lang: selected?.lang || preset.lang,
              });
            }}
            className="w-full px-2.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          >
            {voices.length === 0 ? (
              <option value="default">Default System Presenter</option>
            ) : (
              voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <span>Speech Pitch</span>
            <span className="text-[#2D2A26]">{preset.pitch.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.4"
            step="0.05"
            value={preset.pitch}
            onChange={(e) => onChangePreset({ ...preset, pitch: parseFloat(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <span>Pace (Rate)</span>
            <span className="text-[#2D2A26]">{preset.rate.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.3"
            step="0.05"
            value={preset.rate}
            onChange={(e) => onChangePreset({ ...preset, rate: parseFloat(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
