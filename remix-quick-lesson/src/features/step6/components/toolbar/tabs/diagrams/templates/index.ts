import { LucideIcon, Clock, GitCompareArrows, LayoutGrid, Triangle, Network, GitBranch, RefreshCw, Cloud, BarChart3, Route } from 'lucide-react';
import { SlideElement } from '../../../../../types/slideTypes';
import { DiagramOptions } from '../diagramFactory';
import { createTimeline } from './timeline';
import { createVenn } from './venn';
import { createPyramid } from './pyramid';
import { createMatrix } from './matrix';
import { createMindMap } from './mind-map';
import { createHierarchy } from './hierarchy';
import { createCycle } from './cycle';
import { createWordCloud } from './word-cloud';
import { createGantt } from './gantt';
import { createPert } from './pert';

export interface DiagramTemplate {
  title: string;
  description: string;
  icon: LucideIcon;
  controls: { key: string; label: string; options: { value: string; label: string }[] }[];
  defaults: DiagramOptions;
  create: (options: DiagramOptions) => SlideElement[];
  liveOnly?: boolean;
}

const choices = (count: number) => Array.from({ length: count }, (_, i) => ({ value: String(i + 2), label: String(i + 2) }));
const lookControl = { key: 'style', label: 'Colour palette', options: [
  { value: 'ocean', label: 'Ocean' }, { value: 'sunset', label: 'Sunset' },
  { value: 'botanical', label: 'Botanical' }, { value: 'plum', label: 'Plum' },
] };

export const DIAGRAM_TEMPLATES: DiagramTemplate[] = [
  { title: 'Timeline', description: 'Editable events and date labels', icon: Clock, controls: [{ key: 'parts', label: 'Events', options: choices(6) }, lookControl], defaults: { parts: '4', style: 'ocean' }, create: createTimeline },
  { title: 'Venn Diagram', description: 'Compare two ideas and their overlap', icon: GitCompareArrows, controls: [{ key: 'sets', label: 'Sets', options: [{ value: '2', label: '2 circles' }, { value: '3', label: '3 circles' }] }, lookControl], defaults: { sets: '2', style: 'ocean' }, create: createVenn },
  { title: 'Pyramid', description: 'Build an editable tiered model', icon: Triangle, controls: [{ key: 'levels', label: 'Levels', options: choices(5) }, lookControl], defaults: { levels: '3', style: 'sunset' }, create: createPyramid },
  { title: 'Matrix', description: 'Editable comparison grid', icon: LayoutGrid, controls: [{ key: 'rows', label: 'Rows', options: choices(3) }, { key: 'columns', label: 'Columns', options: choices(3) }, lookControl], defaults: { rows: '2', columns: '2', style: 'ocean' }, create: createMatrix },
  { title: 'Mind Map', description: 'Central idea with editable branches', icon: Network, controls: [{ key: 'branches', label: 'Branches', options: choices(7) }, { key: 'layout', label: 'Layout', options: [{ value: 'radial', label: 'Radial' }, { value: 'sides', label: 'Left & right' }] }, lookControl], defaults: { branches: '4', layout: 'radial', style: 'plum' }, create: createMindMap },
  { title: 'Hierarchy Tree', description: 'Editable parent, branches, and details', icon: GitBranch, controls: [{ key: 'branches', label: 'Branches', options: choices(3) }, { key: 'levels', label: 'Depth', options: [{ value: '2', label: '2 levels' }, { value: '3', label: '3 levels' }] }, lookControl], defaults: { branches: '3', levels: '2', style: 'botanical' }, create: createHierarchy },
  { title: 'Cycle', description: 'Editable circular process stages', icon: RefreshCw, controls: [{ key: 'stages', label: 'Stages', options: choices(6) }, lookControl], defaults: { stages: '4', style: 'botanical' }, create: createCycle },
  { title: 'Word Cloud', description: 'Editable word layout', icon: Cloud, controls: [{ key: 'words', label: 'Words', options: choices(8) }, lookControl], defaults: { words: '5', style: 'plum' }, create: createWordCloud, liveOnly: true },
  { title: 'Gantt Chart', description: 'Resize task bars to show duration', icon: BarChart3, controls: [{ key: 'tasks', label: 'Tasks', options: choices(6) }, { key: 'periods', label: 'Time periods', options: choices(4) }, lookControl], defaults: { tasks: '4', periods: '4', style: 'ocean' }, create: createGantt },
  { title: 'PERT Chart', description: 'Editable task nodes and flow labels', icon: Route, controls: [{ key: 'tasks', label: 'Tasks', options: choices(6) }, { key: 'layout', label: 'Flow', options: [{ value: 'branching', label: 'Branching' }, { value: 'linear', label: 'Linear' }] }, lookControl], defaults: { tasks: '5', layout: 'branching', style: 'sunset' }, create: createPert },
];
