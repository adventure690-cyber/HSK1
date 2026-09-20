import React from 'react';
import { X, Sliders, FileText } from 'lucide-react';
import { WorksheetConfig, GrammarPoint } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WorksheetConfig;
  onChangeConfig: (newConfig: WorksheetConfig) => void;
  grammarPoints: GrammarPoint[];
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  grammarPoints,
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const handleToggleGrammar = (id: number) => {
    const exists = config.selectedGrammarPointIds.includes(id);
    const updated = exists
      ? config.selectedGrammarPointIds.filter((item) => item !== id)
      : [...config.selectedGrammarPointIds, id].sort((a, b) => a - b);
    onChangeConfig({ ...config, selectedGrammarPointIds: updated });
  };

  const handleSelectPreset = (type: 'all' | '1-10' | '11-20' | '21-25' | 'questions' | 'negation') => {
    let ids: number[] = [];
    if (type === 'all') {
      ids = grammarPoints.map((g) => g.id);
    } else if (type === '1-10') {
      ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    } else if (type === '11-20') {
      ids = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    } else if (type === '21-25') {
      ids = [21, 22, 23, 24, 25];
    } else if (type === 'questions') {
      ids = [2, 6, 7, 8, 9, 19, 21, 23, 24];
    } else if (type === 'negation') {
      ids = [3, 4, 16, 21];
    }
    onChangeConfig({ ...config, selectedGrammarPointIds: ids });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-700" />
            <h3 className="text-lg font-bold text-slate-900">{t.settingsTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Document Header Text Fields */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{t.headerInfoTitle}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.titleInputLabel}
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => onChangeConfig({ ...config, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.subtitleInputLabel}
                </label>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => onChangeConfig({ ...config, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.schoolInputLabel}
                </label>
                <input
                  type="text"
                  value={config.schoolName}
                  onChange={(e) => onChangeConfig({ ...config, schoolName: e.target.value })}
                  placeholder="เช่น โรงเรียน... / School..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.classInputLabel}
                </label>
                <input
                  type="text"
                  value={config.className}
                  onChange={(e) => onChangeConfig({ ...config, className: e.target.value })}
                  placeholder="เช่น ม.4/1, HSK 1 Grade"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Included Sections */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 mb-3">
              {t.sectionsTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeGrammarNotes}
                  onChange={(e) => onChangeConfig({ ...config, includeGrammarNotes: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-800">
                  {t.secGrammarNotes}
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeMultipleChoice}
                  onChange={(e) => onChangeConfig({ ...config, includeMultipleChoice: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-800">
                  {t.secMc}
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeFillInBlanks}
                  onChange={(e) => onChangeConfig({ ...config, includeFillInBlanks: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-800">
                  {t.secFill}
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeSentenceReordering}
                  onChange={(e) => onChangeConfig({ ...config, includeSentenceReordering: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-800">
                  {t.secReorder}
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeTranslation}
                  onChange={(e) => onChangeConfig({ ...config, includeTranslation: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-800">
                  {t.secTrans}
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeAnswerKey}
                  onChange={(e) => onChangeConfig({ ...config, includeAnswerKey: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-medium text-slate-800">
                  {t.secAnswerKey}
                </span>
              </label>
            </div>
          </div>

          {/* Grammar Point Checklist */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h4 className="font-bold text-slate-900">
                  {t.grammarSelectionTitle} ({t.selectedPointsCount} {config.selectedGrammarPointIds.length} / {grammarPoints.length})
                </h4>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleSelectPreset('all')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer"
                >
                  {t.selectAllPreset}
                </button>
                <button
                  onClick={() => handleSelectPreset('1-10')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer"
                >
                  1-10
                </button>
                <button
                  onClick={() => handleSelectPreset('11-20')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer"
                >
                  11-20
                </button>
                <button
                  onClick={() => handleSelectPreset('21-25')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer"
                >
                  21-25
                </button>
                <button
                  onClick={() => handleSelectPreset('questions')}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded cursor-pointer font-medium"
                >
                  {t.questionsPreset}
                </button>
                <button
                  onClick={() => handleSelectPreset('negation')}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded cursor-pointer font-medium"
                >
                  {t.negationPreset}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50/50">
              {grammarPoints.map((gp) => {
                const isChecked = config.selectedGrammarPointIds.includes(gp.id);
                return (
                  <label
                    key={gp.id}
                    onClick={() => handleToggleGrammar(gp.id)}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-white border-blue-300 text-slate-900 font-medium shadow-2xs'
                        : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-bold text-blue-700 w-5">{gp.id}.</span>
                    <span className="truncate">{gp.titleTh}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
          >
            {t.applySettingsBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
