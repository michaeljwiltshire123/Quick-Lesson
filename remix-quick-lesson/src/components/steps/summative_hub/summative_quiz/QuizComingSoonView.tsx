import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

interface Props {
  title: string;
}

export const QuizComingSoonView: React.FC<Props> = ({ title }) => (
  <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-12 text-center space-y-4 shadow-xs">
    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto text-amber-700">
      <Lock className="w-6 h-6" />
    </div>
    <div className="space-y-1">
      <h3 className="text-lg font-bold text-[#2D2A26]">{title}</h3>
      <p className="text-xs text-[#2D2A26]/70 max-w-md mx-auto">
        This engaging interactive game mode is currently under active UK curriculum development. Check back soon for immersive curriculum-grounded gameplay!
      </p>
    </div>
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F6F0] border border-[#2D2A26]/10 rounded-xl text-xs font-bold text-[#D97706]">
      <Sparkles className="w-3.5 h-3.5" />
      <span>Coming Soon in UK Curriculum Suite</span>
    </div>
  </div>
);
