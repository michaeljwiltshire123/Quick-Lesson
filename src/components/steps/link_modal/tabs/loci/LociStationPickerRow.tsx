import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';

interface Props {
  index: number; term: string; station: string; stationSuggestions: string[];
  isStationEmpty: boolean; onChangeStation: (term: string, val: string) => void;
}

const DEFAULT_STATIONS = [
  'Main Entrance / Doorway', 'Front Left Corner', 'Front Main Wall',
  'Centre Area / Main Table', 'Right Window / Side Wall', 'Rear Right Corner',
  'Rear Wall', 'Rear Left Corner', 'Left Side Wall', 'Exit / Back Doorway',
];

export const LociStationPickerRow: React.FC<Props> = ({
  index, term, station, stationSuggestions, isStationEmpty, onChangeStation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const rawOptions = (stationSuggestions && stationSuggestions.length > 0) ? stationSuggestions : DEFAULT_STATIONS;
  const typedText = (station || '').trim().toLowerCase();
  
  // Filter options as the user types so that if they type 'B' or 'Be', only matching suggestions remain
  const filteredOptions = typedText
    ? rawOptions.filter((st) => st.toLowerCase().includes(typedText))
    : rawOptions;

  const currentVal = typedText;
  const shouldShowDropdown = isOpen && filteredOptions.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <MapPin className={`w-3.5 h-3.5 absolute left-2.5 pointer-events-none transition-colors ${isStationEmpty ? 'text-amber-500' : 'text-[#D97706]'}`} />
        <input
          id={`loci-station-input-${index}`}
          name={`loci-place-input-${index}`}
          type="text"
          value={station}
          onChange={(e) => { onChangeStation(term, e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          autoComplete="off"
          spellCheck={false}
          placeholder="Choose a suggested place or type your own..."
          className={`w-full bg-white rounded-xl pl-8 pr-8 py-2 text-xs font-semibold text-[#2D2A26] placeholder-[#2D2A26]/40 border transition-all shadow-2xs focus:outline-none ${
            isStationEmpty
              ? 'border-amber-400 bg-amber-50/40 focus:ring-2 focus:ring-amber-400/20'
              : 'border-[#2D2A26]/15 hover:border-[#2D2A26]/30 focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/15'
          }`}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-2 p-1 text-[#2D2A26]/40 hover:text-[#2D2A26] rounded-md transition-colors cursor-pointer"
          title="Show suggested places"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? 'rotate-180 text-[#D97706]' : ''}`} />
        </button>
      </div>

      {shouldShowDropdown && (
        <div
          id={`loci-station-dropdown-${index}`}
          className="absolute z-50 left-0 right-0 top-[calc(100%+4px)] bg-white border border-[#2D2A26]/15 rounded-xl shadow-xl overflow-hidden py-1 max-h-56 overflow-y-auto"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#2D2A26]/60 uppercase tracking-wider bg-[#F8F6F0] border-b border-[#2D2A26]/8 flex items-center justify-between">
            <span>Suggested places & features</span>
            <span className="font-mono text-[9px] bg-amber-100 text-[#D97706] px-1.5 py-0.5 rounded-full font-bold">{filteredOptions.length} Options</span>
          </div>
          {filteredOptions.map((st, i) => (
            <button
              key={`${st}-${i}`}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); onChangeStation(term, st); setIsOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                st.toLowerCase() === currentVal ? 'bg-amber-50 text-[#D97706] font-bold' : 'text-[#2D2A26] hover:bg-[#F8F6F0] hover:text-[#D97706]'
              }`}
            >
              <span className="truncate">{st}</span>
              {st.toLowerCase() === currentVal && <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
