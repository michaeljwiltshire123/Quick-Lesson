import React, { useEffect } from 'react';
import { Shield, Sparkles, Users, RefreshCw } from 'lucide-react';
import { LifelineType } from '../typesLadder';

interface Props {
  type: LifelineType;
  onComplete: () => void;
  isSpeaking: boolean;
}

export const LadderLifelineInterrupt: React.FC<Props> = ({ type, onComplete, isSpeaking }) => {
  useEffect(() => {
    // Automatically close the takeover after 3.5 seconds if host is not reading, or let the user click
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [type]);

  const config = {
    fifty_fifty: {
      title: '50:50 Lifeline Triggered!', icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      desc: 'Harnessing AI to vaporise two incorrect options from the board...',
      color: 'border-amber-500/30 bg-amber-950/20 text-amber-200',
    },
    safety_shield: {
      title: 'Safety Shield Deployed!', icon: <Shield className="w-8 h-8 text-emerald-400 animate-pulse" />,
      desc: 'A permanent forcefield surrounds this Rung! Incorrect answers will NOT drop your points!',
      color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200',
    },
    ask_room: {
      title: 'Class Vote Commencing!', icon: <Users className="w-8 h-8 text-blue-400" />,
      desc: 'All student devices are now unlocked for polling. Submit your opinions!',
      color: 'border-blue-500/30 bg-blue-950/20 text-blue-200',
    },
    question_swap: {
      title: 'Swapping Tower Challenge!', icon: <RefreshCw className="w-8 h-8 text-orange-400 animate-spin" />,
      desc: 'Vetoing this question and synthesising an alternative UK grade standard replacement...',
      color: 'border-orange-500/30 bg-orange-950/20 text-orange-200',
    },
  }[type] || {
    title: 'Lifeline Activated!', icon: <Sparkles className="w-8 h-8 text-amber-400" />,
    desc: 'Deploying team lifeline to support the class climb...',
    color: 'border-white/10 bg-white/5 text-gray-200',
  };

  return (
    <div className={`w-full p-6 border rounded-2xl ${config.color} text-center space-y-4 shadow-xl animate-in zoom-in-95`}>
      <div className="flex justify-center">{config.icon}</div>
      <div className="space-y-1.5">
        <h3 className="text-base font-black tracking-wide uppercase">{config.title}</h3>
        <p className="text-xs leading-relaxed max-w-md mx-auto opacity-90">{config.desc}</p>
      </div>
      <div className="pt-2">
        <button type="button" onClick={onComplete} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all">
          Skip Intermission
        </button>
      </div>
    </div>
  );
};
