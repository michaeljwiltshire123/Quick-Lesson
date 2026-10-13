import React, { useState, useEffect } from 'react';
import { GridlockVoiceConfig, getAvailableVoices } from './gridlockSpeechEngine';

interface Props {
  config: GridlockVoiceConfig;
  onChangeConfig: (newConfig: GridlockVoiceConfig) => void;
}

export const VoicePersonaSelector: React.FC<Props> = ({ config, onChangeConfig }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

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

  return (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Selected Voice Presenter
        </label>
        <select
          value={config.voiceURI}
          onChange={(e) => {
            const sel = voices.find((v) => v.voiceURI === e.target.value);
            onChangeConfig({
              ...config,
              voiceURI: e.target.value,
              name: sel?.name || config.name,
              lang: sel?.lang || config.lang,
            });
          }}
          className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-xs text-white font-medium focus:outline-hidden focus:border-amber-400"
        >
          {voices.length === 0 ? (
            <option value="default">Default British Presenter</option>
          ) : (
            voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI} className="bg-[#1E1C1A] text-white">
                {v.name} ({v.lang})
              </option>
            ))
          )}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
            <span>Pace (Speed)</span>
            <span className="text-amber-400 font-mono">{config.rate.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.35"
            step="0.05"
            value={config.rate}
            onChange={(e) => onChangeConfig({ ...config, rate: parseFloat(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
            <span>Pitch</span>
            <span className="text-amber-400 font-mono">{config.pitch.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.4"
            step="0.05"
            value={config.pitch}
            onChange={(e) => onChangeConfig({ ...config, pitch: parseFloat(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
