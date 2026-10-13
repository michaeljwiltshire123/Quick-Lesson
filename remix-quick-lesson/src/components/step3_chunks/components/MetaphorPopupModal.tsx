import React, { useState, useEffect } from 'react';
import { Sparkles, X, Loader2 } from 'lucide-react';

interface MetaphorOption { badge: string; metaphor: string; }
interface MetaphorPopupModalProps {
  isOpen: boolean; chunkTitle: string; onClose: () => void;
  onSelectMetaphor: (text: string, badge: string) => void;
  subject?: string; gradeLevel?: string; themeNotes?: string;
}

export const MetaphorPopupModal: React.FC<MetaphorPopupModalProps> = ({
  isOpen, chunkTitle, onClose, onSelectMetaphor, subject, gradeLevel, themeNotes,
}) => {
  const [options, setOptions] = useState<MetaphorOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch('/api/generate-lesson-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'metaphor_suggestions', prompt: chunkTitle, chunkTitle, lessonTitle: chunkTitle, subject, gradeLevel, themeNotes }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.suggestions) && data.suggestions.length > 0) setOptions(data.suggestions.slice(0, 4));
        else setOptions(getFallbackMetaphors(chunkTitle));
      })
      .catch(() => setOptions(getFallbackMetaphors(chunkTitle)))
      .finally(() => setLoading(false));
  }, [isOpen, chunkTitle, subject, gradeLevel, themeNotes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 text-[#2D2A26]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base sm:text-lg">
            <Sparkles className="w-5 h-5 text-[#D97706]" />
            <span>Everyday Analogy Generator</span>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 hover:bg-[#2D2A26]/10 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-[#2D2A26]/80 leading-snug">Select an intuitive, memorable comparison for <strong className="text-[#2D2A26]">{chunkTitle}</strong>:</p>
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-sm font-semibold text-[#2D2A26]/60">
            <Loader2 className="w-6 h-6 animate-spin text-[#D97706]" />
            <span>Crafting 4 memorable analogies...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
            {options.map((opt, i) => (
              <button key={i} type="button" onClick={() => { onSelectMetaphor(opt.metaphor, opt.badge); onClose(); }} className="text-left bg-white border border-[#2D2A26]/15 hover:border-[#D97706] p-4 rounded-xl shadow-2xs cursor-pointer space-y-2 transition-all hover:scale-[1.01]">
                <span className="inline-block text-xs font-extrabold uppercase px-2.5 py-1 bg-[#F8F6F0] text-[#D97706] rounded-md border border-[#2D2A26]/10">{opt.badge}</span>
                <p className="text-xs sm:text-sm text-[#2D2A26] font-medium leading-relaxed">{opt.metaphor}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function getFallbackMetaphors(title: string): MetaphorOption[] {
  return [
    { badge: 'Traffic Lights', metaphor: `Think of ${title} like a busy junction with traffic lights controlling flow so nobody crashes.` },
    { badge: 'Pizza Kitchen', metaphor: `Like ordering a pizza: you request a specific item, the kitchen processes it, and it arrives at your table.` },
    { badge: 'Library Index', metaphor: `Works like a library catalog: find exact information instantly without reading every single book.` },
    { badge: 'Conveyor Belt', metaphor: `Imagine a factory conveyor belt where ${title} moves step-by-step through assembly.` },
  ];
}
