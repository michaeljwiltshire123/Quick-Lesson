import React, { useState, useEffect } from 'react';
import { HelpCircle, X, Loader2, Check } from 'lucide-react';
import { ChunkAttachment } from '../../../types';

interface GatewayQuestion { question: string; answer: string; }
interface CheckQuestionModalProps {
  isOpen: boolean; chunkTitle: string; onClose: () => void;
  onAttachQuestions?: (attachments: ChunkAttachment[]) => void;
}

export const CheckQuestionModal: React.FC<CheckQuestionModalProps> = ({
  isOpen, chunkTitle, onClose, onAttachQuestions,
}) => {
  const [questions, setQuestions] = useState<GatewayQuestion[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true); setSelected(new Set());
    fetch('/api/generate-lesson-section', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'gateway_questions', prompt: chunkTitle, lessonTitle: chunkTitle }),
    })
      .then((res) => res.json())
      .then((d) => setQuestions(Array.isArray(d?.questions) && d.questions.length > 0 ? d.questions.slice(0, 4) : getFallback(chunkTitle)))
      .catch(() => setQuestions(getFallback(chunkTitle)))
      .finally(() => setLoading(false));
  }, [isOpen, chunkTitle]);

  if (!isOpen) return null;

  const toggle = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    setSelected(next);
  };

  const handleAttach = () => {
    const chosen = questions.filter((_, i) => selected.has(i));
    if (chosen.length === 0) return;
    const atts: ChunkAttachment[] = chosen.map((q, idx) => ({
      id: `chk-${Date.now()}-${idx}`, name: q.question, type: 'document', url: `Answer: ${q.answer || 'Check criteria'}`,
    }));
    if (onAttachQuestions) onAttachQuestions(atts);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-[#2D2A26]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base sm:text-lg">
            <HelpCircle className="w-5 h-5 text-[#D97706]" /><span className="text-[#2D2A26]">Gateway Check Questions</span>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 hover:bg-[#2D2A26]/10 rounded-lg cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-xs sm:text-sm text-[#2D2A26]/80">Select gateway check questions to attach to <strong className="text-[#2D2A26]">{chunkTitle}</strong>:</p>
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-sm font-semibold text-[#2D2A26]/60">
            <Loader2 className="w-6 h-6 animate-spin text-[#D97706]" /><span>Generating gateway questions...</span>
          </div>
        ) : (
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {questions.map((q, i) => (
              <div key={i} onClick={() => toggle(i)} className={`p-4 rounded-xl border cursor-pointer space-y-1.5 transition-all flex items-start gap-3 ${selected.has(i) ? 'bg-amber-50 border-[#D97706]' : 'bg-white border-[#2D2A26]/15'}`}>
                <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${selected.has(i) ? 'bg-[#D97706] border-[#D97706] text-white' : 'border-[#2D2A26]/30 bg-white'}`}>{selected.has(i) && <Check className="w-3.5 h-3.5" />}</div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-[#2D2A26] leading-snug">{q.question}</p>
                  {q.answer && <p className="text-xs text-[#2D2A26]/70 italic">Expected Answer: {q.answer}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#2D2A26]/10">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-[#2D2A26]/15 rounded-xl text-xs sm:text-sm font-bold cursor-pointer">Cancel</button>
          <button type="button" disabled={selected.size === 0} onClick={handleAttach} className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl cursor-pointer ${selected.size > 0 ? 'bg-[#D97706] text-white' : 'bg-[#2D2A26]/20 text-[#2D2A26]/40 cursor-not-allowed'}`}>
            Attach Selected ({selected.size})
          </button>
        </div>
      </div>
    </div>
  );
};

function getFallback(title: string): GatewayQuestion[] {
  return [
    { question: `What is the core principle behind ${title}?`, answer: 'Verify fundamental concept understanding.' },
    { question: `How does ${title} differ from related techniques?`, answer: 'Identify key distinguishing parameters.' },
    { question: `What step should you perform first when applying ${title}?`, answer: 'Sequence and order verification.' },
    { question: `What common pitfall occurs if ${title} is skipped?`, answer: 'Diagnostic error detection.' },
  ];
}
