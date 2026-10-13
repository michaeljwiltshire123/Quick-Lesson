import React from 'react';
import { Lock, Zap } from 'lucide-react';
import { PuzzleLock, SabotageType } from './typesEscape';
import { LockCipherSelector } from './LockCipherSelector';
import { LessonChunk } from '../../../../types';

interface Props {
  lock: PuzzleLock;
  chunks: LessonChunk[];
  onChangeLock: (lock: PuzzleLock) => void;
}

const SABOTAGE_EFFECTS: { type: SabotageType; label: string; desc: string }[] = [
  { type: 'fog', label: 'Smoke Fog', desc: 'Blurs opposing terminal view' },
  { type: 'key_reset', label: 'Lock Scramble', desc: 'Resets target dials without granting key' },
  { type: 'freeze', label: 'Cryo Lock', desc: 'Freezes input entry for 15s' },
  { type: 'glitch', label: 'Data Glitch', desc: 'Scrambles clue display characters' },
  { type: 'mirror', label: 'Mirror Optics', desc: 'Inverts viewport horizontally' },
  { type: 'flip', label: 'Gravity Invert', desc: 'Flips screen layout upside down' },
];

export const PuzzleLockCard: React.FC<Props> = ({ lock, chunks, onChangeLock }) => (
  <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs space-y-3">
    <div className="flex items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2.5">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black">
          {lock.lockNumber}
        </div>
        <input
          type="text"
          value={lock.title}
          onChange={(e) => onChangeLock({ ...lock, title: e.target.value })}
          className="text-xs font-bold text-[#2D2A26] bg-transparent border-b border-transparent hover:border-amber-400 focus:border-amber-500 focus:outline-none px-1 py-0.5"
        />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
        <Lock className="w-3 h-3 text-[#D97706]" />
        <span>Station Lock {lock.lockNumber}</span>
      </div>
    </div>

    <div>
      <label className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70 block mb-1">
        Clue Prompt & Investigation Scenario
      </label>
      <textarea
        rows={2}
        value={lock.cluePrompt}
        onChange={(e) => onChangeLock({ ...lock, cluePrompt: e.target.value })}
        placeholder="Provide the scenario clue for this lock..."
        className="w-full px-3 py-2 text-xs rounded-xl border border-[#2D2A26]/20 bg-[#F8F6F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    <LockCipherSelector
      cipherType={lock.cipherType}
      onChangeCipher={(cipherType) => onChangeLock({ ...lock, cipherType })}
      solutionCode={lock.solutionCode}
      onChangeSolution={(solutionCode) => onChangeLock({ ...lock, solutionCode })}
    />

    <div className="pt-2 border-t border-[#2D2A26]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">Link Concept:</label>
        <select
          value={lock.conceptChunkId || ''}
          onChange={(e) => onChangeLock({ ...lock, conceptChunkId: e.target.value || undefined })}
          className="text-xs font-medium bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-lg px-2 py-1 focus:outline-none"
        >
          <option value="">(Auto: Module Core)</option>
          {chunks.map((c, i) => (
            <option key={c.id || i} value={c.id || String(i)}>Chunk {i + 1}: {c.title}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-[#D97706]" />
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">Sabotage Shot:</label>
        <select
          value={lock.sabotageReward}
          onChange={(e) => onChangeLock({ ...lock, sabotageReward: e.target.value as SabotageType })}
          className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 rounded-lg px-2 py-1 focus:outline-none"
        >
          {SABOTAGE_EFFECTS.map((s) => (
            <option key={s.type} value={s.type}>{s.label} ({s.desc})</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);
