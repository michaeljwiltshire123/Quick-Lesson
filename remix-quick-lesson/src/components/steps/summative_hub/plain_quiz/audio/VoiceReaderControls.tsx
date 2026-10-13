import React from 'react';
import { Volume2, VolumeX, Play, Square, Sparkles } from 'lucide-react';
import { TTSConfig } from './useTextToSpeech';

interface Props {
  config: TTSConfig;
  onChangeConfig: (newConfig: TTSConfig) => void;
  voices: SpeechSynthesisVoice[];
  isSpeaking: boolean;
  onTestSpeak: () => void;
  onStopSpeak: () => void;
}

export const VoiceReaderControls: React.FC<Props> = ({
  config,
  onChangeConfig,
  voices,
  isSpeaking,
  onTestSpeak,
  onStopSpeak,
}) => {
  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-bold text-[#2D2A26] uppercase tracking-wider">Teacher Voice Reader</h4>
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-gray-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Auto-Read Questions</span>
          <input
            type="checkbox"
            checked={config.autoRead}
            onChange={(e) => onChangeConfig({ ...config, autoRead: e.target.checked })}
            className="w-4 h-4 accent-amber-500 rounded cursor-pointer ml-1"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-500">Voice Presenter</label>
          <select
            value={config.voiceURI}
            onChange={(e) => onChangeConfig({ ...config, voiceURI: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl text-xs font-medium text-[#2D2A26]"
          >
            <option value="default-uk">Standard British Voice</option>
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500">
            <span>Reading Speed</span>
            <span className="text-amber-600 font-mono font-bold">{config.rate.toFixed(2)}x</span>
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

        <div className="flex items-end">
          <button
            type="button"
            onClick={isSpeaking ? onStopSpeak : onTestSpeak}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-[#2D2A26] text-white hover:bg-black border-[#2D2A26]'
            }`}
          >
            {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isSpeaking ? 'Stop Reading' : 'Sample Voice'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
