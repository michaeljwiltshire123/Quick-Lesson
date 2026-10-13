export interface ProgressionItem {
  id: string;
  label: string;
  tooltip: string;
  category: string;
}

export const CURRICULUM_SUGGESTIONS: ProgressionItem[] = [
  { id: '1', label: 'Diagnostic Baseline Assessment', tooltip: 'Evaluate learners’ prior knowledge and uncover misconceptions before introducing new core concepts.', category: 'Pedagogy' },
  { id: '2', label: 'First Principles Deconstruction', tooltip: 'Break down complex systems into foundational axiomatic truths and core mathematical or physical laws.', category: 'Theory' },
  { id: '3', label: 'Three-Act Structural Scaffolding', tooltip: 'Frame the lesson progression through narrative setup, progressive confrontation of challenges, and clear resolution.', category: 'Framework' },
  { id: '4', label: "Hero's Journey Archetypal Analysis", tooltip: 'Guide students through exploration, threshold crossing, obstacle mastery, and transformative synthesis.', category: 'Framework' },
  { id: '5', label: 'Socratic Dialectic Exploration', tooltip: 'Use structured inquiry and targeted questioning to challenge assumptions and uncover underlying logic.', category: 'Inquiry' },
  { id: '6', label: 'Empirical Data Gathering & Sampling', tooltip: 'Design hands-on investigation protocols to capture accurate, reproducible quantitative observations.', category: 'Practical' },
  { id: '7', label: 'Comparative Case Study Evaluation', tooltip: 'Analyse real-world vocational scenarios side-by-side to identify divergent outcomes and best practices.', category: 'Application' },
  { id: '8', label: 'Theoretical Model Simulation', tooltip: 'Run digital or conceptual simulations to test hypotheses under variable environmental parameters.', category: 'Simulation' },
  { id: '9', label: 'Vocational Quality Assurance Audit', tooltip: 'Benchmark student outputs against national industry standards and strict regulatory criteria.', category: 'Industry' },
  { id: '10', label: 'Cognitive Dual-Coding Synthesis', tooltip: 'Combine visual diagrammatic models with verbal explanations to deepen conceptual retention.', category: 'Pedagogy' },
  { id: '11', label: 'Iterative Prototyping & Stress Testing', tooltip: 'Build rapid initial solutions, test failure thresholds, and refine functional execution systematically.', category: 'Design' },
  { id: '12', label: 'Ethical Dilemma & Impact Appraisal', tooltip: 'Critically examine socio-economic, environmental, and ethical implications of domain technologies.', category: 'Ethics' },
  { id: '13', label: 'Peer Review & Moderation Protocol', tooltip: 'Facilitate structured peer critique using rubrics aligned with UK grade awarding criteria.', category: 'Assessment' },
  { id: '14', label: 'Statistical Variance & Error Analysis', tooltip: 'Quantify measurement anomalies, standard deviations, and experimental margins of error.', category: 'Analysis' },
  { id: '15', label: 'Algorithmic Efficiency Optimization', tooltip: 'Identify computational bottlenecks and refine workflows for optimal performance and scale.', category: 'Computing' },
  { id: '16', label: 'Universal Design & Accessibility Audit', tooltip: 'Evaluate solutions against accessibility guidelines to ensure broad, inclusive usability.', category: 'Inclusion' },
  { id: '17', label: 'Multivariate Factorial Modeling', tooltip: 'Isolate interdependent variables to predict non-linear system behaviours accurately.', category: 'Advanced' },
  { id: '18', label: 'Formative Synthesis Checkpoint', tooltip: 'Quick low-stakes retrieval challenge to verify comprehension before advancing to mastery tasks.', category: 'Checkpoint' },
  { id: '19', label: 'Summative Portfolio Evidence Consolidation', tooltip: 'Assemble verified artefacts, reflective logs, and technical annotations for final submission.', category: 'Evidence' },
  { id: '20', label: 'Metacognitive Self-Regulation Review', tooltip: 'Promote student reflection on learning strategies, problem-solving hurdles, and future targets.', category: 'Metacognition' },
];
