import React, { useState } from 'react';
import { Lightbulb, Video, Paperclip, X } from 'lucide-react';

interface AideMemoireProps {
  rawNotes: string;
  onRawNotesChange: (val: string) => void;
  videoLinks: string[];
  onAddVideoLink: (link: string) => void;
  onRemoveVideoLink: (idx: number) => void;
  draftFileName?: string;
  onRemoveDraftFile: () => void;
  moduleBriefFileName?: string;
  onRemoveModuleBriefFile: () => void;
}

export const AideMemoire: React.FC<AideMemoireProps> = ({
  rawNotes, onRawNotesChange, videoLinks, onAddVideoLink, onRemoveVideoLink,
  draftFileName, onRemoveDraftFile, moduleBriefFileName, onRemoveModuleBriefFile,
}) => {
  const [vidInput, setVidInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  const submitVideo = () => { if (vidInput.trim()) { onAddVideoLink(vidInput.trim()); setVidInput(''); } };
  const submitNote = () => {
    if (noteInput.trim()) {
      onRawNotesChange(rawNotes ? `${rawNotes}\n• ${noteInput.trim()}` : `• ${noteInput.trim()}`);
      setNoteInput('');
    }
  };

  const hasAnyRef = !!moduleBriefFileName || !!draftFileName || videoLinks.length > 0 || !!rawNotes.trim();

  return (
    <aside id="tour-aide-memoire" className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-5 text-[#2D2A26] shadow-xs space-y-4 flex flex-col justify-between">
      <div className="space-y-3.5">
        <div className="flex items-center gap-2 border-b border-[#2D2A26]/10 pb-2.5">
          <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
          <h3 className="text-sm font-bold text-[#2D2A26]">Aide-Mémoire</h3>
        </div>

        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
          {moduleBriefFileName && (
            <div className="flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded-lg border border-[#2D2A26]/15 shadow-2xs">
              <span className="flex items-center gap-1.5 truncate text-[#2D2A26]"><Paperclip className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span className="truncate">{moduleBriefFileName}</span></span>
              <button type="button" onClick={onRemoveModuleBriefFile} className="text-[#2D2A26]/40 hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
            </div>
          )}
          {draftFileName && (
            <div className="flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded-lg border border-[#2D2A26]/15 shadow-2xs">
              <span className="flex items-center gap-1.5 truncate text-[#2D2A26]"><Paperclip className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span className="truncate">{draftFileName}</span></span>
              <button type="button" onClick={onRemoveDraftFile} className="text-[#2D2A26]/40 hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
            </div>
          )}
          {videoLinks.map((v, i) => (
            <div key={i} className="flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded-lg border border-[#2D2A26]/15 shadow-2xs">
              <span className="flex items-center gap-1.5 truncate text-[#2D2A26]"><Video className="w-3.5 h-3.5 text-rose-500 shrink-0" /><span className="truncate">{v}</span></span>
              <button type="button" onClick={() => onRemoveVideoLink(i)} className="text-[#2D2A26]/40 hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
            </div>
          ))}
          {rawNotes.trim() && (
            <div className="flex items-start justify-between text-xs bg-white p-2 rounded-lg border border-[#2D2A26]/15 shadow-2xs">
              <p className="text-[11px] text-[#2D2A26]/80 line-clamp-2 pr-2">{rawNotes}</p>
              <button type="button" onClick={() => onRawNotesChange('')} className="text-[#2D2A26]/40 hover:text-red-500 cursor-pointer shrink-0"><X className="w-3 h-3" /></button>
            </div>
          )}
          {!hasAnyRef && <p className="text-[11px] text-[#2D2A26]/50 italic">No reference items attached yet.</p>}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-[#2D2A26]/10">
        <div className="flex gap-1.5">
          <input type="text" value={vidInput} onChange={(e) => setVidInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitVideo()} placeholder="Paste video link..." className="flex-1 bg-white border border-[#2D2A26]/15 text-[#2D2A26] placeholder-[#2D2A26]/40 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#F59E0B]" />
          <button type="button" onClick={submitVideo} className="px-2.5 py-1 bg-[#F59E0B] text-[#2D2A26] rounded-lg text-xs font-bold cursor-pointer hover:bg-[#F59E0B]/90 shrink-0">+ Link Video</button>
        </div>
        <div className="flex gap-1.5">
          <input type="text" value={noteInput} onChange={(e) => setNoteInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitNote()} placeholder="Add quick idea..." className="flex-1 bg-white border border-[#2D2A26]/15 text-[#2D2A26] placeholder-[#2D2A26]/40 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#F59E0B]" />
          <button type="button" onClick={submitNote} className="px-2.5 py-1 bg-[#2D2A26] hover:bg-[#1F1D1A] text-[#F8F6F0] rounded-lg text-xs font-bold cursor-pointer shrink-0">+ Quick Note</button>
        </div>
      </div>
    </aside>
  );
};
