import React, { useState } from 'react';
import { Shield, Eye, EyeOff, HelpCircle, Lock } from 'lucide-react';
import { ImposterRole, ImposterQuestion } from '../types/imposterTypes';

interface Props {
  role: ImposterRole; question: ImposterQuestion; lessonTitle: string;
}

export const SecretRoleCard: React.FC<Props> = ({ role, question, lessonTitle }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const isInnocent = role === 'innocent';

  return (
    <div id="secret-role-card" className="w-full h-64 [perspective:1000px] select-none">
      <style>{`
        .role-card-inner { transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1); transform-style: preserve-3d; }
        .role-card-flipped { transform: rotateY(180deg); }
        .role-card-face { backface-visibility: hidden; position: absolute; inset: 0; }
        .role-card-back { transform: rotateY(180deg); }
        @keyframes cyberScan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
      `}</style>
      <div 
        onClick={() => setIsRevealed(!isRevealed)}
        className={`w-full h-full relative role-card-inner ${isRevealed ? 'role-card-flipped' : ''}`}
      >
        {/* FRONT FACE (Concealed/Locked State) */}
        <div className="role-card-face w-full h-full bg-stone-900 border border-amber-500/30 rounded-3xl p-5 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <div className="absolute left-0 right-0 h-0.5 bg-amber-500/20 shadow-[0_0_8px_#F59E0B] pointer-events-none" style={{ animation: 'cyberScan 4s linear infinite' }} />
          
          <div className="flex items-center justify-between border-b border-white/10 pb-2 relative z-10">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">Identity Encryption</span>
            </div>
            <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-white/70 flex items-center gap-1">
              <Eye className="w-3 h-3" /> SECURE
            </span>
          </div>

          <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <Lock className="w-5 h-5 animate-pulse" />
            </div>
            <p className="text-xs font-bold text-white/95">Keep Screen Hidden</p>
            <p className="text-[10px] text-white/50 max-w-[240px]">
              Ensure peers cannot see your screen. Tap anywhere to initiate decryption.
            </p>
          </div>

          <div className="text-[9px] text-center text-white/30 tracking-wider font-mono">CODE: ENCR-AMONGUS-CL</div>
        </div>

        {/* BACK FACE (Revealed State) */}
        <div className={`role-card-face role-card-back w-full h-full rounded-3xl p-5 border flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer ${
          isInnocent ? 'bg-emerald-950 text-white border-emerald-500/40' : 'bg-rose-950 text-white border-rose-500/40'
        }`}>
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:12px_12px]" />
          
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 relative z-10">
            <div className="flex items-center gap-2">
              <Shield className={`w-4 h-4 ${isInnocent ? 'text-emerald-400' : 'text-rose-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Transmission Decoded</span>
            </div>
            <button type="button" className="flex items-center gap-1 text-[9px] text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/5 font-mono">
              <EyeOff className="w-3 h-3" /> LOCK CARD
            </button>
          </div>

          <div className="space-y-2 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">Classroom Role</span>
                <h3 className={`text-base font-black tracking-wide ${isInnocent ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {isInnocent ? 'Honest Participant' : 'The Imposter'}
                </h3>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${isInnocent ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border-rose-400/30'}`}>
                {isInnocent ? 'Answer Honestly' : 'Blend In & Bluff'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[9px] text-white/50 uppercase font-bold">Inquiry Context</p>
              <p className="text-xs text-white/90 font-medium truncate">{lessonTitle || 'Our Topic'}</p>
              {!isInnocent && (
                <div className="mt-1.5 pt-1.5 border-t border-white/5 flex items-start gap-1.5 text-[10.5px] text-amber-200">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="font-bold">Topic Clue:</strong> {question.topicClue || lessonTitle}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-[9px] text-center text-white/30 tracking-wider font-mono">DECRYPT COMPLETE · TAP TO CONCEAL</div>
        </div>
      </div>
    </div>
  );
};
