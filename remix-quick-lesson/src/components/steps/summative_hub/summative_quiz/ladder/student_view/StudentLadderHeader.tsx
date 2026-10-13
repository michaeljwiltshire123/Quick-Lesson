import React from 'react';
import { ActiveLifelineState } from './typesStudentLadder';
import { Shield, Lock, Award, HelpCircle, Users, Zap, RefreshCw, Clock, Sparkles } from 'lucide-react';
import { LifelineType } from '../typesLadder';

interface Props {
  currentRung: number;
  totalRungs: number;
  currentPoints: number;
  safetyNetPoints: number;
  lifelines: ActiveLifelineState[];
  maxStudentLifelines?: number;
  onUseLifeline: (type: LifelineType) => void;
}

const LIFELINE_ICONS: Record<LifelineType, React.ComponentType<{ className?: string }>> = {
  fifty_fifty: Zap,
  ask_room: Users,
  safety_shield: Shield,
  ask_player: HelpCircle,
  question_swap: RefreshCw,
  time_extension: Clock,
  hint_card: HelpCircle,
  double_points: Sparkles,
};

const LIFELINE_LABELS: Record<LifelineType, string> = {
  fifty_fifty: '50:50',
  ask_room: 'Ask Class',
  safety_shield: 'Shield',
  ask_player: 'Ask Peer',
  question_swap: 'Swap',
  time_extension: '+Time',
  hint_card: 'Hint',
  double_points: 'Double',
};

export const StudentLadderHeader: React.FC<Props> = ({
  currentRung, totalRungs, currentPoints, safetyNetPoints, lifelines, maxStudentLifelines = 3, onUseLifeline,
}) => (
  <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 shadow-xs space-y-3 font-sans">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-[#2D2A26] text-white rounded-xl text-xs font-bold font-mono">
          Rung {currentRung} / {totalRungs}
        </span>
        <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-xl text-xs font-extrabold font-mono">
          {currentPoints.toLocaleString()} pts
        </span>
      </div>
      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
        <Lock className="w-3 h-3 text-emerald-600" />
        <span className="font-mono">Guaranteed: {safetyNetPoints.toLocaleString()} pts</span>
      </div>
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-[#2D2A26]/10">
      <span className="text-[11px] font-bold text-[#2D2A26]/70 flex items-center gap-1">
        <Award className="w-3.5 h-3.5 text-[#F59E0B]" /> Active Lifelines (Max {maxStudentLifelines}):
      </span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {lifelines.slice(0, maxStudentLifelines).map((l) => {
          const Icon = LIFELINE_ICONS[l.type] || HelpCircle;
          return (
            <button
              key={l.type}
              type="button"
              disabled={l.used}
              onClick={() => onUseLifeline(l.type)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                l.used
                  ? 'bg-gray-100 text-gray-400 border-gray-200 line-through cursor-not-allowed'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Icon className="w-2.5 h-2.5 text-amber-600" />
              <span>{LIFELINE_LABELS[l.type]}</span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);
