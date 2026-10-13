import { AcronymFormState, AcronymItem } from './types';

const fallbackAcronyms = (concept: string, workflow: string): AcronymItem[] => {
  const c = concept || 'Topic';
  return [
    {
      id: `acronym-1`, word: 'FOCUS',
      meaning: `Foundation, Observation, Clarification, Understanding, Synthesis for ${c}`,
      breakdown: [
        { letter: 'F', term: 'Foundation', explanation: `Establish core ground principles of ${c}` },
        { letter: 'O', term: 'Observation', explanation: `Carefully examine initial patterns and data` },
        { letter: 'C', term: 'Clarification', explanation: `Refine terminology and resolve ambiguities` },
        { letter: 'U', term: 'Understanding', explanation: `Demonstrate mastery through practical application` },
        { letter: 'S', term: 'Synthesis', explanation: `Summarise takeaways and consolidate insight` },
      ],
      rationale: `Direct structured workflow to master ${workflow || c}.`, selected: true,
    },
    {
      id: `acronym-2`, word: 'CRAFT',
      meaning: `Context, Research, Analysis, Formulation, Testing for ${c}`,
      breakdown: [
        { letter: 'C', term: 'Context', explanation: `Identify the scenario and practical framing` },
        { letter: 'R', term: 'Research', explanation: `Gather relevant evidence and curriculum facts` },
        { letter: 'A', term: 'Analysis', explanation: `Deconstruct mechanisms and key relationships` },
        { letter: 'F', term: 'Formulation', explanation: `Construct hypotheses or initial solutions` },
        { letter: 'T', term: 'Testing', explanation: `Validate outcomes against success criteria` },
      ],
      rationale: `Encourages investigative rigour and disciplined execution.`, selected: false,
    },
    {
      id: `acronym-3`, word: 'SPARK',
      meaning: `Scan, Plan, Apply, Review, Know for ${c}`,
      breakdown: [
        { letter: 'S', term: 'Scan', explanation: `Survey the challenge and highlight core variables` },
        { letter: 'P', term: 'Plan', explanation: `Outline sequential steps and allocate time` },
        { letter: 'A', term: 'Apply', explanation: `Execute the method with purposeful technique` },
        { letter: 'R', term: 'Review', explanation: `Inspect results for accuracy and precision` },
        { letter: 'K', term: 'Know', explanation: `Secure the learning into long-term memory` },
      ],
      rationale: `Memorable 5-step diagnostic loop for high engagement.`, selected: false,
    },
    {
      id: `acronym-4`, word: 'BUILD',
      meaning: `Baseline, Understand, Investigate, Link, Deliver for ${c}`,
      breakdown: [
        { letter: 'B', term: 'Baseline', explanation: `Assess prerequisite knowledge and objectives` },
        { letter: 'U', term: 'Understand', explanation: `Unpack essential models and explanations` },
        { letter: 'I', term: 'Investigate', explanation: `Explore edge cases and deep questions` },
        { letter: 'L', term: 'Link', explanation: `Connect findings to real-world applications` },
        { letter: 'D', term: 'Deliver', explanation: `Demonstrate finished learning artifacts` },
      ],
      rationale: `Constructivist sequence for progressive curriculum skill building.`, selected: false,
    },
  ];
};

export async function generateAcronymsApi(
  form: AcronymFormState, subject = 'General', gradeLevel = 'General'
): Promise<AcronymItem[]> {
  const workflow = form.customWorkflow.trim() || form.selectedWorkflow || form.concept;
  try {
    const res = await fetch('/api/generate-acronym', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concept: form.concept, contextScript: form.contextScript, workflow, subject, gradeLevel }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data?.acronyms) && data.acronyms.length > 0) return data.acronyms;
  } catch { /* resort to pedagogical fallback */ }
  return fallbackAcronyms(form.concept, workflow);
}
