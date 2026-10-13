import React, { useState, useMemo } from 'react';
import { Smartphone } from 'lucide-react';
import { createLessonGroundedQuestion } from './services/lessonQuestionHelper';
import { StudentViewContainer } from './student_view';

interface Props {
  lessonTitle: string;
  onNotice?: (msg: string) => void;
}

export const StudentPreviewModal: React.FC<Props> = ({ lessonTitle, onNotice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<'innocent' | 'imposter'>('innocent');

  const activeQuestion = useMemo(
    () => createLessonGroundedQuestion(lessonTitle),
    [lessonTitle]
  );

  return (
    <>
      <button
        id="btn-preview-student-mobile"
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-[#2D2A26]/20 text-[#2D2A26] flex items-center gap-1.5 shadow-2xs hover:bg-stone-50 cursor-pointer"
      >
        <Smartphone className="w-3.5 h-3.5 text-purple-600" />
        Preview Pupil Mobile View
      </button>

      {isOpen && (
        <div id="student-preview-modal-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2D2A26]/10 text-xs">
              <span className="font-bold text-[#2D2A26]">Pupil Phone Preview</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setRole(role === 'innocent' ? 'imposter' : 'innocent')}
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold cursor-pointer transition-all ${
                    role === 'innocent' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  Role: {role === 'innocent' ? 'Player' : 'Imposter'} (Tap to switch)
                </button>
              </div>
            </div>

            <StudentViewContainer
              lessonTitle={lessonTitle}
              studentName="Sophia"
              role={role}
              question={activeQuestion}
              onSubmitAnswer={(ans) => onNotice?.(`Sophia shared: "${ans}"`)}
              onExit={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
