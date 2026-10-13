import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { Laugh, Sparkles, X, Plus } from 'lucide-react';

interface ClassroomMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertMeme: (element: SlideElement) => void;
}

const MEME_TEMPLATES = [
  { id: 'galaxy_brain', name: '🧠 Expanding Mind', top: 'Guessing answer', bottom: 'Applying 1st principles' },
  { id: 'drake', name: '🙅‍♂️ Drake Approval', top: 'Cramming night before', bottom: 'Spaced retrieval practice' },
  { id: 'success_kid', name: '🎉 Success Kid', top: 'Balanced chemical equation', bottom: 'First try without error' },
  { id: 'two_buttons', name: '🔴 Two Buttons', top: 'Overthinking question', bottom: 'Checking the rubric' },
];

export const ClassroomMemeModal: React.FC<ClassroomMemeModalProps> = ({ isOpen, onClose, onInsertMeme }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0]);
  const [topText, setTopText] = useState(MEME_TEMPLATES[0].top);
  const [bottomText, setBottomText] = useState(MEME_TEMPLATES[0].bottom);

  if (!isOpen) return null;

  const handleCreateMeme = () => {
    onInsertMeme({
      id: `el-meme-${Date.now()}`,
      type: 'shape',
      shapeType: 'rounded',
      x: 30,
      y: 25,
      width: 40,
      height: 35,
      content: `${selectedTemplate.name}\n\n❌ ${topText}\n\n✨ ${bottomText}`,
      fillColor: '#FEF3C7',
      borderColor: '#D97706',
      borderWidth: 3,
      textStyle: { bold: true, align: 'center', fontSize: 16, color: '#78350F' },
      meta: { isMeme: true, templateId: selectedTemplate.id },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 max-w-md w-full space-y-4 animate-in zoom-in-95 text-stone-800">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
            <Laugh className="w-4 h-4 text-amber-600" />
            <span>Classroom Educational Meme Generator</span>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {MEME_TEMPLATES.map((t) => (
            <button
              key={t.id} type="button"
              onClick={() => { setSelectedTemplate(t); setTopText(t.top); setBottomText(t.bottom); }}
              className={`p-2 text-left rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                selectedTemplate.id === t.id ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <input
            type="text" value={topText} onChange={(e) => setTopText(e.target.value)}
            placeholder="Top text / Misconception"
            className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600"
          />
          <input
            type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)}
            placeholder="Bottom text / Accurate Rule"
            className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600"
          />
        </div>

        <button
          type="button" onClick={handleCreateMeme}
          className="w-full py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" /><span>Insert Safe Meme to Slide</span>
        </button>
      </div>
    </div>
  );
};
