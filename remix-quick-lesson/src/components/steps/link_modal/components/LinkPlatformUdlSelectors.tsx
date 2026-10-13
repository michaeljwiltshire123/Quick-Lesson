import React from 'react';

export type PlatformType = 'canva' | 'google_slides' | 'youtube' | 'google_forms' | 'kahoot' | 'h5p' | 'other';

interface LinkPlatformUdlSelectorsProps {
  platform: PlatformType;
  onPlatformChange: (p: PlatformType) => void;
  udlPathway: 'visual' | 'auditory' | 'tactile' | 'all';
  onUdlPathwayChange: (u: 'visual' | 'auditory' | 'tactile' | 'all') => void;
}

export const LinkPlatformUdlSelectors: React.FC<LinkPlatformUdlSelectorsProps> = ({
  platform, onPlatformChange, udlPathway, onUdlPathwayChange,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div className="space-y-1">
      <label className="text-xs font-bold text-[#2D2A26]">Platform Format</label>
      <select value={platform} onChange={(e) => onPlatformChange(e.target.value as PlatformType)} className="w-full text-xs bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl px-3 py-2 text-[#2D2A26] focus:outline-none">
        <option value="canva">🎨 Canva Presentation</option>
        <option value="google_slides">📊 Google Slides</option>
        <option value="youtube">📺 YouTube Video</option>
        <option value="google_forms">📝 Google Forms Quiz</option>
        <option value="kahoot">🏆 Kahoot Challenge</option>
        <option value="h5p">🧩 H5P Interactive</option>
        <option value="other">🌐 General Web Link / Portal</option>
      </select>
    </div>
    <div className="space-y-1">
      <label className="text-xs font-bold text-[#2D2A26]">UDL "Plus One" Scaffolding Flag</label>
      <select value={udlPathway} onChange={(e) => onUdlPathwayChange(e.target.value as any)} className="w-full text-xs bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl px-3 py-2 text-[#2D2A26] focus:outline-none">
        <option value="visual">🎨 Visual Representation (Diagrams & Flow)</option>
        <option value="auditory">🎧 Auditory Pathway (Podcasts & Narration)</option>
        <option value="tactile">🛠️ Tactile / Kinesthetic (Simulations & Making)</option>
        <option value="all">🌟 Universal Core Pathway</option>
      </select>
    </div>
  </div>
);
