import React from 'react';
import { Sparkles, CheckCircle2, AlertOctagon, HelpCircle, BookOpen } from 'lucide-react';

interface Props {
  lessonTitle: string;
}

export const TeacherOfstedAuditTab: React.FC<Props> = ({ lessonTitle }) => {
  return (
    <div className="space-y-4">
      {/* Intent, Implementation & Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-[#2D2A26]/15 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Curriculum Alignment (Intent)</span>
          <span className="text-sm font-black text-[#2D2A26] block">100% Core Specification</span>
          <p className="text-[10px] text-gray-500">Every prompt mapped directly to unit milestones</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#2D2A26]/15 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Delivery Fidelity (Implementation)</span>
          <span className="text-sm font-black text-indigo-600 block">Formative Loop Active</span>
          <p className="text-[10px] text-gray-500">Immediate diagnostic feedback to all 27 pupils</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#2D2A26]/15 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Demonstrated Mastery (Impact)</span>
          <span className="text-sm font-black text-emerald-600 block">71.4% Secure Threshold</span>
          <p className="text-[10px] text-gray-500">24 of 27 pupils met or exceeded baseline expectations</p>
        </div>
      </div>

      {/* Delivery Deficit vs Pupil Gap Audit */}
      <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-3">
        <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center justify-between">
          <span>Lesson Delivery vs Individual Pupil Gap Diagnostic</span>
          <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full text-[10px] font-bold">Ofsted EIF Standard</span>
        </h4>

        <div className="space-y-2.5">
          <div className="p-3 bg-white rounded-xl border border-rose-200 flex items-start gap-2.5 text-xs">
            <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-rose-950 block">Milestone 2 Delivery Flag (52% Error Rate)</span>
              <p className="text-[11px] text-rose-900 leading-snug">
                Because over 50% of the entire class stumbled on <span className="font-bold">Active Transport vs Osmosis</span>, this represents a <span className="font-bold underline">teaching delivery gap</span> rather than pupil inattention. The teacher modeling ("I Do") must be revised before moving to the next topic.
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-start gap-2.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-950 block">Milestones 1 &amp; 3 Secure (88% Accuracy)</span>
              <p className="text-[11px] text-emerald-900 leading-snug">
                Core cellular terminology and energy capture concepts have been securely internalised across all pupil tiers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptive Next-Lesson Starter Script */}
      <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-1.5 text-xs text-indigo-950">
        <span className="font-black uppercase tracking-wide flex items-center gap-1.5 text-indigo-900">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Automated Reteach Starter Script (Next Lesson)
        </span>
        <p className="text-[11px] italic bg-white p-2.5 rounded-xl border border-indigo-100 text-indigo-900 leading-relaxed font-normal">
          &ldquo;Class, on yesterday's check, 88% of you mastered cell anatomy, but half of us hesitated on ATP energy expenditure during transport. Turn to your partner: what is the single deciding factor between a substance that slides down a gradient versus one requiring a protein pump? 60 seconds on the clock.&rdquo;
        </p>
      </div>
    </div>
  );
};
