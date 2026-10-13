import React, { useState } from 'react';
import { Plus, ArrowUp } from 'lucide-react';
import { SummativeQuizQuestion, DurationPreset } from './typesSummativeQuiz';
import { QuizHeaderBar } from './QuizHeaderBar';
import { QuizTimePresetPills } from './QuizTimePresetPills';
import { QuizExportToolbar } from './QuizExportToolbar';
import { QuizQuestionEditorCard } from './QuizQuestionEditorCard';
import { VoiceReaderControls, useTextToSpeech } from '../plain_quiz/audio';
import { PlainQuizPreviewModal } from '../plain_quiz/preview';
import { QuestionQualityInspectorModal } from '../plain_quiz/inspector';
import { PlainQuizInsightsCard } from './plain_quiz/PlainQuizInsightsCard';
import { QuizQuestionStyle } from './services/quizPromptBuilder';

interface Props {
  quizTitle: string;
  onChangeTitle: (t: string) => void;
  questions: SummativeQuizQuestion[];
  onChangeQuestion: (index: number, upd: SummativeQuizQuestion) => void;
  onDeleteQuestion: (index: number) => void;
  onAddQuestion: () => void;
  durationPreset: DurationPreset;
  questionCount: number;
  timeLimitMinutes: number;
  questionStyle?: QuizQuestionStyle;
  gradeLevel?: string;
  onChangePreset: (p: DurationPreset, q: number, m: number) => void;
  onChangeStyle?: (style: QuizQuestionStyle) => void;
  isAttached: boolean;
  onAttach: () => void;
  onGenerateAi: () => void;
  isGenerating: boolean;
}

export const PlainQuizView: React.FC<Props> = ({
  quizTitle, onChangeTitle, questions, onChangeQuestion, onDeleteQuestion, onAddQuestion,
  durationPreset, questionCount, timeLimitMinutes, questionStyle, gradeLevel, onChangePreset, onChangeStyle, isAttached, onAttach, onGenerateAi, isGenerating,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const tts = useTextToSpeech();

  return (
    <div className="space-y-4">
      <QuizHeaderBar quizTitle={quizTitle} onChangeTitle={onChangeTitle} onGenerateAi={onGenerateAi} isGenerating={isGenerating} />
      <QuizTimePresetPills durationPreset={durationPreset} questionCount={questionCount} timeLimitMinutes={timeLimitMinutes} questionStyle={questionStyle} onChangePreset={onChangePreset} onChangeStyle={onChangeStyle} />
      <VoiceReaderControls config={tts.config} onChangeConfig={tts.setConfig} voices={tts.voices} isSpeaking={tts.isSpeaking} onTestSpeak={() => tts.speak(`Welcome to ${quizTitle}. Let's begin Question 1.`)} onStopSpeak={tts.stop} />
      <QuizExportToolbar quizTitle={quizTitle} questions={questions} isAttached={isAttached} onAttach={onAttach} onOpenPreview={() => setIsPreviewOpen(true)} onOpenInspector={() => setIsInspectorOpen(true)} onToggleAnalytics={() => setShowAnalytics(!showAnalytics)} showAnalytics={showAnalytics} />

      <PlainQuizInsightsCard insights={showAnalytics} setInsights={setShowAnalytics} quizTitle={quizTitle} questions={questions} />

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <QuizQuestionEditorCard key={q.id || idx} question={q} index={idx} totalQuestions={questions.length} onChange={(upd) => onChangeQuestion(idx, upd)} onDelete={() => onDeleteQuestion(idx)} />
        ))}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button type="button" onClick={onAddQuestion} className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] border-2 border-dashed border-[#2D2A26]/20 rounded-2xl text-xs font-bold shadow-xs cursor-pointer transition-all">
            <Plus className="w-4 h-4 text-[#F59E0B]" /><span>+ Add Question at Bottom of List</span>
          </button>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/15 rounded-2xl text-xs font-bold shadow-xs cursor-pointer transition-all whitespace-nowrap">
            <ArrowUp className="w-4 h-4 text-[#D97706]" /><span>Back to top ↑</span>
          </button>
        </div>
      </div>

      <PlainQuizPreviewModal isOpen={isPreviewOpen} questions={questions} quizTitle={quizTitle} onClose={() => setIsPreviewOpen(false)} />
      <QuestionQualityInspectorModal isOpen={isInspectorOpen} questions={questions} quizTitle={quizTitle} gradeLevel={gradeLevel} onClose={() => setIsInspectorOpen(false)} />
    </div>
  );
};
