import React, { useState } from 'react';
import { X, Sparkles, HelpCircle, Trophy, Zap, BookOpen } from 'lucide-react';

interface MysteryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (secretText: string) => void;
}

const PRESETS = [
  { icon: HelpCircle, label: 'Diagnostic Question', text: '❓ What is the main function of the heart in the circulatory system?' },
  { icon: Zap, label: 'Stretch & Challenge', text: '💡 Stretch Challenge: Explain why warm air rises over cold air.' },
  { icon: Trophy, label: 'Classroom Reward', text: '🎉 10 House Points awarded to the quietest table team!' },
  { icon: BookOpen, label: 'Secret Vocabulary', text: '🔤 Secret Word of the Day: Photosynthesis' },
];

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [secretText, setSecretText] = useState('❓ What is the main key term from today\'s lesson?');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretText.trim()) return;
    onConfirm(secretText.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-purple-200 rounded-2xl shadow-2xl max-w-md w-full p-4 space-y-3.5 text-stone-800">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <h3 className="font-extrabold text-sm text-purple-950">Set Up Mystery Box Secret</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-snug">
          Type the secret message or challenge below. It will stay hidden on your slide until you click to unbox it during the live lesson!
        </p>

        {/* Quick Presets */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {PRESETS.map((p, i) => (
            <button key={i} type="button" onClick={() => setSecretText(p.text)} className="p-2 bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200 rounded-xl text-left text-[10px] font-semibold text-purple-950 flex items-center gap-1.5 cursor-pointer transition-colors">
              <p.icon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate">{p.label}</span>
            </button>
          ))}
        </div>

        {/* Custom Text Area */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">Secret Content Inside Box:</label>
            <textarea value={secretText} onChange={(e) => setSecretText(e.target.value)} rows={3} className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all resize-none" placeholder="Type secret question, reward, or challenge..." required />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-colors">
              <Sparkles className="w-3.5 h-3.5" /> Attach Mystery Box to Slide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
