import React, { useState } from 'react';
import {
  Search,
  Volume2,
  Check,
  Plus,
  BookOpen,
} from 'lucide-react';
import { GrammarPoint } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface GrammarHandbookProps {
  grammarPoints: GrammarPoint[];
  selectedIds: number[];
  onToggleGrammarPoint: (id: number) => void;
}

export const GrammarHandbook: React.FC<GrammarHandbookProps> = ({
  grammarPoints,
  selectedIds,
  onToggleGrammarPoint,
}) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'questions', label: t.catQuestions },
    { id: 'negation', label: t.catNegation },
    { id: 'verbs_prepositions', label: t.catVerbs },
    { id: 'modals_adjectives', label: t.catModals },
    { id: 'time', label: t.catTime },
  ];

  const filteredPoints = grammarPoints.filter((gp) => {
    const matchCat = selectedCategory === 'all' || gp.category === selectedCategory;
    const search = searchTerm.toLowerCase();
    const matchSearch =
      !searchTerm ||
      gp.titleTh.toLowerCase().includes(search) ||
      gp.titleZh.toLowerCase().includes(search) ||
      gp.structure.toLowerCase().includes(search) ||
      gp.explanationTh.toLowerCase().includes(search) ||
      gp.examples.some(
        (e) =>
          e.hanzi.toLowerCase().includes(search) ||
          e.pinyin.toLowerCase().includes(search) ||
          e.translationTh.toLowerCase().includes(search),
      );
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {t.handbookTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.handbookSubtitle}
            </p>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl flex items-center gap-2">
            <span>{t.selectedInWorksheet}</span>
            <span className="font-bold text-blue-700 text-sm">
              {selectedIds.length} / {grammarPoints.length}
            </span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Grammar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPoints.map((gp) => {
          const isSelected = selectedIds.includes(gp.id);

          return (
            <div
              key={gp.id}
              className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                isSelected
                  ? 'border-teal-300 shadow-xs ring-1 ring-teal-500/10'
                  : 'border-slate-200 opacity-90'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                      {gp.id}
                    </span>
                    <h3 className="font-bold text-base text-slate-900">{gp.titleTh}</h3>
                  </div>

                  <button
                    onClick={() => onToggleGrammarPoint(gp.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span>{t.selectedBadge}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.selectBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-400 font-medium mb-3">{gp.titleZh}</p>

                {/* Structure Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3">
                  <div className="text-[11px] font-bold text-teal-800 uppercase tracking-wider mb-1">
                    {t.structureLabel} (Sentence Pattern):
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-800">
                    {gp.structure}
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {gp.explanationTh}
                </p>

                {/* Examples */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    ตัวอย่างประโยค (Examples):
                  </div>
                  {gp.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/70 border border-slate-100 p-2.5 rounded-xl flex items-start gap-2.5"
                    >
                      <button
                        onClick={() => playAudio(ex.hanzi)}
                        className="text-slate-400 hover:text-teal-600 p-1 cursor-pointer shrink-0 mt-0.5"
                        title="ฟังเสียงอ่าน / 朗讀"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div className="text-xs">
                        <div className="font-bold text-sm text-slate-900 mb-0.5">{ex.hanzi}</div>
                        <div className="text-slate-500 font-mono italic">{ex.pinyin}</div>
                        <div className="text-slate-700 mt-0.5">แปล: {ex.translationTh}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                <span className="font-medium">{t.keyWordsLabel}</span>
                {gp.keyParticles.map((kp, kIdx) => (
                  <span
                    key={kIdx}
                    className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono text-[11px]"
                  >
                    {kp}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
