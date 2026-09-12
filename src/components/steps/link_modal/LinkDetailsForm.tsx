import React, { useState, useEffect } from 'react';
import { Plus, HelpCircle, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { ChunkAttachment } from '../../../types';
import { GoogleSharingModeToggle, SharingMode } from './components/GoogleSharingModeToggle';
import { LinkQrDesignerSection } from './designer_qr/LinkQrDesignerSection';
import { QrDesignConfig, DEFAULT_QR_CONFIG } from './designer_qr/types';
import { adjustGoogleUrl, detectPlatform } from './linkHelpers';

interface LinkDetailsFormProps {
  onAttachLink: (att: Partial<ChunkAttachment>) => void;
  initialUrl?: string; initialTitle?: string;
  onUrlChange?: (url: string) => void; onTitleChange?: (title: string) => void;
  chunkTitle?: string; subject?: string; gradeLevel?: string;
}

export const LinkDetailsForm: React.FC<LinkDetailsFormProps> = ({
  onAttachLink, initialUrl = '', initialTitle = '', onUrlChange, onTitleChange,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [name, setName] = useState(initialTitle);
  const [platform, setPlatform] = useState<ChunkAttachment['platform']>('other');
  const [sharingMode, setSharingMode] = useState<SharingMode>('standard');
  const [qrConfig, setQrConfig] = useState<QrDesignConfig>(DEFAULT_QR_CONFIG);
  const [cfuPrompt, setCfuPrompt] = useState('');
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [justAttached, setJustAttached] = useState(false);

  useEffect(() => { setPlatform(detectPlatform(url)); }, [url]);

  const handleSharingChange = (m: SharingMode) => {
    setSharingMode(m);
    const adj = adjustGoogleUrl(url, m);
    if (adj !== url) { setUrl(adj); onUrlChange?.(adj); }
  };

  const handleUrlBlur = async () => {
    if (!url.trim() || name.trim()) return;
    setIsFetchingMeta(true);
    try {
      const resp = await fetch('/api/video-metadata', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url.trim() }) });
      if (resp.ok) { const d = await resp.json(); if (d.title) { setName(d.title); onTitleChange?.(d.title); } }
    } catch { /* fallback */ } finally { setIsFetchingMeta(false); }
  };

  const handleAttach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    const effectiveQr = qrConfig.enabled ? qrConfig : undefined;
    onAttachLink({
      name: name.trim() || 'Interactive Resource',
      type: 'quiz',
      url: url.trim(),
      platform,
      cfuPrompt: cfuPrompt.trim(),
      sharingMode,
      qrDesign: effectiveQr,
    });
    setUrl(''); setName(''); setCfuPrompt(''); setSharingMode('standard');
    setQrConfig(DEFAULT_QR_CONFIG);
    onUrlChange?.(''); onTitleChange?.('');
    setJustAttached(true);
    setTimeout(() => setJustAttached(false), 3000);
  };

  return (
    <form onSubmit={handleAttach} className="space-y-3 bg-white p-4.5 rounded-2xl border border-[#2D2A26]/15 shadow-xs">
      {justAttached && (
        <div className="p-2 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-1.5 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /><span>Resource attached! Form cleared for adding another link.</span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#2D2A26] flex items-center justify-between">
            <span className="flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5 text-[#D97706]" />Resource URL</span>
            {isFetchingMeta && <span className="text-[10px] text-[#D97706] animate-pulse">Fetching title...</span>}
          </label>
          <input type="url" value={url} onChange={(e) => { setUrl(e.target.value); onUrlChange?.(e.target.value); }} onBlur={handleUrlBlur} placeholder="https://docs.google.com/..., canva.com/..." className="w-full text-xs bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl px-3 py-2 text-[#2D2A26] focus:outline-none focus:border-[#D97706]" required />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#2D2A26]">Resource Title</label>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value); onTitleChange?.(e.target.value); }} placeholder="e.g. Activity Deck or Diagnostic Quiz" className="w-full text-xs bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl px-3 py-2 text-[#2D2A26] focus:outline-none focus:border-[#D97706]" />
        </div>
      </div>
      <GoogleSharingModeToggle sharingMode={sharingMode} onSharingModeChange={handleSharingChange} isGoogleUrl={/docs\.google\.com/i.test(url)} />
      <div className="space-y-1">
        <label className="text-xs font-bold text-[#2D2A26] flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-[#D97706]" /><span>What / Why? (Let the student know why they should open this link)</span></label>
        <textarea value={cfuPrompt} onChange={(e) => setCfuPrompt(e.target.value)} placeholder="e.g. Open this resource to test your understanding before attempting the main challenge." className="w-full h-14 text-xs bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl p-2 text-[#2D2A26] focus:outline-none resize-none leading-relaxed" />
      </div>
      <LinkQrDesignerSection url={url} title={name} config={qrConfig} onChange={(up) => setQrConfig((prev) => ({ ...prev, ...up }))} />
      <button type="submit" className="w-full py-2.5 bg-[#F59E0B] hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98">
        <Plus className="w-4 h-4" /><span>Attach Resource & Link</span>
      </button>
    </form>
  );
};
