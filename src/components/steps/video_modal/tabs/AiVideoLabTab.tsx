import React, { useState } from 'react';
import { Copy, Check, Sliders } from 'lucide-react';
import { AiVideoPlatformLaunchers } from '../AiVideoPlatformLaunchers';

const STYLES = ['Cinematic 35mm', '3D Stylised Animation', 'Claymation Stop-Motion', 'Vintage 16mm Film', 'Drone Fly-Through', 'Slow-Motion Macro'];
const MOTIONS = ['Smooth Orbit Cam', 'Dynamic Fast Tracking', 'Dramatic Slow Push-In', 'Time-Lapse Speed', 'Continuous One-Take'];
const ABSURDITY_LEVELS: Record<number, string> = {
  1: 'Strictly realistic, accurate academic fidelity, natural physics.',
  2: 'Mild educational dramatisation, vivid lighting accents.',
  3: 'Surreal visual metaphor, unexpected conceptual juxtaposition.',
  4: 'High fantasy / sci-fi setting, dramatic cinematic spectacle.',
  5: 'Maximum creative chaos, hyper-stylised impossible physics.',
};

export const AiVideoLabTab: React.FC<{ slideTitle: string; themeNotes?: string }> = ({ slideTitle, themeNotes }) => {
  const [style, setStyle] = useState(STYLES[0]);
  const [motion, setMotion] = useState(MOTIONS[0]);
  const [absurdity, setAbsurdity] = useState(2);
  const [copied, setCopied] = useState(false);

  const promptText = `A ${style.toLowerCase()} video sequence with ${motion.toLowerCase()}, clearly demonstrating the educational concept of "${slideTitle || 'the lesson core'}". ${themeNotes ? `Visual theme accent: ${themeNotes}. ` : ''}${ABSURDITY_LEVELS[absurdity]} Ultra-clear motion, cinematic lighting, 60fps, no artefacts or watermark.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#2D2A26] mb-1">Visual Cinematography</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full text-xs bg-white border border-[#2D2A26]/15 rounded-xl px-3 py-2 text-[#2D2A26]">
            {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#2D2A26] mb-1">Camera Motion</label>
          <select value={motion} onChange={(e) => setMotion(e.target.value)} className="w-full text-xs bg-white border border-[#2D2A26]/15 rounded-xl px-3 py-2 text-[#2D2A26]">
            {MOTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1 bg-[#F8F6F0] p-3 rounded-xl border border-[#2D2A26]/10">
        <div className="flex items-center justify-between text-xs font-bold text-[#2D2A26]">
          <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-[#D97706]" /> Absurdity Level: {absurdity}/5</span>
          <span className="text-[11px] font-normal text-[#2D2A26]/70 truncate max-w-[200px]">{ABSURDITY_LEVELS[absurdity].split(',')[0]}</span>
        </div>
        <input type="range" min={1} max={5} value={absurdity} onChange={(e) => setAbsurdity(Number(e.target.value))} className="w-full accent-[#F59E0B] cursor-pointer" />
      </div>

      <div className="p-3 bg-white rounded-xl border border-[#2D2A26]/15 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#2D2A26]/70 uppercase tracking-wide">Compiled AI Video Prompt</span>
          <button type="button" onClick={handleCopy} className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded-lg text-xs font-bold border border-amber-200 flex items-center gap-1 cursor-pointer">
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#D97706]" />}
            <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
          </button>
        </div>
        <p className="text-xs font-mono text-[#2D2A26] bg-[#F8F6F0]/60 p-2.5 rounded-lg border border-[#2D2A26]/10 max-h-24 overflow-y-auto leading-relaxed">
          {promptText}
        </p>
      </div>

      <AiVideoPlatformLaunchers />
    </div>
  );
};
