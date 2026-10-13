import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, PartyPopper, Music } from 'lucide-react';

interface SoundboardAndConfettiProps {
  onTriggerConfetti: () => void;
}

export const playSynthesizedSound = (type: 'applause' | 'boom' | 'horn' | 'drumroll') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'boom') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'horn') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(450, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      // Applause / Drumroll chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    }
  } catch {
    // AudioContext blocked or not supported
  }
};

export const SoundboardAndConfetti: React.FC<SoundboardAndConfettiProps> = ({ onTriggerConfetti }) => {
  return (
    <div className="flex items-center gap-1 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-700 text-white shadow-xl text-xs">
      <button
        type="button"
        onClick={onTriggerConfetti}
        className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold rounded-xl flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
        title="1-Click Confetti Burst Celebration"
      >
        <PartyPopper className="w-3.5 h-3.5" />
        <span>Confetti!</span>
      </button>

      <div className="h-4 w-px bg-stone-700 mx-0.5" />

      <button
        type="button"
        onClick={() => playSynthesizedSound('applause')}
        className="p-1.5 hover:bg-stone-800 rounded-lg text-amber-300 cursor-pointer"
        title="Cheer / Chime"
      >
        👏
      </button>
      <button
        type="button"
        onClick={() => playSynthesizedSound('boom')}
        className="p-1.5 hover:bg-stone-800 rounded-lg text-rose-400 cursor-pointer"
        title="Dramatic Boom Effect"
      >
        💥
      </button>
      <button
        type="button"
        onClick={() => playSynthesizedSound('horn')}
        className="p-1.5 hover:bg-stone-800 rounded-lg text-yellow-300 cursor-pointer"
        title="Victory Horn"
      >
        🎺
      </button>
      <button
        type="button"
        onClick={() => playSynthesizedSound('drumroll')}
        className="p-1.5 hover:bg-stone-800 rounded-lg text-blue-300 cursor-pointer"
        title="Drumroll Suspense"
      >
        🥁
      </button>
    </div>
  );
};
