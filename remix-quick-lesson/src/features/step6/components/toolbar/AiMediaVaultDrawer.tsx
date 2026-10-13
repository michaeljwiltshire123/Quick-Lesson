import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { CurriculumIconPicker } from './CurriculumIconPicker';
import { Sparkles, X, Image, Video, Plus, Shapes } from 'lucide-react';

export interface VaultMediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  url: string;
  caption: string;
  sourceChunk?: string;
}

interface AiMediaVaultDrawerProps {
  isOpen: boolean;
  vaultItems?: VaultMediaItem[];
  onClose: () => void;
  onInsertMedia: (newElement: SlideElement) => void;
}

const DEFAULT_VAULT_ITEMS: VaultMediaItem[] = [
  { id: 'v1', type: 'image', title: 'Conceptual Diagram Breakdown', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80', caption: 'High-clarity explanatory schematic' },
  { id: 'v2', type: 'video', title: 'Laboratory Demonstration Clip', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', caption: '2-minute inquiry video experiment' },
  { id: 'v3', type: 'image', title: 'Step-by-Step Flowchart', url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80', caption: 'Visual sequencing guide for pupils' },
];

export const AiMediaVaultDrawer: React.FC<AiMediaVaultDrawerProps> = ({
  isOpen, vaultItems = DEFAULT_VAULT_ITEMS, onClose, onInsertMedia,
}) => {
  const [tab, setTab] = useState<'media' | 'icons'>('media');
  if (!isOpen) return null;

  const handleInsert = (item: VaultMediaItem) => {
    onInsertMedia({
      id: `el-media-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: item.type, x: 20, y: 25, width: 60, height: 50,
      content: item.url, caption: item.caption,
      meta: item.type === 'video' ? { startTime: 0, endTime: 45 } : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <h2 className="text-sm font-bold text-stone-800">Media & Icon Vault</h2>
            </div>
            <button type="button" onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              type="button" onClick={() => setTab('media')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${tab === 'media' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'}`}
            >
              <Image className="w-3.5 h-3.5" /> Media Assets
            </button>
            <button
              type="button" onClick={() => setTab('icons')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${tab === 'icons' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'}`}
            >
              <Shapes className="w-3.5 h-3.5" /> Subject Icons
            </button>
          </div>

          {tab === 'media' ? (
            <div className="space-y-2.5 pt-1">
              {vaultItems.map((item) => (
                <div key={item.id} className="p-3 border border-stone-200 rounded-xl bg-stone-50 hover:bg-white hover:border-amber-400 transition-all flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-200 flex items-center justify-center shrink-0 text-stone-600">
                      {item.type === 'video' ? <Video className="w-4 h-4 text-amber-700" /> : <Image className="w-4 h-4 text-amber-700" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-800 line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] text-stone-500 line-clamp-1">{item.caption}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => handleInsert(item)} className="px-2 py-1 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs rounded-lg flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3 h-3" /> Insert
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <CurriculumIconPicker onInsertMedia={onInsertMedia} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};
