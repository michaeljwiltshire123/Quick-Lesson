import { useState } from 'react';
import { DontSayItRoomConfig, SecretWordCard } from '../types/dontSayItTypes';
import { synchroniseCardPool } from '../services/wordPoolCalculator';
import { extractCurriculumWordsFromLesson } from '../services/dontSayItApi';
import { LessonChunk } from '../../../../../types';

export function useDontSayItSetup(lessonTitle: string, chunks: LessonChunk[] = []) {
  const [roomCode] = useState<string>(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  });

  const [config, setConfig] = useState<DontSayItRoomConfig>({
    roomCode,
    lessonTitle: lessonTitle || 'UK Curriculum Showdown',
    teamCount: 2,
    teams: [
      { id: 'team-1', name: 'Team Red', color: 'red', score: 0 },
      { id: 'team-2', name: 'Team Blue', color: 'blue', score: 0 },
    ],
    totalRounds: 2,
    timeLimitSeconds: 60,
    bannedWordsPerCard: 3,
    allowAiFallback: true,
    isLive: true,
  });

  const [cards, setCards] = useState<SecretWordCard[]>(() =>
    synchroniseCardPool([], 2, 2, lessonTitle, chunks, 3)
  );
  const [isAttached, setIsAttached] = useState(() => Boolean(sessionStorage.getItem('attached_dont_say_it')));
  const [isAiExtracting, setIsAiExtracting] = useState(false);

  const handleConfigChange = (updated: DontSayItRoomConfig) => {
    setConfig(updated);
    setCards((prev) => synchroniseCardPool(prev, updated.teamCount, updated.totalRounds, lessonTitle, chunks, updated.bannedWordsPerCard));
  };

  const handleUpdateCard = (idx: number, updatedCard: SecretWordCard) => {
    const nextCards = [...cards];
    nextCards[idx] = updatedCard;
    setCards(nextCards);
  };

  const handleAiExtract = async (onNotice?: (msg: string) => void) => {
    setIsAiExtracting(true);
    const needed = config.teamCount * config.totalRounds;
    const aiResults = await extractCurriculumWordsFromLesson(lessonTitle, chunks, needed, config.bannedWordsPerCard);
    setIsAiExtracting(false);

    if (aiResults.length > 0) {
      const freshCards: SecretWordCard[] = aiResults.map((r, i) => ({
        id: `card-ai-${i + 1}-${Date.now()}`,
        targetWord: r.targetWord,
        studentBannedWords: [],
        aiFallbackBannedWords: r.bannedWords || [],
        activeBannedWords: r.bannedWords || [],
        chunkIndex: i % Math.max(1, chunks.length),
        hint: r.hint || `Key concept from ${lessonTitle}.`,
      }));
      setCards(freshCards);
      onNotice?.(`AI extracted ${freshCards.length} high-value lesson target terms!`);
    } else {
      const fresh = synchroniseCardPool([], config.teamCount, config.totalRounds, lessonTitle, chunks, config.bannedWordsPerCard);
      setCards(fresh);
      onNotice?.('Synchronised fresh curriculum target words!');
    }
  };

  return {
    roomCode,
    config,
    cards,
    isAttached,
    isAiExtracting,
    setIsAttached,
    setCards,
    handleConfigChange,
    handleUpdateCard,
    handleAiExtract,
  };
}
