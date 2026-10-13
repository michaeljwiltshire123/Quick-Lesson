import React from 'react';
import { Layers, Wand2 } from 'lucide-react';
import { EscapeRoomConfig, ThemePreset } from './typesEscape';
import { AntiCheatToolbar } from './AntiCheatToolbar';

interface Props {
  config: EscapeRoomConfig;
  onChangeConfig: (config: EscapeRoomConfig) => void;
  onRegenerateAi: () => void;
  isGenerating: boolean;
}

const THEME_OPTIONS: { key: ThemePreset; label: string }[] = [
  { key: 'hollywood', label: '🎬 Hollywood Crisis' },
  { key: 'cyber', label: '💻 Cyber Lockdown' },
  { key: 'tomb', label: '📜 Ancient Archive' },
  { key: 'space', label: '🚀 Orbital Outpost' },
  { key: 'custom', label: '⚙️ Custom Brief' },
];

export const EscapeRoomControls: React.FC<Props> = ({
  config, onChangeConfig, onRegenerateAi, isGenerating,
}) => (
  <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-5 shadow-xs space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full border border-[#F59E0B]/20">
          Scenario Theme & Anti-Cheat Engine
        </span>
        <h3 className="text-base font-bold text-[#2D2A26] mt-1">Escape Room Scenario Setup</h3>
      </div>
      <button
        type="button"
        onClick={onRegenerateAi}
        disabled={isGenerating}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#2D2A26] hover:bg-black text-white cursor-pointer shadow-xs active:scale-98 transition-all disabled:opacity-50"
      >
        <Wand2 className={`w-3.5 h-3.5 text-[#F59E0B] ${isGenerating ? 'animate-spin' : ''}`} />
        <span>{isGenerating ? 'Synthesising...' : 'Regenerate Narrative & Locks'}</span>
      </button>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      {THEME_OPTIONS.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChangeConfig({ ...config, themePreset: t.key })}
          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
            config.themePreset === t.key
              ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
              : 'bg-[#F8F6F0] text-[#2D2A26] border-[#2D2A26]/15 hover:bg-white'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>

    {config.themePreset === 'custom' && (
      <input
        type="text"
        value={config.customThemeTitle || ''}
        onChange={(e) => onChangeConfig({ ...config, customThemeTitle: e.target.value })}
        placeholder="Enter custom vocational scenario title..."
        className="w-full px-3 py-2 text-xs rounded-xl border border-[#2D2A26]/20 bg-[#F8F6F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    )}

    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#2D2A26]/10">
      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2D2A26] select-none">
        <input
          type="checkbox"
          checked={config.batchSubmission}
          onChange={(e) => onChangeConfig({ ...config, batchSubmission: e.target.checked })}
          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
        />
        <Layers className="w-3.5 h-3.5 text-[#D97706]" />
        <span>Batch Submission (All 4 Locks at Once)</span>
      </label>

      <AntiCheatToolbar
        antiCheat={config.antiCheat}
        onToggle={(key) => onChangeConfig({
          ...config,
          antiCheat: { ...config.antiCheat, [key]: !config.antiCheat[key] },
        })}
      />
    </div>
  </div>
);
