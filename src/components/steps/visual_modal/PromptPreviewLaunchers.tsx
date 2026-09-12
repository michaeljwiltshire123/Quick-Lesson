import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface PromptPreviewLaunchersProps {
  promptText: string;
}

export const PromptPreviewLaunchers: React.FC<PromptPreviewLaunchersProps> = ({ promptText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const launchers = [
    { name: 'Gemini', url: 'https://gemini.google.com', freeTier: '100% Free' },
    { name: 'Meta AI', url: 'https://www.meta.ai', freeTier: '100% Free' },
    { name: 'Ideogram', url: 'https://ideogram.ai', freeTier: '10 free/day' },
    { name: 'Canva', url: 'https://www.canva.com', freeTier: 'Free tier' },
  ];

  return (
    <div className="space-y-2.5 text-sm pt-2 border-t border-[#2D2A26]/10">
      <div className="flex items-center justify-between">
        <span className="font-bold text-[#2D2A26] text-base">Compiled AI Prompt Preview</span>
        <button type="button" onClick={handleCopy} className="px-3.5 py-1.5 bg-[#D97706] hover:bg-amber-700 text-white font-bold rounded-lg text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-xs">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
        </button>
      </div>

      <textarea
        readOnly
        value={promptText}
        rows={3}
        className="w-full bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-lg p-3 font-mono text-sm text-[#2D2A26] resize-none focus:outline-none leading-relaxed"
      />

      <div className="flex items-center gap-2 flex-wrap pt-0.5">
        <span className="text-xs font-bold text-[#2D2A26]/70">Launch Generator:</span>
        {launchers.map((gen) => (
          <a
            key={gen.name}
            href={gen.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/20 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>{gen.name}</span>
            <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded border ${
              gen.freeTier.includes('100%') ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}>
              {gen.freeTier}
            </span>
            <ExternalLink className="w-3 h-3 text-[#2D2A26]/50" />
          </a>
        ))}
      </div>
    </div>
  );
};
