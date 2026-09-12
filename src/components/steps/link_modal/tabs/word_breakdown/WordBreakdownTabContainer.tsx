import React, { useState, useEffect } from 'react';
import { LessonChunk, ChunkAttachment } from '../../../../../types';
import { WordBreakdownItem, WordStudioStep } from './types';
import { extractConceptDifficultWords, createBreakdownItem, loadSessionBreakdown, saveSessionBreakdown, fetchConceptBreakdown } from './morphologyHelper';
import { WordBreakdownIngestion } from './WordBreakdownIngestion';
import { WordPuzzleStudio } from './WordPuzzleStudio';

interface Props {
  activeChunk?: LessonChunk;
  slideTitle?: string;
  subject?: string;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
  onUpdateChunk?: (updated: LessonChunk) => void;
}

export const WordBreakdownTabContainer: React.FC<Props> = ({
  activeChunk, slideTitle, subject, onAddAttachment, onUpdateChunk
}) => {
  const [step, setStep] = useState<WordStudioStep>('ingestion');
  const [attached, setAttached] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [whiteboardAttached, setWhiteboardAttached] = useState(() => {
    try {
      const val = sessionStorage.getItem('whiteboard_puzzle_deck_sync');
      return val ? JSON.parse(val).active : false;
    } catch { return false; }
  });

  const [items, setItems] = useState<WordBreakdownItem[]>(() => {
    const saved = loadSessionBreakdown(activeChunk?.id);
    if (saved && saved.length > 0) return saved;
    return extractConceptDifficultWords(activeChunk, slideTitle).map(t => createBreakdownItem(t));
  });

  useEffect(() => { saveSessionBreakdown(items, activeChunk?.id); }, [items, activeChunk?.id]);

  const handleCreatePuzzles = async () => {
    setGenerating(true);
    try {
      const selectedWords = items.filter(it => it.selected !== false).map(it => it.term);
      if (selectedWords.length > 0) {
        const results = await fetchConceptBreakdown(activeChunk?.title || slideTitle, activeChunk?.teacherScript, activeChunk?.classroomNotes, subject, selectedWords);
        if (results.length > 0) {
          setItems(results);
        }
      }
    } catch { /* graceful fallback retains local algorithmic clues */ }
    finally {
      setGenerating(false);
      setStep('studio');
    }
  };

  const handleAttach = () => {
    const activeTerms = items.filter(it => it.selected !== false).map(it => it.term);
    onAddAttachment?.({
      id: `att-wb-${Date.now()}`,
      name: `${activeChunk?.title || slideTitle || 'Lesson'} - Word Puzzles (${activeTerms.length} terms)`,
      type: 'quiz', platform: 'other', udlPathway: 'visual'
    });
    setAttached(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2 text-xs font-semibold text-[#2D2A26]/70">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setStep('ingestion')} className={`cursor-pointer transition-colors ${step === 'ingestion' ? 'text-[#D97706] font-bold' : 'hover:text-[#2D2A26]'}`}>1. Ingestion &amp; Morphology</button>
          <span>&rarr;</span>
          <button type="button" onClick={() => setStep('studio')} className={`cursor-pointer transition-colors ${step === 'studio' ? 'text-[#D97706] font-bold' : 'hover:text-[#2D2A26]'}`}>2. Visual Puzzle Studio</button>
        </div>
        <span className="text-[11px] text-[#2D2A26]/50">{items.length} Concept Words</span>
      </div>

      {step === 'ingestion' ? (
        <WordBreakdownIngestion items={items} onUpdateItems={setItems} onProceed={handleCreatePuzzles} activeChunkTitle={activeChunk?.title || slideTitle} generating={generating} />
      ) : (
        <WordPuzzleStudio
          items={items}
          onUpdateClueType={(id, type) => setItems(prev => prev.map(it => it.id === id ? { ...it, puzzleType: type } : it))}
          onUpdateImage={(id, url) => setItems(prev => prev.map(it => it.id === id ? { ...it, imageUrl: url } : it))}
          onBackToIngestion={() => setStep('ingestion')}
          onAttachPuzzleResources={onAddAttachment ? handleAttach : undefined}
          attached={attached}
          slideTitle={activeChunk?.title || slideTitle}
          whiteboardAttached={whiteboardAttached}
          onToggleWhiteboard={(next) => { setWhiteboardAttached(next); if (activeChunk && onUpdateChunk) onUpdateChunk({ ...activeChunk }); }}
        />
      )}
    </div>
  );
};
