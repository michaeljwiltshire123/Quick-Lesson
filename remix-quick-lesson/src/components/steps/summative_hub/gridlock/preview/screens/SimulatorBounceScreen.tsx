import React, { useEffect } from 'react';
import { XCircle, ArrowRight, ShieldAlert, BookOpen } from 'lucide-react';
import { TeamColor } from '../../types/gridlockTypes';
import { GridlockVoiceReader } from '../../helpers/GridlockVoiceReader';
import { speakWrongAnswer, GridlockVoiceConfig } from '../../helpers/gridlockSpeechEngine';

interface Props {
  letter: string;
  failedTeam: TeamColor;
  targetAnswer?: string;
  nextTurnTeam: TeamColor;
  voiceConfig?: GridlockVoiceConfig;
  onProceedNext: () => void;
}

export const SimulatorBounceScreen: React.FC<Props> = ({
  letter,
  failedTeam,
  targetAnswer = 'Photosynthesis',
  nextTurnTeam,
  voiceConfig,
  onProceedNext,
}) => {
  const isFailedRed = failedTeam === 'red';
  const spokenCorrection = `Wrong! The correct answer was ${targetAnswer}.`;

  useEffect(() => {
    if (voiceConfig?.autoRead) {
      speakWrongAnswer(targetAnswer, voiceConfig);
    }
  }, [targetAnswer, voiceConfig]);

  return (
    <div className="bg-[#1A1816] p-6 rounded-3xl border-2 border-rose-500/40 shadow-2xl max-w-xl mx-auto space-y-5 text-center text-white animate-in zoom-in-95">
      <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto border-2 border-rose-400 shadow-lg">
        <XCircle className="w-9 h-9" />
      </div>

      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/40">
          <ShieldAlert className="w-3.5 h-3.5" /> Wrong! No Re-attempts
        </div>
        <h2 className="text-2xl font-black">
          {isFailedRed ? 'RED SQUAD' : 'BLUE SQUAD'} MISSED HEX '{letter}'
        </h2>
        <p className="text-xs text-gray-300">
          Wrong answer submitted. Re-attempts are barred — the turn concludes immediately.
        </p>
      </div>

      <div className="bg-black/60 p-4 rounded-2xl border border-white/10 text-left space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Correct Target Answer
          </span>
          <GridlockVoiceReader textToRead={spokenCorrection} size="sm" />
        </div>
        <div className="text-lg font-mono font-black text-amber-300 bg-white/5 p-2.5 rounded-xl border border-white/10 text-center">
          {targetAnswer}
        </div>
        <p className="text-[11px] text-gray-400 text-center">
          Turn passes to <strong className="text-white uppercase">{nextTurnTeam} Squad</strong> to choose the next hexagon.
        </p>
      </div>

      <button
        type="button"
        onClick={onProceedNext}
        className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
      >
        <span>PROCEED TO NEXT HEXAGON SELECTION</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

