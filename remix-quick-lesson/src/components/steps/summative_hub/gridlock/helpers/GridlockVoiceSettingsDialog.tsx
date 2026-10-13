import React, { useState } from 'react';
import { GridlockVoiceConfig, speakCurriculumPrompt, cancelSpeech } from './gridlockSpeechEngine';
import { VoicePersonaSelector } from './VoicePersonaSelector';
import { Sliders, Play, Square, X, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  config: GridlockVoiceConfig;
  onChangeConfig: (newConfig: GridlockVoiceConfig) => void;
  onClose: () => void;
}

export const GridlockVoiceSettingsDialog: React.FC<Props> = ({
  isOpen,
  config,
  onChangeConfig,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const handleTestVoice = () => {
    if (isPlaying) {
      cancelSpeech();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    speakCurriculumPrompt(
      'Welcome to GridLock Hexagon Arena! Thirty seconds on the clock. Identify the curriculum term and bridge your path!',
      config,
      () => setIsPlaying(false)
    );
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#1E1C1A] text-white p-5 rounded-3xl border border-white/20 shadow-2xl max-w-md w-full space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-black uppercase tracking-wider">AI Voice Presenter Engine</h3>
          </div>
          <button type="button" onClick={() => { cancelSpeech(); onClose(); }} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/10 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Auto-Read Hexagon Clues
              </div>
              <div className="text-[10px] text-gray-400">Speak question promptly when a hexagon tile is tapped</div>
            </div>
            <input
              type="checkbox"
              checked={config.autoRead}
              onChange={(e) => onChangeConfig({ ...config, autoRead: e.target.checked })}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          <VoicePersonaSelector config={config} onChangeConfig={onChangeConfig} />
        </div>

        <div className="pt-2 flex gap-2">
          <button
            type="button"
            onClick={handleTestVoice}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-white/15 cursor-pointer transition-all ${
              isPlaying ? 'bg-rose-600 text-white animate-pulse' : 'bg-white/10 hover:bg-white/20 text-amber-300'
            }`}
          >
            {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Stop Test' : 'Test Presenter'}</span>
          </button>
          <button
            type="button"
            onClick={() => { cancelSpeech(); onClose(); }}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black cursor-pointer shadow-md"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
