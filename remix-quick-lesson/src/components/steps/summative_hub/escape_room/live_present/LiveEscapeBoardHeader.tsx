import React from 'react';
import { Timer, Pause, Play, Eye, EyeOff, X, Award, ShieldAlert } from 'lucide-react';

interface Props {
  scenarioTitle: string; timeRemainingSeconds: number; isPaused: boolean; cluesRevealed: boolean;
  escapedCount: number; totalTeams: number; onTogglePause: () => void; onToggleClues: () => void;
  onClose?: () => void;
}

export const LiveEscapeBoardHeader: React.FC<Props> = ({
  scenarioTitle, timeRemainingSeconds, isPaused, cluesRevealed,
  escapedCount, totalTeams, onTogglePause, onToggleClues, onClose,
}) => {
  const m = Math.floor(timeRemainingSeconds / 60);
  const s = timeRemainingSeconds % 60;
  const timeFormatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const isUrgent = timeRemainingSeconds <= 180 && timeRemainingSeconds > 0;

  return (
    <div className={`bg-white border transition-all duration-300 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 relative overflow-hidden ${
      isUrgent ? 'border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.15)] ring-1 ring-red-500/30' : 'border-[#2D2A26]/15'
    }`}>
      {isUrgent && (
        <>
          <style>{`
            @keyframes hazardSiren { 0%, 100% { opacity: 0.04; } 50% { opacity: 0.16; } }
            @keyframes pulseAlert { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
          `}</style>
          <div className="absolute inset-0 bg-red-600/10 pointer-events-none" style={{ animation: 'hazardSiren 1.5s infinite ease-in-out' }} />
        </>
      )}

      <div className="flex items-center gap-2.5 relative z-10">
        <div className={`p-2 rounded-xl transition-colors ${isUrgent ? 'bg-red-500/20 text-red-600 animate-bounce' : 'bg-amber-500/15 text-[#D97706]'}`}>
          {isUrgent ? <ShieldAlert className="w-5 h-5" /> : <Award className="w-5 h-5" />}
        </div>
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
            isUrgent ? 'text-red-700 bg-red-100 border-red-300' : 'text-[#D97706] bg-[#F59E0B]/10 border-[#F59E0B]/20'
          }`}>
            {isUrgent ? '⚠️ HIGH-VOLTAGE CRITICAL ALERT ⚠️' : 'Live Teacher Present Display'}
          </span>
          <h2 className="text-base font-bold text-[#2D2A26] mt-0.5">{scenarioTitle || 'Live Escape Challenge'}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 relative z-10">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F8F6F0] border border-[#2D2A26]/15 text-xs font-bold text-[#2D2A26]">
          <span className="text-[#D97706] font-black">{escapedCount}</span>/<span className="text-[#2D2A26]/60">{totalTeams}</span> Escaped
        </div>
        
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-black text-sm transition-all duration-300 ${
          isUrgent ? 'bg-red-600 text-white border-red-700' : 'bg-[#2D2A26] text-white border-black'
        }`} style={isUrgent ? { animation: 'pulseAlert 1s infinite ease-in-out' } : undefined}>
          <Timer className={`w-4 h-4 ${isUrgent ? 'text-white' : 'text-amber-400'}`} />
          <span>{timeFormatted}</span>
        </div>

        <button type="button" onClick={onTogglePause} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white border border-[#2D2A26]/20 text-[#2D2A26] hover:bg-[#F8F6F0] cursor-pointer shadow-2xs">
          {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-amber-600" />}
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
        </button>

        <button type="button" onClick={onToggleClues} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer shadow-2xs ${
          cluesRevealed ? 'bg-amber-500 text-white border-amber-600' : 'bg-white border-[#2D2A26]/20 text-[#2D2A26] hover:bg-[#F8F6F0]'
        }`}>
          {cluesRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#D97706]" />}
          <span>{cluesRevealed ? 'Hide Clues' : 'Reveal Clues'}</span>
        </button>

        {onClose && (
          <button type="button" onClick={onClose} className="p-1.5 rounded-xl text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-[#F8F6F0] cursor-pointer" title="Exit Present Mode">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
