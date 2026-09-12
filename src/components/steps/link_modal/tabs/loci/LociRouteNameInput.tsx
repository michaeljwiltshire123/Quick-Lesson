import React, { useState } from 'react';
import { History, Sparkles, Loader2, MapPin } from 'lucide-react';
import { LOCI_ROUTE_PRESETS } from './constants';
import { LociPreviousRoutesModal } from './LociPreviousRoutesModal';

interface Props {
  routeName: string;
  onChangeRouteName: (name: string) => void;
  onStationsGenerated: (stations: string[]) => void;
  currentAssignedStations: string[];
  subject?: string;
}

export const LociRouteNameInput: React.FC<Props> = ({
  routeName, onChangeRouteName, onStationsGenerated, subject,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPreviousModalOpen, setIsPreviousModalOpen] = useState(false);

  const handleUpdateSuggestions = async () => {
    if (!routeName.trim()) return;
    setIsUpdating(true);
    try {
      const res = await fetch('/api/generate-loci-stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeName, subject }),
      });
      const data = await res.json();
      if (Array.isArray(data?.stations) && data.stations.length > 0) {
        onStationsGenerated(data.stations);
      } else {
        const fb = LOCI_ROUTE_PRESETS.find((p) => p.name.toLowerCase() === routeName.toLowerCase())?.stations;
        if (fb) onStationsGenerated(fb);
      }
    } catch {
      const fb = LOCI_ROUTE_PRESETS.find((p) => p.name.toLowerCase() === routeName.toLowerCase())?.stations;
      if (fb) onStationsGenerated(fb);
    } finally { setIsUpdating(false); }
  };

  return (
    <>
      <div className="bg-white border border-[#2D2A26]/15 rounded-xl p-3 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1">
            <MapPin className="w-4 h-4 text-[#D97706] shrink-0" />
            <input
              id="loci-route-name-input"
              name="loci-route-name-input"
              type="text"
              value={routeName}
              onChange={(e) => onChangeRouteName(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              placeholder="Name your Route (e.g. School Grounds Walk)..."
              className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#2D2A26] placeholder:font-normal placeholder:text-[#2D2A26]/40"
            />
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsPreviousModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-[#2D2A26]/15 bg-[#F8F6F0] text-[#2D2A26] hover:bg-black/5 cursor-pointer transition-colors"
            >
              <History className="w-3.5 h-3.5 text-[#D97706]" /> Previously Used
            </button>
            <button
              type="button"
              onClick={handleUpdateSuggestions}
              disabled={isUpdating || !routeName.trim()}
              className="px-2.5 py-1.5 bg-[#D97706] text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} Update Suggestions
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5">
          <span className="text-[10px] font-bold uppercase text-[#2D2A26]/50 shrink-0">Presets:</span>
          {LOCI_ROUTE_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => { onChangeRouteName(p.name); onStationsGenerated(p.stations); }}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer border ${routeName.toLowerCase() === p.name.toLowerCase() ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#F8F6F0] text-[#2D2A26]/80 border-[#2D2A26]/10'}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <LociPreviousRoutesModal
        isOpen={isPreviousModalOpen}
        onClose={() => setIsPreviousModalOpen(false)}
        onSelectRoute={(name, stations) => { onChangeRouteName(name); if (stations?.length) onStationsGenerated(stations); }}
      />
    </>
  );
};
