import React, { useEffect } from 'react';
import { HexTile, TeamColor } from '../types/gridlockTypes';
import { GridlockVoiceReader } from '../helpers/GridlockVoiceReader';
import { speakCurriculumPrompt, stopSpeaking } from '../helpers/gridlockSpeechEngine';
import { Send, Volume2 } from 'lucide-react';

interface Props {
  activeTile: HexTile;
  activeTeam: TeamColor;
  typedInput: string;
  onChangeInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TeamPhoneAnswerForm: React.FC<Props> = ({
  activeTile,
  activeTeam,
  typedInput,
  onChangeInput,
  onSubmit,
}) => {
  const isRed = activeTeam === 'red';
  const prompt = activeTile.activeQuestion?.prompt || `Identify keyword starting with ${activeTile.letter}`;

  useEffect(() => {
    if (!prompt) return;
    const timer = setTimeout(() => {
      speakCurriculumPrompt(prompt);
    }, 1000);

    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
  }, [activeTile.id, prompt]);

  return (
    <div className="space-y-3">
      <div className="bg-black/50 p-3 rounded-2xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-black text-amber-400 uppercase">
              Active Hexagon Target: '{activeTile.letter}'
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded-md animate-pulse">
              <Volume2 className="w-2.5 h-2.5" /> Auto-Reading
            </span>
          </div>
          <GridlockVoiceReader textToRead={prompt} size="sm" />
        </div>
        <p className="text-xs text-gray-200 leading-relaxed font-medium">{prompt}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-gray-400 block">
          Type {isRed ? 'Red' : 'Blue'} Team Answer (Turn-Based):
        </label>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={typedInput}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder={`Type ${activeTile.letter}...`}
            className="flex-1 p-2.5 bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white placeholder:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            className={`px-3 py-2.5 rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer shadow-md ${
              isRed ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            <Send className="w-3.5 h-3.5" /> <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

