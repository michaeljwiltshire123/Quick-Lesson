import React, { useState, useEffect } from 'react';
import { GraduationCap, ExternalLink, CheckCircle, RefreshCw } from 'lucide-react';
import { listTeacherCourses, createClassroomCourseWork } from '../../services/google/googleClassroomService';
import { ClassroomCourse } from '../../types/workspace';
import { LessonChunk } from '../../types';

interface WorkspaceClassroomCardProps {
  lessonTitle: string;
  chunks: LessonChunk[];
  onRequestConfirm: (title: string, message: string, action: () => Promise<void>) => void;
}

export const WorkspaceClassroomCard: React.FC<WorkspaceClassroomCardProps> = ({
  lessonTitle, chunks, onRequestConfirm,
}) => {
  const [courses, setCourses] = useState<ClassroomCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [assignmentLink, setAssignmentLink] = useState<string | null>(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const list = await listTeacherCourses();
      setCourses(list);
      if (list.length > 0 && !selectedCourseId) setSelectedCourseId(list[0].id);
    } catch {} finally { setIsLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handlePost = () => {
    if (!selectedCourseId) return;
    const course = courses.find((c) => c.id === selectedCourseId);
    onRequestConfirm('Post to Google Classroom?', `Post coursework assignment to "${course?.name || 'Class'}"?`, async () => {
      setIsPosting(true);
      try {
        const res = await createClassroomCourseWork(selectedCourseId, lessonTitle, chunks, true);
        setAssignmentLink(res.alternateLink || 'https://classroom.google.com');
      } finally { setIsPosting(false); }
    });
  };

  return (
    <div className="p-4 rounded-xl border border-[#2D2A26]/10 bg-white/70 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]/80 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Google Classroom Integration</span>
          </h4>
          <p className="text-[11px] text-[#2D2A26]/60">Publish lesson assignments and coursework materials.</p>
        </div>
        <button type="button" onClick={fetchCourses} disabled={isLoading} className="p-1 text-[#2D2A26]/50 hover:text-[#2D2A26] cursor-pointer">
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-2">
        {courses.length > 0 ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#2D2A26]/20 rounded-lg text-[#2D2A26] focus:outline-none">
              {courses.map((c) => (<option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ''}</option>))}
            </select>
            {assignmentLink ? (
              <a href={assignmentLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-semibold hover:underline">
                <CheckCircle className="w-3.5 h-3.5" /><span>View in Classroom</span><ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <button type="button" onClick={handlePost} disabled={isPosting || !selectedCourseId} className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50">
                {isPosting ? 'Posting…' : 'Post Draft Assignment'}
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-[#2D2A26]/60 italic">No active courses detected. Connect your Google Classroom to dispatch coursework.</p>
        )}
      </div>
    </div>
  );
};
