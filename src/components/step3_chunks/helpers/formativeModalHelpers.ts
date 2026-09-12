export interface FormativeTaskItem {
  id: string; title: string; intelligence: string;
  badge?: string; criterion?: string; criteria?: string[];
  task: string; rules?: string;
}

export function getCriteriaList(act: FormativeTaskItem, hasAssessedCriteria: boolean): string[] {
  if (!hasAssessedCriteria) return [];
  if (Array.isArray(act.criteria) && act.criteria.length > 0) return act.criteria;
  const raw = act.badge || act.criterion || '';
  if (!raw || raw.toLowerCase().includes('none')) return [];
  return raw.split(/[,/ ]+/).map((s) => s.trim()).filter(Boolean);
}

export function getBadgeStyle(badge?: string) {
  const b = (badge || '').trim().toUpperCase();
  if (b.startsWith('A')) return 'bg-red-50 text-red-700 border-red-200';
  if (b.startsWith('P')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (b.startsWith('M')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (b.startsWith('D')) return 'bg-purple-50 text-purple-700 border-purple-200';
  return 'bg-amber-50 text-amber-800 border-amber-200';
}

export function getIntelligenceBadgeStyle(intelligence?: string): string {
  const intel = (intelligence || '').toLowerCase();
  if (intel.includes('linguistic') || intel.includes('verbal')) return 'bg-blue-100 text-blue-900 border-blue-300';
  if (intel.includes('logical') || intel.includes('mathematical')) return 'bg-indigo-100 text-indigo-900 border-indigo-300';
  if (intel.includes('spatial') || intel.includes('visual')) return 'bg-amber-100 text-amber-900 border-amber-300';
  if (intel.includes('kinesthetic') || intel.includes('bodily')) return 'bg-rose-100 text-rose-900 border-rose-300';
  if (intel.includes('musical')) return 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300';
  if (intel.includes('interpersonal')) return 'bg-cyan-100 text-cyan-900 border-cyan-300';
  if (intel.includes('intrapersonal')) return 'bg-violet-100 text-violet-900 border-violet-300';
  if (intel.includes('natural')) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
  if (intel.includes('existential')) return 'bg-orange-100 text-orange-900 border-orange-300';
  return 'bg-amber-100 text-amber-900 border-amber-300';
}

export function getFallbackTasks(title: string, grouping: string, hasAssessedCriteria = true): FormativeTaskItem[] {
  return [
    { id: '1', title: `${title} Rapid Debate`, intelligence: 'Linguistic-Verbal', criteria: hasAssessedCriteria ? ['A1'] : [], task: `Debate principles of ${title} (${grouping}) for 2 mins.` },
    { id: '2', title: `${title} Matrix Sort`, intelligence: 'Logical-Mathematical', criteria: hasAssessedCriteria ? ['P1'] : [], task: `Classify factors of ${title} (${grouping}) into a 2x2 grid.` },
    { id: '3', title: `${title} Visual Map`, intelligence: 'Visual-Spatial', criteria: hasAssessedCriteria ? ['M1'] : [], task: `Sketch a fast concept diagram for ${title} (${grouping}).` },
    { id: '4', title: `${title} Role Simulation`, intelligence: 'Bodily-Kinesthetic', criteria: hasAssessedCriteria ? ['D1'] : [], task: `Act out a 30-sec application of ${title} (${grouping}).` },
    { id: '5', title: `${title} Rhythm & Mnemonic`, intelligence: 'Musical', criteria: hasAssessedCriteria ? ['A2', 'P1'] : [], task: `Compose a 2-line formula rhythm for ${title}.` },
    { id: '6', title: `${title} Peer Audit`, intelligence: 'Interpersonal', criteria: hasAssessedCriteria ? ['P2'] : [], task: `Give partner 1 glow and 1 grow for ${title}.` },
    { id: '7', title: `${title} Self-Reflect`, intelligence: 'Intrapersonal', criteria: hasAssessedCriteria ? ['M2'] : [], task: `Write 2 points on confidence with ${title}.` },
    { id: '8', title: `${title} System Parallel`, intelligence: 'Naturalistic', criteria: hasAssessedCriteria ? ['P3'] : [], task: `Compare ${title} to an organic ecosystem.` },
    { id: '9', title: `${title} Big Picture Why`, intelligence: 'Existential', criteria: hasAssessedCriteria ? ['D2'] : [], task: `Summarize why ${title} matters to industry.` },
  ];
}
