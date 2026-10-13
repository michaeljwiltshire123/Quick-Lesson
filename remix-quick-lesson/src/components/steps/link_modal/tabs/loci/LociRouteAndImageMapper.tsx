import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Wand2, Loader2, AlertTriangle, MapPin } from 'lucide-react';
import { LociAssociationOption } from './types';
import { LOCI_ROUTE_PRESETS } from './constants';
import { LociAssociationsList } from './LociAssociationsList';
import { fetchLociAssociationsApi } from './lociApiHelpers';

interface Props {
  terms: string[];
  selectedRouteName: string;
  onChangeRouteName: (name: string) => void;
  initialStationSuggestions?: string[];
  associations: LociAssociationOption[];
  onChangeAssociations: (assocs: LociAssociationOption[]) => void;
  onNext: () => void;
  onBack: () => void;
  subject?: string;
}

export const LociRouteAndImageMapper: React.FC<Props> = ({
  terms, selectedRouteName, initialStationSuggestions = [], associations, onChangeAssociations, onNext, onBack, subject,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [warningNotice, setWarningNotice] = useState<string | null>(null);
  const initialPreset = LOCI_ROUTE_PRESETS.find((p) => p.name.toLowerCase() === selectedRouteName.toLowerCase()) || LOCI_ROUTE_PRESETS[0];
  const [stationSuggestions, setStationSuggestions] = useState<string[]>(initialStationSuggestions.length > 0 ? initialStationSuggestions : initialPreset.stations);

  useEffect(() => {
    if (initialStationSuggestions.length > 0) {
      setStationSuggestions(initialStationSuggestions);
    } else {
      const match = LOCI_ROUTE_PRESETS.find((p) => p.name.toLowerCase() === selectedRouteName.toLowerCase());
      if (match?.stations?.length) setStationSuggestions(match.stations);
    }
  }, [selectedRouteName, initialStationSuggestions]);

  const loadAssociations = async () => {
    setIsLoading(true);
    const data = await fetchLociAssociationsApi(terms, associations, subject);
    onChangeAssociations(data.map((a) => ({ ...a, station: a.station || '' })));
    setIsLoading(false);
  };

  useEffect(() => { if (associations.length === 0 && terms.length > 0) loadAssociations(); }, [terms]);

  const assignedCount = associations.filter((a) => a.station.trim().length > 0).length;

  const handleNext = () => {
    const firstEmpty = associations.findIndex((a) => !a.station.trim());
    if (firstEmpty !== -1) {
      setWarningNotice(`Please assign a place for "${associations[firstEmpty].term}" before continuing.`);
      const target = document.getElementById(`loci-station-input-${firstEmpty}`);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setWarningNotice(null);
    onNext();
  };

  const jumpToFirstEmpty = () => {
    const firstEmpty = associations.findIndex((a) => !a.station.trim());
    if (firstEmpty !== -1) {
      const target = document.getElementById(`loci-station-input-${firstEmpty}`);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= associations.length) return;
    const copy = [...associations];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    onChangeAssociations(copy);
  };

  const update = (t: string, p: Partial<LociAssociationOption>) => {
    if (warningNotice) setWarningNotice(null);
    onChangeAssociations(associations.map((a) => a.term === t ? { ...a, ...p } : a));
  };

  return (
    <div className="space-y-2.5">
      <div className="bg-white border border-[#2D2A26]/15 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#2D2A26]">
          <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
          Route: <span className="text-[#D97706]">{selectedRouteName || 'Custom Route'}</span>
        </div>
        <span className="text-[11px] text-[#2D2A26]/60 font-semibold">{assignedCount} of {associations.length} locations assigned</span>
      </div>

      <div className="flex items-center justify-between text-xs px-1">
        <span className="font-bold text-[#2D2A26]">Map each term to its specific station & imagery</span>
        <button type="button" onClick={loadAssociations} disabled={isLoading} className="font-bold text-[#D97706] flex items-center gap-1 cursor-pointer disabled:opacity-40">
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />} Regenerate
        </button>
      </div>
      {warningNotice && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-2 text-xs font-bold text-amber-900 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" /> {warningNotice}
        </div>
      )}
      <LociAssociationsList associations={associations} stationSuggestions={stationSuggestions} onUpdate={update} onMoveItem={moveItem} />
      <div className="flex items-center justify-between pt-1">
        <button type="button" onClick={onBack} className="px-4 py-2 border border-[#2D2A26]/20 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
        <div className="flex items-center gap-2">
          {assignedCount < associations.length ? (
            <span className="text-[11px] text-amber-800 font-bold">
              ⚠️ {associations.length - assignedCount} place(s) unassigned
            </span>
          ) : (
            <span className="text-[11px] text-[#2D2A26]/60">Ready for walkthrough!</span>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-[#2D2A26] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            Next: Walkthrough <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
