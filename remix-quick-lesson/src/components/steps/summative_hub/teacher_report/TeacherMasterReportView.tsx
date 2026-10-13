import React, { useState } from 'react';
import { TeacherReportTab, PupilAuditRecord, ClassPsychometrics } from './teacherReportTypes';
import { TeacherReportHeader } from './TeacherReportHeader';
import { TeacherClassPsychometricsTab } from './TeacherClassPsychometricsTab';
import { TeacherPupilForensicTab } from './TeacherPupilForensicTab';
import { TeacherSendAccessAuditTab } from './TeacherSendAccessAuditTab';
import { TeacherOfstedAuditTab } from './TeacherOfstedAuditTab';
import { SAMPLE_PSYCHOMETRICS, SAMPLE_PUPILS } from './teacherReportSampleData';

interface Props {
  quizTitle: string;
  modeLabel: string;
  bespokeTabLabel: string;
  bespokeNode: React.ReactNode;
  pupils?: PupilAuditRecord[];
  psychometrics?: ClassPsychometrics;
  onPrint?: () => void;
  onExportCsv?: () => void;
}

export const TeacherMasterReportView: React.FC<Props> = ({
  quizTitle, modeLabel, bespokeTabLabel, bespokeNode,
  pupils = SAMPLE_PUPILS, psychometrics = SAMPLE_PSYCHOMETRICS,
  onPrint, onExportCsv,
}) => {
  const [activeTab, setActiveTab] = useState<TeacherReportTab>('overview');

  return (
    <div className="space-y-4">
      <TeacherReportHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        quizTitle={quizTitle}
        modeLabel={modeLabel}
        bespokeTabLabel={bespokeTabLabel}
        onPrint={onPrint}
        onExportCsv={onExportCsv}
      />

      {activeTab === 'overview' && <TeacherClassPsychometricsTab data={psychometrics} />}
      {activeTab === 'pupils' && <TeacherPupilForensicTab pupils={pupils} />}
      {activeTab === 'send' && <TeacherSendAccessAuditTab pupils={pupils} />}
      {activeTab === 'ofsted' && <TeacherOfstedAuditTab lessonTitle={quizTitle} />}
      {activeTab === 'bespoke' && <div className="space-y-3">{bespokeNode}</div>}
    </div>
  );
};
