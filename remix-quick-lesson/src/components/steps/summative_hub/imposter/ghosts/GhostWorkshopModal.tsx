import React, { useState } from 'react';
import { Ghost, Send, Sparkles, X, Award } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  upcomingTopics: string[];
  onSubmitDecoy: (topic: string, questionText: string) => void;
}

export const GhostWorkshopModal: React.FC<Props> = ({
  isOpen,
  onClose,
  playerName,
  upcomingTopics = ['Cellular Respiration', 'Energy Transformation', 'Enzyme Mechanics'],
  onSubmitDecoy,
}) => {
  if (!isOpen) return null;
  const [selectedTopic, setSelectedTopic] = useState(upcomingTopics[0] || 'Core Topic');
  const [questionText, setQuestionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    onSubmitDecoy(selectedTopic, questionText.trim());
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-indigo-400 rounded-3xl max-w-lg w-full p-5 text-white space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Ghost className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-sm text-white">Ghost Helper Workshop</h3>
              <p className="text-[11px] text-indigo-200">Author decoy traps to assist the honest team</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-5 bg-indigo-950/60 border border-indigo-500/40 rounded-2xl text-center space-y-2">
            <Award className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="font-black text-sm text-indigo-200">Decoy Transmitted!</h4>
            <p className="text-xs text-white/80">
              If an imposter uses your question, you earn extra Ghost Writer points!
            </p>
            <button
              type="button"
              onClick={() => { setIsSubmitted(false); setQuestionText(''); }}
              className="mt-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold cursor-pointer"
            >
              Write Another Decoy
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-indigo-300 mb-1">
                Select Upcoming Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
              >
                {upcomingTopics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-indigo-300">
                  Craft 120-Character Decoy Question
                </label>
                <span className="text-[10px] font-mono text-white/50">{questionText.length}/120</span>
              </div>
              <textarea
                rows={3}
                maxLength={120}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. Identify the gas required for complete breakdown of glucose..."
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs text-white/60 hover:text-white cursor-pointer">
                Close
              </button>
              <button
                type="submit"
                disabled={!questionText.trim()}
                className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Submit Decoy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
