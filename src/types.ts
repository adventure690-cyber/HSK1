export interface GrammarPoint {
  id: number;
  titleTh: string;
  titleZh: string;
  category: 'sentence_structure' | 'questions' | 'negation' | 'verbs_prepositions' | 'modals_adjectives' | 'time';
  structure: string;
  explanationTh: string;
  explanationZh: string;
  examples: {
    hanzi: string;
    pinyin: string;
    translationTh: string;
    translationZh: string;
  }[];
  keyParticles: string[];
}

export interface MultipleChoiceQuestion {
  id: number;
  grammarPointId: number;
  question: string;
  pinyin?: string;
  options: string[];
  correctAnswerIndex: number;
  explanationTh: string;
  explanationZh: string;
}

export interface FillInBlankQuestion {
  id: number;
  grammarPointId: number;
  sentenceWithBlank: string;
  pinyinWithBlank: string;
  wordBank: string[];
  correctWord: string;
  translationTh: string;
  explanationTh: string;
}

export interface ReorderQuestion {
  id: number;
  grammarPointId: number;
  shuffledWords: string[];
  correctSentence: string;
  pinyin: string;
  translationTh: string;
  explanationTh: string;
}

export interface TranslationQuestion {
  id: number;
  grammarPointId: number;
  thaiSentence: string;
  chineseAnswer: string;
  pinyin: string;
  hint: string;
}

export interface WorksheetConfig {
  title: string;
  subtitle: string;
  schoolName: string;
  className: string;
  teacherName: string;
  studentNamePrompt: string;
  selectedGrammarPointIds: number[];
  includeGrammarNotes: boolean;
  includeMultipleChoice: boolean;
  includeFillInBlanks: boolean;
  includeSentenceReordering: boolean;
  includeTranslation: boolean;
  includeAnswerKey: boolean;
  languageMode: 'th_zh' | 'th_only' | 'zh_only';
}
