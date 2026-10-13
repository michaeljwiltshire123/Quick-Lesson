export type LociWizardStep = 'words' | 'mapper' | 'script';

export interface LociAssociationOption {
  term: string;
  station: string;
  options: string[];
  selected: string;
  customText: string;
  sensoryAnchor?: string;
}

export interface LociRouteStationMapping {
  term: string;
  association: string;
  station: string;
}

export interface LociScriptStationItem {
  station: string;
  term: string;
  phoneticBreakdown?: string;
  association: string;
  teacherScript?: string;
  explicitScene?: string;
  mnemonicBreakdown?: string;
  guidedVisualizationPrompt?: string;
  setupPrompt?: string;
  recallQuestions?: string[];
  activeRecallQuestion: string;
}

export interface LociScriptOutput {
  title: string;
  introduction: string;
  stations: LociScriptStationItem[];
  peerTeachingPrompt?: string;
  spacedRetrievalSchedule?: string[];
  summary: string;
}

export interface LociRoutePreset {
  id: string;
  name: string;
  stations: string[];
}
