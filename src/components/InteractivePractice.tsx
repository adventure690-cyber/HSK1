import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Volume2,
  RotateCcw,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import {
  MultipleChoiceQuestion,
  FillInBlankQuestion,
  ReorderQuestion,
  GrammarPoint,
} from '../types';
import { useLanguage } from '../context/LanguageContext';

interface InteractivePracticeProps {
  mcQuestions: MultipleChoiceQuestion[];
  fillQuestions: FillInBlankQuestion[];
  reorderQuestions: ReorderQuestion[];
  grammarPoints: GrammarPoint[];
}

export const InteractivePractice: React.FC<InteractivePracticeProps> = ({
  mcQuestions,
  fillQuestions,
  reorderQuestions,
  grammarPoints,
}) => {
  const { t } = useLanguage();
  const [activeMode, setActiveMode] = useState<'mc' | 'fill' | 'reorder'>('mc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answersState, setAnswersState] = useState<{ [id: number]: boolean }>({});

  // Fill in blank state
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Reorder state
  const [selectedOrderWords, setSelectedOrderWords] = useState<string[]>([]);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setAnswersState({});
    setSelectedWord(null);
    setSelectedOrderWords([]);
  };

  const switchMode = (mode: 'mc' | 'fill' | 'reorder') => {
    setActiveMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setSelectedWord(null);
    setSelectedOrderWords([]);
  };

  // 1. Multiple choice logic
  const currentMc = mcQuestions[currentIndex];
  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
  };

  const handleCheckMc = () => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);
    const isCorrect = selectedOption === currentMc.correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setAnswersState((prev) => ({ ...prev, [currentMc.id]: isCorrect }));
  };

  // 2. Fill in blank logic
  const currentFill = fillQuestions[currentIndex];
  const handleCheckFill = () => {
    if (!selectedWord || isAnswerChecked) return;
    setIsAnswerChecked(true);
    const isCorrect = selectedWord === currentFill.correctWord;
    if (isCorrect) setScore((prev) => prev + 1);
    setAnswersState((prev) => ({ ...prev, [currentFill.id]: isCorrect }));
  };

  // 3. Reorder logic
  const currentReorder = reorderQuestions[currentIndex];
  const handleAddWordToReorder = (word: string) => {
    if (isAnswerChecked) return;
    setSelectedOrderWords((prev) => [...prev, word]);
  };
  const handleRemoveWordFromReorder = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOrderWords((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleCheckReorder = () => {
    if (isAnswerChecked) return;
    const constructed = selectedOrderWords.join('');
    const cleanedTarget = currentReorder.correctSentence.replace(/[。？！，、\s]/g, '');
    const isCorrect = constructed === cleanedTarget;
    setIsAnswerChecked(true);
    if (isCorrect) setScore((prev) => prev + 1);
    setAnswersState((prev) => ({ ...prev, [currentReorder.id]: isCorrect }));
  };

  const totalQuestions =
    activeMode === 'mc'
      ? mcQuestions.length
      : activeMode === 'fill'
      ? fillQuestions.length
      : reorderQuestions.length;

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setSelectedWord(null);
      setSelectedOrderWords([]);
    }
  };

  const isCompleted = currentIndex >= totalQuestions - 1 && isAnswerChecked;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner & Mode Picker */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>{t.quizTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Mode switch */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => switchMode('mc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeMode === 'mc' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            {t.mcModeBtn} ({mcQuestions.length})
          </button>
          <button
            onClick={() => switchMode('fill')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeMode === 'fill' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            {t.fillModeBtn} ({fillQuestions.length})
          </button>
          <button
            onClick={() => switchMode('reorder')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeMode === 'reorder' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            {t.reorderModeBtn} ({reorderQuestions.length})
          </button>
        </div>
      </div>

      {/* Progress & Score Bar */}
      <div className="flex items-center justify-between text-xs text-slate-600 mb-2 px-1">
        <span>
          {t.progressLabel} <strong className="text-slate-900">{currentIndex + 1}</strong> / {totalQuestions}
        </span>
        <div className="flex items-center gap-3">
          <span>
            {t.scoreSummaryLabel}: <strong className="text-emerald-700 font-bold text-sm">{score}</strong>
          </span>
          <button
            onClick={handleReset}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.retryQuizBtn}</span>
          </button>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* QUESTION CARD: MULTIPLE CHOICE */}
      {activeMode === 'mc' && currentMc && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
              ไวยากรณ์ข้อที่ {currentMc.grammarPointId}
            </span>
            <span className="text-xs text-slate-400">HSK 1 Multiple Choice</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 leading-relaxed">
            {currentMc.question}
          </h3>
          {currentMc.pinyin && (
            <p className="text-sm font-mono text-slate-500 mb-6 bg-slate-50 p-2 rounded-lg border border-slate-100">
              {currentMc.pinyin}
            </p>
          )}

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentMc.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentMc.correctAnswerIndex;
              let btnStyle = 'border-slate-200 hover:border-blue-300 hover:bg-slate-50';

              if (isAnswerChecked) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-2 ring-blue-500/20';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span>{option}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(option);
                      }}
                      className="text-slate-400 hover:text-blue-600 p-1"
                      title={t.listenAudio}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isAnswerChecked && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                    {isAnswerChecked && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Box when checked */}
          {isAnswerChecked && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-700 mb-1">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>คำอธิบายไวยากรณ์ (Grammar Explanation)</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">
                {currentMc.explanationTh}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                解析: {currentMc.explanationZh}
              </p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between">
            <div>
              {isAnswerChecked && (
                <span
                  className={`text-sm font-bold flex items-center gap-1.5 ${
                    selectedOption === currentMc.correctAnswerIndex
                      ? 'text-emerald-700'
                      : 'text-rose-700'
                  }`}
                >
                  {selectedOption === currentMc.correctAnswerIndex ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> {t.correctToast}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" /> {t.incorrectToast}
                    </>
                  )}
                </span>
              )}
            </div>

            {!isAnswerChecked ? (
              <button
                id="check-mc-btn"
                onClick={handleCheckMc}
                disabled={selectedOption === null}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-xs cursor-pointer transition-colors"
              >
                {t.checkAnswerBtn}
              </button>
            ) : (
              <button
                id="next-mc-btn"
                onClick={handleNext}
                disabled={currentIndex >= totalQuestions - 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-xs cursor-pointer transition-colors disabled:opacity-50"
              >
                <span>{t.nextQuestionBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUESTION CARD: FILL IN THE BLANK */}
      {activeMode === 'fill' && currentFill && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
              ไวยากรณ์ข้อที่ {currentFill.grammarPointId}
            </span>
            <span className="text-xs text-slate-400">HSK 1 Fill in the Blanks</span>
          </div>

          <p className="text-xs text-slate-500 mb-2">จงเลือกคำศัพท์ที่ถูกต้องมาเติมลงในช่องว่าง:</p>

          {/* Sentence Display */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center mb-6">
            <div className="text-2xl font-bold text-slate-900 font-mono tracking-wide mb-2">
              {currentFill.sentenceWithBlank.split('___')[0]}
              <span
                className={`inline-block min-w-20 px-3 py-1 mx-1 border-b-2 font-bold text-xl rounded transition-colors ${
                  isAnswerChecked
                    ? selectedWord === currentFill.correctWord
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-600'
                      : 'bg-rose-100 text-rose-800 border-rose-600'
                    : selectedWord
                    ? 'bg-blue-100 text-blue-900 border-blue-600'
                    : 'bg-white border-slate-400 text-slate-400'
                }`}
              >
                {selectedWord || '___'}
              </span>
              {currentFill.sentenceWithBlank.split('___')[1]}
            </div>
            <p className="text-sm font-mono text-slate-500">{currentFill.pinyinWithBlank}</p>
            <p className="text-xs text-slate-600 mt-1">ความหมาย: {currentFill.translationTh}</p>
          </div>

          {/* Word Bank Choices */}
          <div className="mb-6">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
              {t.wordBankPrompt}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentFill.wordBank.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => !isAnswerChecked && setSelectedWord(word)}
                  className={`p-3 rounded-xl border text-center font-bold text-base transition-all cursor-pointer ${
                    selectedWord === word
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-blue-300 bg-white text-slate-800'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {isAnswerChecked && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <div className="text-xs font-bold text-slate-700 mb-1">คำอธิบาย:</div>
              <p className="text-sm text-slate-700">{currentFill.explanationTh}</p>
              <div className="mt-2 text-xs text-emerald-700 font-semibold">
                คำตอบที่ถูกต้อง: {currentFill.correctWord}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between">
            <div>
              {isAnswerChecked && (
                <span
                  className={`text-sm font-bold flex items-center gap-1.5 ${
                    selectedWord === currentFill.correctWord
                      ? 'text-emerald-700'
                      : 'text-rose-700'
                  }`}
                >
                  {selectedWord === currentFill.correctWord ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> {t.correctToast}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" /> {t.incorrectToast}
                    </>
                  )}
                </span>
              )}
            </div>

            {!isAnswerChecked ? (
              <button
                onClick={handleCheckFill}
                disabled={!selectedWord}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-xs cursor-pointer transition-colors"
              >
                {t.checkAnswerBtn}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentIndex >= totalQuestions - 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-xs cursor-pointer transition-colors disabled:opacity-50"
              >
                <span>{t.nextQuestionBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUESTION CARD: SENTENCE REORDERING */}
      {activeMode === 'reorder' && currentReorder && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
              ไวยากรณ์ข้อที่ {currentReorder.grammarPointId}
            </span>
            <span className="text-xs text-slate-400">HSK 1 Sentence Unscramble</span>
          </div>

          <p className="text-xs text-slate-500 mb-2">
            {t.reorderPrompt}
          </p>

          {/* Constructed Sentence Area */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 min-h-20 flex flex-wrap items-center gap-2 mb-4">
            {selectedOrderWords.length === 0 ? (
              <span className="text-slate-400 text-sm italic">
                {t.reorderEmptyNotice}
              </span>
            ) : (
              selectedOrderWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWordFromReorder(idx)}
                  className="bg-white border border-blue-300 text-blue-900 px-3 py-1.5 rounded-lg text-sm font-bold shadow-xs hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors cursor-pointer"
                  title="คลิกเพื่อลบคำนี้ออก"
                >
                  {word} ×
                </button>
              ))
            )}
          </div>

          <p className="text-xs text-slate-500 mb-4">{t.targetMeaning} {currentReorder.translationTh}</p>

          {/* Shuffled pool */}
          <div className="mb-6">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
              {t.availableWordsPool}
            </label>
            <div className="flex flex-wrap gap-2">
              {currentReorder.shuffledWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddWordToReorder(word)}
                  disabled={isAnswerChecked}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-300 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors"
                >
                  + {word}
                </button>
              ))}
            </div>
          </div>

          {isAnswerChecked && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <div className="text-xs font-bold text-slate-700 mb-1">เฉลยประโยคที่ถูกต้อง:</div>
              <p className="text-base font-bold text-emerald-800">
                {currentReorder.correctSentence}
              </p>
              <p className="text-xs text-slate-500 font-mono italic">{currentReorder.pinyin}</p>
              <p className="text-xs text-slate-700 mt-2">หลักไวยากรณ์: {currentReorder.explanationTh}</p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedOrderWords([])}
              disabled={isAnswerChecked || selectedOrderWords.length === 0}
              className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer disabled:opacity-40"
            >
              {t.clearSelectionBtn}
            </button>

            {!isAnswerChecked ? (
              <button
                onClick={handleCheckReorder}
                disabled={selectedOrderWords.length === 0}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-xs cursor-pointer transition-colors"
              >
                {t.checkAnswerBtn}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentIndex >= totalQuestions - 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-xs cursor-pointer transition-colors disabled:opacity-50"
              >
                <span>{t.nextQuestionBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completion Trophy Card */}
      {isCompleted && (
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <Trophy className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
          <h4 className="text-lg font-bold text-emerald-900">{t.congratsTitle}</h4>
          <p className="text-sm text-emerald-700 mt-1">
            {t.congratsScore} <span className="font-bold text-lg">{score}</span> / {totalQuestions} ข้อ
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer shadow-xs"
          >
            {t.retryQuizBtn}
          </button>
        </div>
      )}
    </div>
  );
};
