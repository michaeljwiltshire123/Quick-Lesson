import React, { useState } from 'react';
import { Clock, Search, Users } from 'lucide-react';
import { CLASSROOM_PEERS } from './classroomPeersData';

interface Props {
  isChoosingPeer: boolean;
  peerState: 'none' | 'waiting' | 'advice';
  peerSelected: string | null;
  setPeerSelected: (v: string | null) => void;
  peerGraceTime: number;
}

export const LadderPeerConsultView: React.FC<Props> = ({
  isChoosingPeer, peerState, setPeerSelected,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (isChoosingPeer) {
    const filtered = CLASSROOM_PEERS.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="flex-1 flex flex-col p-2 bg-black/50 border border-white/10 rounded-xl space-y-1.5 overflow-hidden font-sans min-h-[160px] shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <Users className="w-2.5 h-2.5 text-amber-400" />
            Nominate Peer ({CLASSROOM_PEERS.length} Pupils)
          </span>
          <span className="text-[7px] text-gray-400 font-mono">Tap any name</span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search class member..."
            className="w-full bg-white/5 border border-white/10 rounded-md py-0.5 px-2 text-[8px] text-gray-200 placeholder-gray-500 focus:outline-hidden focus:border-amber-400 font-sans"
          />
          <Search className="w-2.5 h-2.5 text-gray-500 absolute right-2 top-1.5 pointer-events-none" />
        </div>

        <div className="flex-1 overflow-y-auto max-h-[120px] space-y-1 pr-0.5">
          {filtered.length === 0 ? (
            <div className="p-2 text-center text-[8px] text-gray-500">No pupil found</div>
          ) : (
            filtered.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setPeerSelected(p.name)}
                className="w-full p-1.5 bg-white/5 hover:bg-amber-500/20 hover:border-amber-500/40 border border-white/5 rounded-lg text-left flex items-center justify-between cursor-pointer font-sans text-[9px] transition-all group"
              >
                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-bold text-gray-200 group-hover:text-amber-200 truncate">{p.name}</span>
                  {p.badge && <span className="text-[9px]">{p.badge}</span>}
                </div>
                <span className="text-amber-400 font-mono text-[8px] shrink-0 ml-1 font-bold">{p.score}</span>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  if (peerState === 'waiting') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center p-4 bg-purple-950/20 border border-purple-500/20 rounded-xl shrink-0 animate-pulse font-sans">
        <Clock className="w-6 h-6 text-purple-400 animate-spin" />
        <span className="text-[9px] font-bold text-purple-300 mt-1">WAITING FOR NOMINATED PLAYER TO ANSWER... ⏳</span>
      </div>
    );
  }

  return null;
};
export default LadderPeerConsultView;
