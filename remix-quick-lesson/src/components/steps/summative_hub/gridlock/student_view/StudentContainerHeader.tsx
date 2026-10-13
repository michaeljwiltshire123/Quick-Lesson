import React from 'react';
import { Player } from '../types/gridlockTypes';

interface Props {
  currentStudent: Player;
  roomCode: string;
}

export const StudentContainerHeader: React.FC<Props> = ({ currentStudent, roomCode }) => {
  const isRed = currentStudent.team === 'red';

  return (
    <div className="bg-[#2D2A26] text-white p-4 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2.5">
        <div
          className={`w-3.5 h-3.5 rounded-full ${
            isRed ? 'bg-red-500 ring-4 ring-red-500/30' : 'bg-blue-500 ring-4 ring-blue-500/30'
          }`}
        />
        <div>
          <div className="text-xs font-black">{currentStudent.name}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {isRed ? 'Red Team (Left-Right)' : 'Blue Team (Top-Bottom)'}
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-[10px] text-gray-400 uppercase font-bold">Room</div>
        <div className="text-xs font-mono font-black text-amber-400">{roomCode}</div>
      </div>
    </div>
  );
};
