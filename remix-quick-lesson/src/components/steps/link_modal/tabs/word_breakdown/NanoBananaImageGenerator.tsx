import React, { useState, useEffect, useRef } from 'react';
import { Loader2, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';

interface Props {
  term: string;
  rebus?: string;
  clue?: string;
  currentImageUrl?: string;
  onImageGenerated: (url: string) => void;
}

export const NanoBananaImageGenerator: React.FC<Props> = ({
  term, rebus, clue, currentImageUrl, onImageGenerated
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasTriggeredRef = useRef(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch('/api/generate-nano-banana-puzzle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term, rebus, clue })
      });
      const data = await resp.json();
      if (data?.imageUrl) {
        onImageGenerated(data.imageUrl);
      } else {
        setError('Could not generate visual clue.');
      }
    } catch {
      setError('Connection interrupted. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentImageUrl && !hasTriggeredRef.current && !loading) {
      hasTriggeredRef.current = true;
      handleGenerate();
    }
  }, [currentImageUrl]);

  return (
    <div className="space-y-1.5 w-full">
      {loading ? (
        <div className="w-full h-32 rounded-xl border border-[#D97706]/30 bg-amber-500/10 flex flex-col items-center justify-center gap-2 p-3 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-[#D97706]" />
          <span className="text-xs font-bold text-[#92400E]">Creating Visual Puzzle Clue...</span>
          <span className="text-[10px] text-[#92400E]/70 italic">Rendering memorable concept artwork</span>
        </div>
      ) : currentImageUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-[#2D2A26]/15 bg-[#F8F6F0] group shadow-2xs">
          <img
            src={currentImageUrl}
            alt={`Visual puzzle artwork for ${term}`}
            className="w-full h-32 object-contain bg-white transition-transform group-hover:scale-102 duration-200"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#2D2A26]/85 hover:bg-[#2D2A26] text-white rounded-lg text-[10px] font-semibold flex items-center gap-1 shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-amber-400" /> Regenerate
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-[#D97706]/30 text-[#92400E] flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Generate Visual Clue
        </button>
      )}
      {error && <p className="text-[11px] text-red-600 italic text-center">{error}</p>}
    </div>
  );
};
