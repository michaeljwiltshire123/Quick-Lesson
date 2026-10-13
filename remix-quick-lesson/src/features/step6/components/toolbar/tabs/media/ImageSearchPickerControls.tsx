import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { Search, Image as ImageIcon, Film, Smile } from 'lucide-react';

interface ImageSearchPickerControlsProps {
  onInsertElement: (newElement: SlideElement) => void;
}

const CURATED_MEDIA = {
  photos: [
    { label: 'DNA Helix', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format' },
    { label: 'Microscope', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format' },
    { label: 'Ancient Greece', url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=500&auto=format' },
    { label: 'Solar System', url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500&auto=format' },
    { label: 'World Map', url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&auto=format' },
    { label: 'Geometry Math', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format' },
  ],
  gifs: [
    { label: 'Clock Timer', url: 'https://media.giphy.com/media/l2JebisijdzVL2Cqs/giphy.gif' },
    { label: 'Thumbs Up', url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif' },
    { label: 'Lightbulb Idea', url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif' },
    { label: 'Rocket Launch', url: 'https://media.giphy.com/media/26tn3334mvoVClhos/giphy.gif' },
  ],
  stickers: [
    { label: 'Checkmark', url: 'https://api.iconify.design/fluent-emoji:check-mark-button.svg' },
    { label: 'Gold Star', url: 'https://api.iconify.design/fluent-emoji:glowing-star.svg' },
    { label: 'Brain Idea', url: 'https://api.iconify.design/fluent-emoji:brain.svg' },
    { label: 'Graduation', url: 'https://api.iconify.design/fluent-emoji:graduation-cap.svg' },
    { label: 'Stopwatch', url: 'https://api.iconify.design/fluent-emoji:stopwatch.svg' },
    { label: 'Warning', url: 'https://api.iconify.design/fluent-emoji:warning.svg' },
  ],
};

export const ImageSearchPickerControls: React.FC<ImageSearchPickerControlsProps> = ({ onInsertElement }) => {
  const [tab, setTab] = useState<'photos' | 'gifs' | 'stickers'>('photos');
  const [query, setQuery] = useState('');

  const items = CURATED_MEDIA[tab].filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url: string, label: string) => {
    onInsertElement({
      id: `el-media-${Date.now()}`,
      type: 'image',
      x: 35, y: 30, width: tab === 'stickers' ? 22 : 45, height: tab === 'stickers' ? 22 : 38,
      content: url,
      caption: label,
      meta: { shadowStyle: tab === 'stickers' ? 'none' : 'soft', opacity: 100 },
    });
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="grid grid-cols-3 gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
        <button type="button" onClick={() => setTab('photos')} className={`py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer ${tab === 'photos' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600'}`}><ImageIcon className="w-3 h-3" />Photos</button>
        <button type="button" onClick={() => setTab('gifs')} className={`py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer ${tab === 'gifs' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600'}`}><Film className="w-3 h-3" />GIFs</button>
        <button type="button" onClick={() => setTab('stickers')} className={`py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer ${tab === 'stickers' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600'}`}><Smile className="w-3 h-3" />Stickers</button>
      </div>

      <div className="relative">
        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2 top-2" />
        <input
          type="text" value={query} placeholder={`Search ${tab}...`}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-[11px] pl-7 pr-2 py-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-0.5">
        {items.map((item) => (
          <button
            key={item.url} type="button" onClick={() => handleSelect(item.url, item.label)}
            className="group relative aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-200 hover:border-amber-500 hover:shadow-xs transition-all cursor-pointer p-1 flex items-center justify-center"
            title={`Insert ${item.label}`}
          >
            <img src={item.url} alt={item.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            <span className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-white text-[8px] font-bold px-0.5 py-0.5 truncate text-center opacity-0 group-hover:opacity-100 transition-opacity">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
