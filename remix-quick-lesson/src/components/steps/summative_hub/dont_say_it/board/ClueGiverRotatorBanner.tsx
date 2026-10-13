import React, { useState, useEffect } from 'react';
import { Player } from '../types/dontSayItTypes';
import { Mic, Zap, RefreshCw } from 'lucide-react';
import { playAudioBeep } from '../../gridlock/helpers/audioBeepEngine';

interface Props {
  activeTeamPlayers: Player[];
  excludedPlayerId?: string;
  isGameActive: boolean;
  onClueGiverChange?: (player: Player) => void;
}

export const ClueGiverRotatorBanner: React.FC<Props> = ({
  activeTeamPlayers,
  excludedPlayerId,
  isGameActive,
  onClueGiverChange,
}) => {
  const eligible = activeTeamPlayers.filter((p) => p.id !== excludedPlayerId);
  const [activeSpeaker, setActiveSpeaker] = useState<Player | null>(eligible[0] || null);
  const [secondsUntilSwitch, setSecondsUntilSwitch] = useState(5);

  useEffect(() => {
    if (!isGameActive || eligible.length <= 1) return;

    const interval = setInterval(() => {
      setSecondsUntilSwitch((prev) => {
        if (prev <= 3 && prev > 1) {
          playAudioBeep(660, 60); // 3-2-1 cue tick
        } else if (prev <= 1) {
          playAudioBeep(990, 100); // switch chime
          const pool = eligible.filter((p) => p.id !== activeSpeaker?.id);
          const next = pool[Math.floor(Math.random() * pool.length)] || eligible[0];
          setActiveSpeaker(next);
          onClueGiverChange?.(next);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive, eligible, activeSpeaker, onClueGiverChange]);

  if (!activeSpeaker) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between border border-amber-400/40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white ring-2 ring-white/40">
          <Mic className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-amber-100 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-amber-200" /> Active Clue Giver (5s Rotation)
          </div>
          <div className="text-lg font-black tracking-tight text-white">{activeSpeaker.name}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl border border-white/20">
        <RefreshCw className="w-3.5 h-3.5 text-amber-200 animate-spin" />
        <span className="text-xs font-mono font-black text-amber-200">Switching in {secondsUntilSwitch}s</span>
      </div>
    </div>
  );
};
