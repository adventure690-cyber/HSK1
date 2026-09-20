import React, { useState } from 'react';
import { Sparkles, X, Loader2, Plus, Check } from 'lucide-react';
import { GrammarPoint, MultipleChoiceQuestion } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AIExtendModalProps {
  isOpen: boolean;
  onClose: () => void;
  grammarPoints: GrammarPoint[];
  onAddQuestions: (newQuestions: MultipleChoiceQuestion[]) => void;
}

export const AIExtendModal: React.FC<AIExtendModalProps> = ({
  isOpen,
  onClose,
  grammarPoints,
  onAddQuestions,
}) => {
  const { t } = useLanguage();
  const [selectedGrammarId, setSelectedGrammarId] = useState<number>(1);
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<MultipleChoiceQuestion[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setIsAdded(false);
    try {
      const selectedGp = grammarPoints.find((g) => g.id === selectedGrammarId);
      const res = await fetch('/api/generate-ai-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grammarPointTitle: `${selectedGp?.titleTh} (${selectedGp?.structure})`,
          count: questionCount,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'AI 伺服器回應錯誤');
      }

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        const formatted: MultipleChoiceQuestion[] = data.questions.map((q: any, idx: number) => ({
          id: Date.now() + idx,
          grammarPointId: selectedGrammarId,
          question: q.question,
          pinyin: q.pinyin || '',
          options: q.options || [],
          correctAnswerIndex: q.correctAnswerIndex ?? 0,
          explanationTh: q.explanationTh || '',
          explanationZh: q.explanationZh || '',
        }));
        setGeneratedQuestions(formatted);
      } else {
        throw new Error('AI 回傳格式不符');
      }
    } catch (err: any) {
      setError(err.message || '生成失敗，請確認 API Key 或稍後重試');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedQuestions.length > 0) {
      onAddQuestions(generatedQuestions);
      setIsAdded(true);
      setTimeout(() => {
        onClose();
        setIsAdded(false);
        setGeneratedQuestions([]);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">{t.aiModalTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.aiModalDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.selectGrammarTarget}
              </label>
              <select
                value={selectedGrammarId}
                onChange={(e) => setSelectedGrammarId(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {grammarPoints.map((gp) => (
                  <option key={gp.id} value={gp.id}>
                    {gp.id}. {gp.titleTh}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.questionCountLabel}
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value={2}>2 ข้อ (Items)</option>
                <option value={3}>3 ข้อ (Items)</option>
                <option value={5}>5 ข้อ (Items)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.generatingAIMsg}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.generateAIBtn}</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Preview of generated questions */}
          {generatedQuestions.length > 0 && (
            <div className="space-y-3 pt-2">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                {t.aiPreviewTitle} ({generatedQuestions.length}):
              </h5>
              {generatedQuestions.map((q, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-semibold text-xs text-slate-900">
                    {i + 1}. {q.question}
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-1 rounded ${
                          oIdx === q.correctAnswerIndex ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                        }`}
                      >
                        {['A', 'B', 'C', 'D'][oIdx]}. {opt}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    คำอธิบาย: {q.explanationTh}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            {t.closeBtn}
          </button>
          <button
            onClick={handleApply}
            disabled={generatedQuestions.length === 0 || isAdded}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.addedSuccess}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addQuestionsToWorksheet}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
