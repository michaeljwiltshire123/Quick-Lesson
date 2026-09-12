import { Router } from 'express';
import { handleProgressionSuggestions } from './aiHandlers';
import { handleParseBrief, handleLessonSequence, handleReparseBriefSection, handleVideoMetadata } from './briefHandlers';
import { handleLessonSection } from './lessonSectionHandler';
import { handleMediaScenes } from './mediaScenesHandler';
import { handleLociKeywords, handleLociAssociations, handleLociScript, handleLociStations } from './lociHandler';
import { handleWordBreakdown, handleNanoBananaPuzzle } from './wordBreakdownHandler';
import { handleGenerateLimerick } from './limerickHandler';

export const apiRouter = Router();

apiRouter.post('/api/parse-module-brief', handleParseBrief);
apiRouter.post('/api/generate-progression-suggestions', handleProgressionSuggestions);
apiRouter.post('/api/generate-lesson-sequence', handleLessonSequence);
apiRouter.post('/api/generate-lesson-section', handleLessonSection);
apiRouter.post('/api/generate-media-scenes', handleMediaScenes);
apiRouter.post('/api/reparse-brief-section', handleReparseBriefSection);
apiRouter.post('/api/video-metadata', handleVideoMetadata);
apiRouter.post('/api/generate-loci-keywords', handleLociKeywords);
apiRouter.post('/api/generate-loci-stations', handleLociStations);
apiRouter.post('/api/generate-loci-associations', handleLociAssociations);
apiRouter.post('/api/generate-loci-script', handleLociScript);
apiRouter.post('/api/generate-word-breakdown', handleWordBreakdown);
apiRouter.post('/api/generate-nano-banana-puzzle', handleNanoBananaPuzzle);
apiRouter.post('/api/generate-limerick', handleGenerateLimerick);
