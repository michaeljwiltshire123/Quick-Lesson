import React, { useState } from 'react';
import { usePlainQuizState } from './usePlainQuizState';
import { LiveQuizPresentContainer } from './LiveQuizPresentContainer';
import { QuizSummaryReportModal } from './QuizSummaryReportModal';
import { QuizSubTabBar, QuizSubTabKey, TAB_TITLES } from './QuizSubTabBar';
import { QuizComingSoonView } from './QuizComingSoonView';
import { PlainQuizView } from './PlainQuizView';
import { LadderQuizBuilderContainer } from './ladder';
import { ImposterHubContainer } from '../imposter/ImposterHubContainer';
import { GridlockInlineSetupView, GridlockErrorBoundary } from '../gridlock/setup';
import { DontSayItInlineSetupView } from '../dont_say_it/setup';
import { CompetitiveQuizSetupView } from '../competitive_quiz/setup';
import { LessonChunk, ModuleScheme } from '../../../../types';

interface Props {
  lessonTitle: string;
  chunks: LessonChunk[];
  gradeLevel?: string;
  moduleScheme?: ModuleScheme;
  onNotice?: (msg: string) => void;
}

export const SummativeQuizBuilderContainer: React.FC<Props> = ({
  lessonTitle, chunks, gradeLevel, moduleScheme, onNotice,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<QuizSubTabKey>('plain');
  const s = usePlainQuizState(lessonTitle, chunks, gradeLevel, moduleScheme, onNotice);

  if (s.viewMode === 'live') {
    return (
      <LiveQuizPresentContainer
        quizTitle={s.quizTitle}
        questions={s.questions}
        currentCohortTag={s.cohortTag}
        onChangeCohortTag={s.setCohortTag}
        onBackToEdit={() => s.setViewMode('edit')}
        onOpenSummary={(rep) => { s.setSummaryReport(rep); s.setViewMode('summary'); }}
        onNotice={onNotice}
      />
    );
  }

  return (
    <div className="space-y-4">
      <QuizSubTabBar activeSubTab={activeSubTab} onSelectSubTab={setActiveSubTab} />

      {activeSubTab === 'competitive' ? (
        <CompetitiveQuizSetupView lessonTitle={lessonTitle} chunks={chunks} moduleScheme={moduleScheme} onNotice={onNotice} />
      ) : activeSubTab === 'ladder' ? (
        <LadderQuizBuilderContainer lessonTitle={lessonTitle} chunks={chunks} gradeLevel={gradeLevel} onNotice={onNotice} />
      ) : activeSubTab === 'imposter' ? (
        <ImposterHubContainer lessonTitle={lessonTitle} chunks={chunks} onNotice={onNotice} />
      ) : activeSubTab === 'blockbusters' ? (
        <GridlockErrorBoundary>
          <GridlockInlineSetupView lessonTitle={lessonTitle} chunks={chunks} moduleScheme={moduleScheme} onNotice={onNotice} />
        </GridlockErrorBoundary>
      ) : activeSubTab === 'dont_say_it' ? (
        <DontSayItInlineSetupView lessonTitle={lessonTitle} chunks={chunks} moduleScheme={moduleScheme} onNotice={onNotice} />
      ) : activeSubTab !== 'plain' ? (
        <QuizComingSoonView title={TAB_TITLES[activeSubTab]} />
      ) : (
        <PlainQuizView
          quizTitle={s.quizTitle}
          onChangeTitle={s.setQuizTitle}
          questions={s.questions}
          onChangeQuestion={(idx, upd) => { const n = [...s.questions]; n[idx] = upd; s.setQuestions(n); }}
          onDeleteQuestion={(idx) => s.setQuestions(s.questions.filter((_, i) => i !== idx).map((x, i) => ({ ...x, questionNumber: i + 1 })))}
          onAddQuestion={s.handleAddQuestion}
          durationPreset={s.durationPreset}
          questionCount={s.questionCount}
          timeLimitMinutes={s.timeLimitMinutes}
          questionStyle={s.questionStyle}
          gradeLevel={s.gradeLevel}
          onChangePreset={s.handlePresetChange}
          onChangeStyle={s.setQuestionStyle}
          isAttached={s.isAttached}
          onAttach={() => {
            sessionStorage.setItem('attached_summative_quiz', JSON.stringify({ quizTitle: s.quizTitle, questions: s.questions, cohortTag: s.cohortTag }));
            s.setIsAttached(true);
            onNotice?.(`Attached Summative Quiz (${s.questions.length} Qs).`);
          }}
          onGenerateAi={s.handleGenerateAi}
          isGenerating={s.isGenerating}
        />
      )}

      <QuizSummaryReportModal
        isOpen={s.viewMode === 'summary' || Boolean(s.summaryReport)}
        onClose={() => { s.setSummaryReport(null); s.setViewMode('edit'); }}
        report={s.summaryReport || { quizTitle: s.quizTitle, className: s.cohortTag, averageScore: 84, submissionsCount: 22, misconceptionHotspots: [], supportAlerts: [], rigorChecks: 'Good rigor' }}
        onNotice={onNotice}
      />
    </div>
  );
};
