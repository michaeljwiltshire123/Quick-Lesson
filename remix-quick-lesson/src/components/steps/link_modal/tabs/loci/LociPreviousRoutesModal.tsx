import React, { useState, useEffect } from 'react';
import { X, History, MapPin, Trash2, CheckCircle2 } from 'lucide-react';
import { getPersonalSavedRoutes, removePersonalSavedRoute, SavedPersonalRoute } from './lociVaultStorage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (routeName: string, stations: string[]) => void;
}

export const LociPreviousRoutesModal: React.FC<Props> = ({ isOpen, onClose, onSelectRoute }) => {
  const [routes, setRoutes] = useState<SavedPersonalRoute[]>([]);

  useEffect(() => {
    if (isOpen) setRoutes(getPersonalSavedRoutes());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removePersonalSavedRoute(name);
    setRoutes(getPersonalSavedRoutes());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white border border-[#2D2A26]/20 rounded-2xl shadow-xl w-full max-w-md p-4 space-y-3 relative">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#D97706]/15 rounded-lg text-[#D97706]"><History className="w-4 h-4" /></div>
            <div>
              <h3 className="text-xs font-black text-[#2D2A26] uppercase tracking-wide">Previously Used Routes</h3>
              <p className="text-[11px] text-[#2D2A26]/60">Memory Palace journeys from your prior lessons</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-[#2D2A26]/60 hover:bg-black/5 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {routes.length === 0 ? (
          <div className="py-8 px-4 text-center space-y-2 bg-[#F8F6F0] rounded-xl border border-dashed border-[#2D2A26]/15">
            <MapPin className="w-6 h-6 text-[#D97706] mx-auto opacity-70" />
            <p className="text-xs font-bold text-[#2D2A26]">No Saved Memory Palace Routes</p>
            <p className="text-[11px] text-[#2D2A26]/70 max-w-xs mx-auto leading-relaxed">
              There are no saved Memory Palace routes in your library yet. Completed routes are automatically saved here for your future lessons.
            </p>
          </div>
        ) : (
          <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1">
            {routes.map((r) => (
              <div key={r.name} className="flex items-center justify-between p-2.5 rounded-xl border border-[#2D2A26]/15 bg-[#F8F6F0] hover:bg-amber-50/40 hover:border-amber-300 transition-all">
                <div className="space-y-0.5 flex-1 pr-2">
                  <div className="text-xs font-bold text-[#2D2A26]">{r.name}</div>
                  <div className="text-[10px] text-[#2D2A26]/60 line-clamp-1">
                    {r.stations.length > 0 ? r.stations.join(' ➔ ') : 'Custom sequence'}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button type="button" onClick={() => { onSelectRoute(r.name, r.stations); onClose(); }} className="px-2.5 py-1 bg-[#2D2A26] text-white text-[11px] font-bold rounded-lg flex items-center gap-1 cursor-pointer">
                    <CheckCircle2 className="w-3 h-3 text-[#D97706]" /> Select
                  </button>
                  <button type="button" onClick={(e) => handleDelete(r.name, e)} title="Remove route" className="p-1 rounded-md text-[#2D2A26]/40 hover:text-red-600 hover:bg-black/5 cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-1">
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-[#F8F6F0] border border-[#2D2A26]/15 text-xs font-bold text-[#2D2A26] rounded-xl hover:bg-black/5 cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
