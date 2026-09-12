import React, { useState } from 'react';
import { Palette, CircleDot, Wand2 } from 'lucide-react';
import { QrDesignConfig, QrDotShape, COLOR_PRESETS } from './types';
import { CentreIconSelector } from './CentreIconSelector';
import { extractIconColors } from './colorExtractor';
import { QrContrastMeter } from './QrContrastMeter';

interface QrStyleControlsProps {
  config: QrDesignConfig;
  onChange: (updated: Partial<QrDesignConfig>) => void;
}

export const QrStyleControls: React.FC<QrStyleControlsProps> = ({ config, onChange }) => {
  const [isExtracting, setIsExtracting] = useState(false);

  const handleMatchIcon = async () => {
    setIsExtracting(true);
    try {
      const c = await extractIconColors(config.customIconBase64, config.centerIcon);
      if (c) onChange({ fgColor: c.fg, bgColor: c.bg });
    } finally { setIsExtracting(false); }
  };

  return (
    <div className="flex-1 space-y-3 p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-bold text-[#2D2A26] flex items-center gap-1.5">
            <Palette className="w-3 h-3 text-[#D97706]" /> Colour Palette & Background
          </label>
          <div className="flex items-center gap-2 text-[9px] font-bold text-[#2D2A26]/70">
            <label className="flex items-center gap-1 cursor-pointer"><span>Pattern:</span><input type="color" value={config.fgColor} onChange={(e) => onChange({ fgColor: e.target.value })} className="w-4 h-4 rounded cursor-pointer border border-black/15 bg-transparent" /></label>
            <label className="flex items-center gap-1 cursor-pointer"><span>Bg:</span><input type="color" value={config.bgColor} onChange={(e) => onChange({ bgColor: e.target.value })} className="w-4 h-4 rounded cursor-pointer border border-black/15 bg-transparent" /></label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={handleMatchIcon} disabled={isExtracting || (!config.customIconBase64 && !config.centerIcon)} title="Auto-match QR colours to dominant icon shades (lightest for background, darkest for pattern)" className="px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border border-amber-400/50 bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs hover:from-amber-600 hover:to-amber-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98">
            <Wand2 className={`w-3 h-3 ${isExtracting ? 'animate-spin' : ''}`} /><span>{isExtracting ? 'Matching...' : 'Match Icon'}</span>
          </button>
          {COLOR_PRESETS.map((p) => (
            <button key={p.name} type="button" onClick={() => onChange({ fgColor: p.fg, bgColor: p.bg })} title={`${p.name} (Bg: ${p.bg}, Pattern: ${p.fg})`} className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${config.fgColor.toLowerCase() === p.fg.toLowerCase() && config.bgColor.toLowerCase() === p.bg.toLowerCase() ? 'border-[#D97706] ring-1 ring-[#D97706] bg-amber-50 text-[#2D2A26]' : 'border-[#2D2A26]/15 hover:bg-black/5 text-[#2D2A26]/80'}`}>
              <span className="w-3.5 h-3.5 rounded-sm flex items-center justify-center border border-black/20 shadow-2xs shrink-0" style={{ backgroundColor: p.bg }}><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.fg }} /></span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#2D2A26]/10">
        <div>
          <label className="text-[11px] font-bold text-[#2D2A26] flex items-center gap-1 mb-1"><CircleDot className="w-3 h-3 text-[#D97706]" /> Dot Shape</label>
          <div className="flex gap-1">
            {(['rounded', 'dots', 'squares'] as QrDotShape[]).map((s) => (
              <button key={s} type="button" onClick={() => onChange({ dotShape: s })} className={`flex-1 py-1 rounded-lg text-[10px] font-bold capitalize border transition-all cursor-pointer ${config.dotShape === s ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#F8F6F0] text-[#2D2A26]/70 border-[#2D2A26]/15 hover:bg-white'}`}>
                {s === 'rounded' ? 'Smooth' : s === 'dots' ? 'Circles' : 'Classic'}
              </button>
            ))}
          </div>
        </div>

        <CentreIconSelector config={config} onChange={onChange} />
      </div>

      <div className="pt-2 border-t border-[#2D2A26]/10">
        <QrContrastMeter fgColor={config.fgColor} bgColor={config.bgColor} />
      </div>
    </div>
  );
};
