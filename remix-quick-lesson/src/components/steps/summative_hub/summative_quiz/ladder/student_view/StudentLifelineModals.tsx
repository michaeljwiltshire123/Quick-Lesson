import React from 'react';
import { LifelineType } from '../typesLadder';
import { Users, HelpCircle, Shield, X } from 'lucide-react';

interface Props {
  activeModal: LifelineType | null;
  onClose: () => void;
  onConfirmAction?: (data?: unknown) => void;
}

export const StudentLifelineModals: React.FC<Props> = ({ activeModal, onClose, onConfirmAction }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn font-sans">
      <div className="bg-white border-2 border-amber-500 rounded-3xl p-5 max-w-sm w-full shadow-xl space-y-4 text-center">
        <div className="flex items-center justify-between pb-2 border-b border-[#2D2A26]/10">
          <span className="text-xs font-bold text-[#2D2A26] uppercase">Lifeline Activated</span>
          <button type="button" onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeModal === 'ask_room' && (
          <div className="space-y-3">
            <Users className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="text-sm font-bold text-[#2D2A26]">Classroom Vote Distribution</h4>
            <div className="space-y-1.5 text-left text-xs">
              {['A: 65%', 'B: 15%', 'C: 10%', 'D: 10%'].map((bar, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-12 font-bold font-mono">{bar.split(':')[0]}</span>
                  <div className="flex-1 bg-[#F8F6F0] h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full animate-pulse" style={{ width: bar.split(' ')[1] }} />
                  </div>
                  <span className="font-extrabold font-mono">{bar.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === 'ask_player' && (
          <div className="space-y-3">
            <HelpCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="text-sm font-bold text-[#2D2A26]">Consult Nominated Expert Peer</h4>
            <p className="text-xs text-[#2D2A26]/70">Nominated peer recommendation: <span className="font-bold text-amber-800">Option A</span>.</p>
            <button type="button" onClick={() => { onConfirmAction?.(0); onClose(); }}
              className="w-full py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer">
              Adopt Option A
            </button>
          </div>
        )}

        {activeModal === 'safety_shield' && (
          <div className="space-y-3">
            <Shield className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-[#2D2A26]">Safety Shield Active</h4>
            <p className="text-xs text-[#2D2A26]/70">Your point total on this rung is protected if an incorrect option is chosen.</p>
          </div>
        )}

        <button type="button" onClick={onClose}
          className="w-full py-2 bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs font-bold cursor-pointer hover:bg-white">
          Close Window
        </button>
      </div>
    </div>
  );
};
