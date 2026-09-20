import React, { useState } from 'react';
import {
  FileDown,
  Printer,
  Settings,
  Sparkles,
  BookOpen,
  Eye,
  CheckCircle,
  Download,
  FileText,
  Languages,
} from 'lucide-react';
import { WorksheetConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeTab: 'preview' | 'practice' | 'handbook';
  setActiveTab: (tab: 'preview' | 'practice' | 'handbook') => void;
  config: WorksheetConfig;
  onOpenConfig: () => void;
  onOpenAIModal: () => void;
  onDownloadDocx: (mode: 'student' | 'teacher' | 'grammar_only') => void;
  isDownloading: boolean;
  totalGrammarSelected: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  config,
  onOpenConfig,
  onOpenAIModal,
  onDownloadDocx,
  isDownloading,
  totalGrammarSelected,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3.5 gap-3">
          {/* App Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  {t.appName}
                </h1>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
                  {t.appBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action Buttons & Language Switcher */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Language Switcher Button */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setLanguage('th')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  language === 'th'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="เปลี่ยนเป็นภาษาไทย (Thai)"
              >
                <span className="text-sm">🇹🇭</span>
                <span>ไทย</span>
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  language === 'zh'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="切換為繁體中文 (Chinese)"
              >
                <span className="text-sm">🇹🇼</span>
                <span>中文</span>
              </button>
            </div>

            {/* Download Dropdown */}
            <div className="relative">
              <button
                id="download-word-btn"
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? t.downloadingWord : t.downloadWordBtn}</span>
              </button>

              {downloadMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDownloadMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-1.5 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {t.downloadOptionsTitle}
                      </p>
                    </div>

                    <button
                      id="download-student-docx"
                      onClick={() => {
                        onDownloadDocx('student');
                        setDownloadMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50 flex items-start gap-3 transition-colors cursor-pointer"
                    >
                      <FileDown className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {t.studentVersion}
                        </p>
                        <p className="text-xs text-slate-500">
                          {t.studentVersionDesc}
                        </p>
                      </div>
                    </button>

                    <button
                      id="download-teacher-docx"
                      onClick={() => {
                        onDownloadDocx('teacher');
                        setDownloadMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-amber-50 flex items-start gap-3 transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {t.teacherVersion}
                        </p>
                        <p className="text-xs text-slate-500">
                          {t.teacherVersionDesc}
                        </p>
                      </div>
                    </button>

                    <button
                      id="download-cheatsheet-docx"
                      onClick={() => {
                        onDownloadDocx('grammar_only');
                        setDownloadMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50 flex items-start gap-3 transition-colors cursor-pointer"
                    >
                      <FileText className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {t.cheatsheetVersion}
                        </p>
                        <p className="text-xs text-slate-500">
                          {t.cheatsheetVersionDesc}
                        </p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Print button */}
            <button
              id="print-worksheet-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{t.printPdfBtn}</span>
            </button>

            {/* Config button */}
            <button
              id="open-config-btn"
              onClick={onOpenConfig}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>{t.customWorksheetBtn}</span>
              <span className="bg-slate-200 text-slate-700 text-xs px-1.5 py-0.2 rounded-full">
                {totalGrammarSelected}/25
              </span>
            </button>

            {/* AI Generate button */}
            <button
              id="open-ai-generator-btn"
              onClick={onOpenAIModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-indigo-200"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">{t.aiGeneratorBtn}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-slate-100 -mb-px space-x-6 text-sm font-medium overflow-x-auto">
          <button
            id="tab-preview"
            onClick={() => setActiveTab('preview')}
            className={`py-2.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{t.tabPreview}</span>
          </button>

          <button
            id="tab-practice"
            onClick={() => setActiveTab('practice')}
            className={`py-2.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'practice'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{t.tabPractice}</span>
          </button>

          <button
            id="tab-handbook"
            onClick={() => setActiveTab('handbook')}
            className={`py-2.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'handbook'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.tabHandbook}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
