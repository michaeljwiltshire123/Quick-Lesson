import { PupilAuditRecord, ClassPsychometrics } from './teacherReportTypes';

export const SAMPLE_PSYCHOMETRICS: ClassPsychometrics = {
  meanScore: 71.4,
  medianScore: 75.0,
  highestScore: 94.0,
  lowestScore: 42.0,
  completionRate: 100,
  averageTimeSeconds: 18.2,
  bellCurve: [
    { range: '< 50% (Emerging)', count: 3, percentage: 11 },
    { range: '50-69% (Developing)', count: 7, percentage: 26 },
    { range: '70-84% (Secure)', count: 12, percentage: 44 },
    { range: '85-100% (Mastery)', count: 5, percentage: 19 },
  ],
  mostMissedTopic: 'Active Transport vs Osmosis',
  mostMissedRate: 52,
};

export const SAMPLE_PUPILS: PupilAuditRecord[] = [
  {
    id: 'p1', name: 'Oliver 🦉', scorePercentage: 92, timeSeconds: 12.4, unTimedAccuracy: 95,
    misconceptions: ['Minor terminology swap on carrier proteins'],
    interventionTag: 'Secure Mastery',
    courseworkDefenseNote: 'Consistently demonstrates deep conceptual understanding. Low coursework grade reflects submission deficit, not knowledge gap.',
  },
  {
    id: 'p2', name: 'Amelia 🦊', scorePercentage: 68, timeSeconds: 27.8, unTimedAccuracy: 91,
    misconceptions: ['Confused active transport energy source', 'Hesitated on membrane permeability'],
    interventionTag: 'Fluency Consolidation',
    courseworkDefenseNote: 'Demonstrates 91% accuracy when unpressured. Slow processing speed masked underlying mastery.',
    sendFlag: 'Processing Delay / Dyslexia profile', extraTimeJustified: true,
  },
  {
    id: 'p3', name: 'Harry 🦁', scorePercentage: 46, timeSeconds: 9.1, unTimedAccuracy: 48,
    misconceptions: ['Believes respiration is breathing', 'Conflated glucose with ATP', 'Rushed choices in <5s'],
    interventionTag: 'Immediate Reteach',
    courseworkDefenseNote: 'Rapid guessing pattern. Fails both timed and untimed checks. Authentic foundational concept gap requires Table 1 reteach.',
  },
  {
    id: 'p4', name: 'Isla 🐼', scorePercentage: 78, timeSeconds: 16.5, unTimedAccuracy: 82,
    misconceptions: ['Formula notation omission'],
    interventionTag: 'Secure Mastery',
    courseworkDefenseNote: 'Robust subject retention across all lesson milestones. Ready for extension analysis.',
  },
  {
    id: 'p5', name: 'George 🐻', scorePercentage: 58, timeSeconds: 29.4, unTimedAccuracy: 88,
    misconceptions: ['Carrier protein vs channel protein distinction'],
    interventionTag: 'Fluency Consolidation',
    courseworkDefenseNote: 'Significant 30% gap between timed and untimed accuracy. Clear candidate for 25% access arrangement evidence.',
    sendFlag: 'Slow Processing Speed (Below 85 Standard Score)', extraTimeJustified: true,
  },
  {
    id: 'p6', name: 'Ava 🐨', scorePercentage: 86, timeSeconds: 14.2, unTimedAccuracy: 90,
    misconceptions: ['Concentration gradient direction wording'],
    interventionTag: 'Secure Mastery',
    courseworkDefenseNote: 'High automaticity and accurate written retrieval. Excellent coursework correlation.',
  },
];
