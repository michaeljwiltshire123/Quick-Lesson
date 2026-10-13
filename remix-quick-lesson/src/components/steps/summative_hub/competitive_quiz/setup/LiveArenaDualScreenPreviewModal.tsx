import React, { useState } from 'react';
import { X, Play, Monitor, Smartphone, ChevronLeft, ChevronRight, Sparkles, Gift } from 'lucide-react';
import { QuestionCard, TTSVoicePreset, PlayerState, DecoyViolation } from '../types/competitiveQuizTypes';
import { CompetitiveQuizMainBoard } from '../board/CompetitiveQuizMainBoard';
import { StudentCompetitiveQuizContainer } from '../student_view/StudentCompetitiveQuizContainer';
import { PhoneSimulatorFrame } from './PhoneSimulatorFrame';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
  questions: QuestionCard[];
  voicePreset: TTSVoicePreset;
  onLaunchLobby: () => void;
}

export const LiveArenaDualScreenPreviewModal: React.FC<Props> = ({
  isOpen,
  onClose,
  roomCode,
  questions,
  voicePreset,
  onLaunchLobby,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'split' | 'projector' | 'phone'>('split');
  const [chestActive, setChestActive] = useState(false);
  const [activeViolation, setActiveViolation] = useState<DecoyViolation | null>(null);
  const [player, setPlayer] = useState<PlayerState>({
    id: 'sim-pupil',
    name: 'Oliver (Year 8)',
    score: 340,
    streak: 3,
    shields: 1,
    activePowerUps: [],
    phoneGyroOrientation: { beta: 0, gamma: 0, isStealingReady: false },
    isEliminated: false,
  });

  if (!isOpen || !questions || questions.length === 0) return null;
  const activeQ = questions[currentIdx] || questions[0];

  const handlePotSteal = () => {
    const isTrue = activeQ.patternId === 'true_gold_honeycomb';
    if (isTrue) {
      setPlayer((p) => ({ ...p, score: p.score + (activeQ.accumulatedPot || 1200) }));
      setActiveViolation(null);
    } else {
      const penalty = Math.max(50, Math.floor(player.score * 0.5));
      setPlayer((p) => ({ ...p, score: Math.max(0, p.score - penalty) }));
      setActiveViolation({ playerId: player.id, playerName: player.name, reason: 'Premature upside-down hijack on DECOY skin!', penaltyPoints: penalty, timestamp: Date.now() });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-950 border-2 border-amber-400 rounded-3xl p-4 sm:p-5 max-w-6xl w-full text-white shadow-2xl space-y-3.5 my-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40"><Sparkles className="w-4 h-4" /></span>
            <div><h3 className="text-sm font-black uppercase text-amber-400">Live Arena Simulator</h3><p className="text-[10px] text-gray-400">Round {currentIdx + 1}/{questions.length} • {activeQ.formatLabel}</p></div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex bg-slate-900 border border-white/10 p-0.5 rounded-xl text-xs">
              <button type="button" onClick={() => setViewMode('split')} className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${viewMode === 'split' ? 'bg-amber-400 text-slate-950' : 'text-gray-400'}`}>Dual View</button>
              <button type="button" onClick={() => setViewMode('projector')} className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer ${viewMode === 'projector' ? 'bg-amber-400 text-slate-950' : 'text-gray-400'}`}><Monitor className="w-3 h-3" /> Board</button>
              <button type="button" onClick={() => setViewMode('phone')} className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer ${viewMode === 'phone' ? 'bg-amber-400 text-slate-950' : 'text-gray-400'}`}><Smartphone className="w-3 h-3" /> Phone</button>
            </div>
            <button type="button" onClick={() => setChestActive(!chestActive)} className={`p-1.5 rounded-xl border text-xs font-bold cursor-pointer ${chestActive ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-gray-300'}`}><Gift className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={onLaunchLobby} className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase flex items-center gap-1 shadow-lg cursor-pointer"><Play className="w-3 h-3 fill-current" /> Launch</button>
            <button type="button" onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-xl cursor-pointer"><X className="w-4 h-4" /></button>
          </div>
        </div>

        <div className={`grid gap-3.5 items-start ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          {(viewMode === 'split' || viewMode === 'projector') && (
            <div className={viewMode === 'split' ? 'lg:col-span-7 space-y-1.5' : 'w-full space-y-1.5'}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300"><Monitor className="w-3.5 h-3.5 text-amber-400" /><span>Classroom Projector Screen</span></div>
              <CompetitiveQuizMainBoard roomCode={roomCode} roundNumber={currentIdx + 1} totalRounds={questions.length} activeQuestion={activeQ} secondsRemaining={activeQ.speedLimitSeconds || 10} patternId={activeQ.patternId} voicePreset={voicePreset} activeViolation={activeViolation} isChestDropActive={chestActive} onDismissViolation={() => setActiveViolation(null)} onDismissChestDrop={() => setChestActive(false)} />
            </div>
          )}
          {(viewMode === 'split' || viewMode === 'phone') && (
            <div className={viewMode === 'split' ? 'lg:col-span-5 space-y-1.5' : 'w-full max-w-sm mx-auto space-y-1.5'}>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300"><Smartphone className="w-3.5 h-3.5 text-amber-400" /><span>Pupil Mobile Device</span></div>
              <PhoneSimulatorFrame>
                <StudentCompetitiveQuizContainer player={player} activeQuestion={activeQ} secondsRemaining={activeQ.speedLimitSeconds || 10} isChestDropActive={chestActive} onLockInAnswer={(_, wager) => setPlayer((p) => ({ ...p, score: p.score + (wager || 100), streak: p.streak + 1 }))} onSelectChest={() => setChestActive(false)} onPotStealAttempt={handlePotSteal} />
              </PhoneSimulatorFrame>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs">
          <button type="button" disabled={currentIdx === 0} onClick={() => { setCurrentIdx((i) => Math.max(0, i - 1)); setActiveViolation(null); }} className="px-2.5 py-1 bg-white/10 hover:bg-white/15 disabled:opacity-30 rounded-xl font-bold flex items-center gap-1 cursor-pointer"><ChevronLeft className="w-3.5 h-3.5" /> Previous</button>
          <span className="text-gray-400 font-bold">Round {currentIdx + 1} of {questions.length}: <strong className="text-amber-400">{activeQ.formatLabel}</strong></span>
          <button type="button" disabled={currentIdx === questions.length - 1} onClick={() => { setCurrentIdx((i) => Math.min(questions.length - 1, i + 1)); setActiveViolation(null); }} className="px-2.5 py-1 bg-white/10 hover:bg-white/15 disabled:opacity-30 rounded-xl font-bold flex items-center gap-1 cursor-pointer">Next <ChevronRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
};
