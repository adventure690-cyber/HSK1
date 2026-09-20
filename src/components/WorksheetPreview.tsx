import React, { useState } from 'react';
import {
  Volume2,
  FileDown,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import {
  GrammarPoint,
  MultipleChoiceQuestion,
  FillInBlankQuestion,
  ReorderQuestion,
  TranslationQuestion,
  WorksheetConfig,
} from '../types';
import { useLanguage } from '../context/LanguageContext';

interface WorksheetPreviewProps {
  config: WorksheetConfig;
  grammarPoints: GrammarPoint[];
  mcQuestions: MultipleChoiceQuestion[];
  fillQuestions: FillInBlankQuestion[];
  reorderQuestions: ReorderQuestion[];
  transQuestions: TranslationQuestion[];
  onDownloadDocx: (mode: 'student' | 'teacher' | 'grammar_only') => void;
  isDownloading: boolean;
}

export const WorksheetPreview: React.FC<WorksheetPreviewProps> = ({
  config,
  grammarPoints,
  mcQuestions,
  fillQuestions,
  reorderQuestions,
  transQuestions,
  onDownloadDocx,
  isDownloading,
}) => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'student' | 'teacher'>('student');

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const isTeacher = viewMode === 'teacher';

  return (
    <div className="py-6 px-3 sm:px-6 max-w-5xl mx-auto">
      {/* Control bar above preview */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs no-print">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">{t.previewModeLabel}</span>
          <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 text-xs font-medium">
            <button
              id="view-mode-student-btn"
              onClick={() => setViewMode('student')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'student'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.studentModeBtn}</span>
            </button>
            <button
              id="view-mode-teacher-btn"
              onClick={() => setViewMode('teacher')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'teacher'
                  ? 'bg-white text-red-600 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.teacherModeBtn}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="quick-download-word-btn"
            onClick={() => onDownloadDocx(isTeacher ? 'teacher' : 'student')}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>
              {isDownloading
                ? t.downloadingWord
                : `${t.quickDownloadBtn} (${isTeacher ? t.teacherVersion.split(' ')[0] : t.studentVersion.split(' ')[0]})`}
            </span>
          </button>
        </div>
      </div>

      {/* A4 Paper Container */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-12 print-container text-slate-900 font-sans">
        {/* Document Header */}
        <div className="text-center pb-6 border-b border-slate-200 mb-6">
          {config.schoolName && (
            <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-1">
              {config.schoolName}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            {config.title || 'รวมไวยากรณ์ HSK 1 (ระดับพื้นฐาน) & ใบงานแบบฝึกหัด'}
          </h2>
          <p className="text-sm font-medium text-slate-600">
            {config.subtitle || 'HSK 1 Chinese Grammar Worksheet & Revision Test'}
            {isTeacher && (
              <span className="ml-2 text-red-600 font-bold bg-red-50 border border-red-200 px-2 py-0.5 rounded-full text-xs">
                {t.teacherKeyBadge}
              </span>
            )}
          </p>
        </div>

        {/* Student Info Box */}
        <div className="border border-slate-300 rounded-xl overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-4 bg-slate-50/50">
          <div className="md:col-span-3 p-4 border-b md:border-b-0 md:border-r border-slate-300 space-y-2 text-sm">
            <div className="flex flex-wrap gap-4">
              <span className="font-medium text-slate-700">
                {t.studentNameLabel}: <span className="underline decoration-slate-400 font-normal">_____________________________________</span>
              </span>
              <span className="font-medium text-slate-700">
                {t.classLabel}: <span className="underline decoration-slate-400 font-normal">{config.className || '_________'}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-4 pt-1">
              <span className="font-medium text-slate-700">
                {t.noLabel}: <span className="underline decoration-slate-400 font-normal">_________</span>
              </span>
              <span className="font-medium text-slate-700">
                {t.dateLabel}: <span className="underline decoration-slate-400 font-normal">___________________</span>
              </span>
              {config.teacherName && (
                <span className="font-medium text-slate-700">
                  {t.teacherLabel}: <span className="font-normal">{config.teacherName}</span>
                </span>
              )}
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center bg-slate-100/70">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              {t.scoreLabel}
            </span>
            <div className="text-2xl font-bold text-slate-800">
              _______ <span className="text-sm font-normal text-slate-500">{t.outOf100}</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: GRAMMAR REVIEW TABLE */}
        {config.includeGrammarNotes && grammarPoints.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4 border-b-2 border-teal-700 pb-2">
              <h3 className="text-lg font-bold text-teal-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">
                  ★
                </span>
                {t.grammarSummaryTitle} ({grammarPoints.length})
              </h3>
              <span className="text-xs text-slate-500 font-medium">{t.grammarSummarySub}</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold text-xs">
                    <th className="py-2.5 px-3 w-12 text-center">{t.thColNo}</th>
                    <th className="py-2.5 px-3 w-1/3">{t.thColGrammar}</th>
                    <th className="py-2.5 px-3">{t.thColExplanation}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {grammarPoints.map((gp) => (
                    <tr key={gp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-slate-700 align-top">
                        {gp.id}
                      </td>
                      <td className="py-3 px-3 align-top space-y-1">
                        <div className="font-semibold text-blue-900">{gp.titleTh}</div>
                        <div className="text-xs bg-blue-50 text-blue-800 border border-blue-100 px-2 py-1 rounded-md font-mono">
                          {t.structureLabel} <span className="font-semibold">{gp.structure}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 align-top space-y-2">
                        <p className="text-xs text-slate-600">{gp.explanationTh}</p>
                        <div className="space-y-1 pt-1">
                          {gp.examples.map((ex, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs bg-slate-50 p-1.5 rounded-md">
                              <button
                                onClick={() => playAudio(ex.hanzi)}
                                className="text-blue-600 hover:text-blue-800 p-0.5 cursor-pointer no-print shrink-0"
                                title="發音 / ฟังเสียง"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-bold text-slate-900 text-sm">{ex.hanzi}</span>
                              <span className="text-slate-500 italic">({ex.pinyin})</span>
                              <span className="text-slate-700 font-medium">→ {ex.translationTh}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 2: MULTIPLE CHOICE */}
        {config.includeMultipleChoice && mcQuestions.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-2 border-b-2 border-blue-800 pb-2">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                {t.part1Title}
              </h3>
              <span className="text-xs text-slate-500 font-medium">{mcQuestions.length} {t.part1Points}</span>
            </div>
            <p className="text-xs text-slate-500 italic mb-4">
              {t.part1Desc}
            </p>

            <div className="space-y-4">
              {mcQuestions.map((q, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-xl border ${
                      isTeacher ? 'bg-red-50/20 border-red-200' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-sm px-2 py-0.5 rounded-md border border-slate-300 bg-slate-50 text-slate-700 shrink-0">
                        {isTeacher ? (
                          <span className="text-red-600 font-bold">{letters[q.correctAnswerIndex]}</span>
                        ) : (
                          '____'
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-slate-900">
                            {idx + 1}. {q.question}
                          </span>
                          {q.pinyin && (
                            <span className="text-xs text-slate-500 font-mono italic">
                              [{q.pinyin}]
                            </span>
                          )}
                          <button
                            onClick={() => playAudio(q.options[q.correctAnswerIndex])}
                            className="text-slate-400 hover:text-blue-600 p-0.5 no-print"
                            title="ฟังเสียงอ่าน"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                          {q.options.map((opt, oIdx) => {
                            const isCorrect = isTeacher && oIdx === q.correctAnswerIndex;
                            return (
                              <div
                                key={oIdx}
                                className={`text-xs p-2 rounded-lg border transition-colors flex items-center gap-2 ${
                                  isCorrect
                                    ? 'bg-red-50 border-red-300 text-red-700 font-bold'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-800'
                                }`}
                              >
                                <span className="font-bold w-4">{letters[oIdx]}.</span>
                                <span>{opt}</span>
                                {isCorrect && (
                                  <span className="ml-auto text-[11px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-semibold">
                                    {t.correctAnswerBadge}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Teacher Explanation */}
                        {isTeacher && (
                          <div className="mt-2 text-xs bg-red-100/60 text-red-800 p-2 rounded-md">
                            <span className="font-bold">{t.explanationAndReason}</span> {q.explanationTh} ({q.explanationZh})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 3: FILL IN THE BLANKS */}
        {config.includeFillInBlanks && fillQuestions.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-2 border-b-2 border-blue-800 pb-2">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                {t.part2Title}
              </h3>
              <span className="text-xs text-slate-500 font-medium">{fillQuestions.length} ข้อ</span>
            </div>
            <p className="text-xs text-slate-500 italic mb-3">
              {t.part2Desc}
            </p>

            {/* Word Bank Box */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 mb-5 text-center">
              <span className="text-xs font-bold text-blue-900 block mb-1.5">
                {t.wordBankTitle}
              </span>
              <div className="flex items-center justify-center flex-wrap gap-2.5">
                {Array.from(new Set(fillQuestions.map((f) => f.correctWord))).map((w, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-blue-200 px-3 py-1 rounded-lg text-sm font-bold text-blue-800 shadow-2xs font-mono"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-3.5">
              {fillQuestions.map((fq, idx) => (
                <div key={fq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sm text-slate-700">{idx + 1}.</span>
                    <div className="flex-1">
                      <div className="text-base font-semibold text-slate-900 font-mono tracking-wide">
                        {isTeacher ? (
                          <span>
                            {fq.sentenceWithBlank.split('___')[0]}
                            <span className="underline decoration-red-500 text-red-600 font-bold px-1.5 bg-red-50 rounded">
                              {fq.correctWord}
                            </span>
                            {fq.sentenceWithBlank.split('___')[1]}
                          </span>
                        ) : (
                          <span>
                            {fq.sentenceWithBlank.split('___')[0]}
                            <span className="inline-block w-24 border-b-2 border-slate-700 mx-1 text-center font-normal"></span>
                            {fq.sentenceWithBlank.split('___')[1]}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                        <span>พินอิน: {fq.pinyinWithBlank}</span>
                        <span>•</span>
                        <span className="text-slate-700">แปล: {fq.translationTh}</span>
                      </div>
                      {isTeacher && (
                        <div className="mt-1.5 text-xs text-red-700 bg-red-50 p-1.5 rounded">
                          <span className="font-bold">{t.grammarReason}</span> {fq.explanationTh}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: SENTENCE REORDERING */}
        {config.includeSentenceReordering && reorderQuestions.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-2 border-b-2 border-blue-800 pb-2">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                  3
                </span>
                {t.part3Title}
              </h3>
              <span className="text-xs text-slate-500 font-medium">{reorderQuestions.length} ข้อ</span>
            </div>
            <p className="text-xs text-slate-500 italic mb-4">
              {t.part3Desc}
            </p>

            <div className="space-y-4">
              {reorderQuestions.map((rq, idx) => (
                <div key={rq.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap text-sm">
                    <span className="font-bold text-slate-800">{idx + 1}. {t.givenWords}</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {rq.shuffledWords.map((word, wIdx) => (
                        <span
                          key={wIdx}
                          className="bg-white border border-slate-300 px-2 py-0.5 rounded text-sm font-semibold text-blue-800"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 italic">
                      ({t.targetMeaning} {rq.translationTh})
                    </span>
                  </div>

                  <div className="pt-1 text-sm">
                    <span className="font-bold text-slate-700">{t.answerPrompt} </span>
                    {isTeacher ? (
                      <span className="text-red-600 font-bold">
                        {rq.correctSentence}{' '}
                        <span className="text-xs text-slate-500 font-normal italic">({rq.pinyin})</span>
                      </span>
                    ) : (
                      <span className="border-b border-slate-400 inline-block w-full max-w-lg mt-1 h-5"></span>
                    )}
                  </div>

                  {isTeacher && (
                    <div className="text-xs text-red-700 bg-red-50 p-1.5 rounded">
                      <span className="font-bold">{t.structureLabel}</span> {rq.explanationTh}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: TRANSLATION */}
        {config.includeTranslation && transQuestions.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-2 border-b-2 border-blue-800 pb-2">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                  4
                </span>
                {t.part4Title}
              </h3>
              <span className="text-xs text-slate-500 font-medium">{transQuestions.length} ข้อ</span>
            </div>
            <p className="text-xs text-slate-500 italic mb-4">
              {t.part4Desc}
            </p>

            <div className="space-y-4">
              {transQuestions.map((tq, idx) => (
                <div key={tq.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <span>{idx + 1}. {t.thaiPrompt}</span>
                    <span className="text-blue-950">"{tq.thaiSentence}"</span>
                    <span className="text-xs font-normal text-slate-500">[{t.hintPrefix} {tq.hint}]</span>
                  </div>

                  <div className="pt-1 text-sm">
                    <span className="font-bold text-slate-700">{t.chineseAnswerPrompt} </span>
                    {isTeacher ? (
                      <span className="text-red-600 font-bold">
                        {tq.chineseAnswer}{' '}
                        <span className="text-xs text-slate-500 font-normal italic">({tq.pinyin})</span>
                      </span>
                    ) : (
                      <span className="border-b border-slate-400 inline-block w-full max-w-lg mt-1 h-5"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: ANSWER KEY IN FOOTER (when not in teacher mode and requested) */}
        {config.includeAnswerKey && !isTeacher && (
          <section className="mt-8 pt-6 border-t-2 border-dashed border-slate-300">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t.appendixAnswerKey}
            </h4>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg space-y-1 font-mono">
              {config.includeMultipleChoice && (
                <p>
                  <span className="font-bold text-slate-800">ตอนที่ 1 (เลือกตอบ):</span>{' '}
                  {mcQuestions.map((q, i) => `${i + 1}.${['A', 'B', 'C', 'D'][q.correctAnswerIndex]}`).join('  |  ')}
                </p>
              )}
              {config.includeFillInBlanks && (
                <p>
                  <span className="font-bold text-slate-800">ตอนที่ 2 (เติมคำ):</span>{' '}
                  {fillQuestions.map((f, i) => `${i + 1}.${f.correctWord}`).join('  |  ')}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Paper Footer */}
        <div className="text-center pt-8 text-xs text-slate-400 border-t border-slate-100 mt-8">
          {t.footerEncouragement}
        </div>
      </div>
    </div>
  );
};
