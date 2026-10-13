import { SummativeTaskChoice } from './typesSummative';
import { ModuleScheme, LessonChunk } from '../../../types';

export function generateDefaultTasks(
  lessonTitle: string, chunks: LessonChunk[], moduleScheme?: ModuleScheme,
): SummativeTaskChoice[] {
  const criteria = moduleScheme?.assessedCriteria?.length
    ? Array.from(new Set(moduleScheme.assessedCriteria.map((c) => c.split(/[:\s-]/)[0].toUpperCase()))).slice(0, 3)
    : ['P1', 'M1', 'AO2'];
  const concepts = chunks.map((c) => c.title).filter(Boolean).slice(0, 3);
  const topic = lessonTitle || 'Applied Practical Skills';

  return [
    {
      id: 'task-written_report', format: 'written_report', formatLabel: 'Written Report',
      title: `${topic} Analytical Written Report`,
      description: `Draft a structured written report evaluating key findings in ${topic} using clear workplace evidence, analysis, and reasoned evaluation.`,
      criteriaCodes: criteria.slice(0, 2), coveredConcepts: concepts.slice(0, 2),
      handoutPrompt: `State your primary analysis regarding ${topic}, cite relevant case evidence or practical results, and provide structured reasoning linked to assessment standards.`,
    },
    {
      id: 'task-verbal_pitch', format: 'verbal_pitch', formatLabel: 'Verbal Pitch',
      title: `2-Minute Client Briefing: ${topic}`,
      description: `Deliver an oral synthesis justifying your strategic approach to ${topic} to a simulated client or vocational panel.`,
      criteriaCodes: [criteria[0] || 'P1'], coveredConcepts: concepts.slice(0, 1),
      handoutPrompt: `Structure your 120-second pitch: Hook & Context (30s), Core Demonstration (60s), Value & Safety Conclusion (30s).`,
    },
    {
      id: 'task-visual_sketchnote', format: 'visual_sketchnote', formatLabel: 'Visual Sketchnote',
      title: `${topic} Architectural Process Map`,
      description: `Produce an annotated dual-coded sketchnote diagram mapping workflows, causality, and critical failure nodes in ${topic}.`,
      criteriaCodes: criteria.slice(0, 2), coveredConcepts: concepts.slice(0, 2),
      handoutPrompt: `Illustrate the 3 core phases of ${topic}, annotating inputs, transformation checkpoints, and safety feedback loops.`,
    },
    {
      id: 'task-practical_demo', format: 'practical_demo', formatLabel: 'Practical Demo',
      title: `Hands-On Protocol Execution: ${topic}`,
      description: `Perform or film a step-by-step benchmark execution showing exact tool calibration and safety compliance in ${topic}.`,
      criteriaCodes: criteria.slice(0, 3), coveredConcepts: concepts,
      handoutPrompt: `Follow the standard operating procedure for ${topic}, document step completion, and verify calibration benchmarks.`,
    },
    {
      id: 'task-peer_audit', format: 'peer_audit', formatLabel: 'Peer Audit',
      title: `${topic} Exemplar Quality Assurance Review`,
      description: `Evaluate an anonymous peer sample or workplace specimen against grading criteria, noting corrections and commendable mastery.`,
      criteriaCodes: criteria.slice(1, 3), coveredConcepts: concepts.slice(1, 3),
      handoutPrompt: `Audit the sample against criteria ${criteria.join(', ')}. Provide two constructive amendments and one validation mark.`,
    },
    {
      id: 'task-data_debug', format: 'data_debug', formatLabel: 'Data Debug',
      title: `${topic} Anomaly & Failure Analysis`,
      description: `Investigate an intentional flaw, flawed data set, or edge-case failure in ${topic} and supply the validated remediation.`,
      criteriaCodes: criteria.slice(0, 2), coveredConcepts: concepts,
      handoutPrompt: `Identify the root failure in the scenario data for ${topic}, formulate the fix, and confirm resilience test criteria.`,
    },
  ];
}

export async function fetchSummativeTasks(
  lessonTitle: string, chunks: LessonChunk[], moduleScheme?: ModuleScheme, subject?: string, gradeLevel?: string,
): Promise<SummativeTaskChoice[]> {
  const fallback = generateDefaultTasks(lessonTitle, chunks, moduleScheme);
  try {
    const res = await fetch('/api/generate-lesson-section', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'summative', lessonTitle, subject, gradeLevel,
        assessedCriteria: moduleScheme?.assessedCriteria || [],
        coveredConcepts: chunks.map((c) => c.title),
        vocationalScenario: moduleScheme?.vocationalScenario || '',
      }),
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    if (!Array.isArray(data?.tasks) || data.tasks.length !== 6) return fallback;
    return data.tasks.map((t: SummativeTaskChoice) => (
      t.format === 'written_cer' || t.formatLabel?.includes('CER')
        ? { ...t, format: 'written_report' as const, formatLabel: 'Written Report' }
        : t
    ));
  } catch {
    return fallback;
  }
}
