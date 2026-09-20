import { useState } from 'react';
import { Header } from './components/Header';
import { WorksheetPreview } from './components/WorksheetPreview';
import { InteractivePractice } from './components/InteractivePractice';
import { GrammarHandbook } from './components/GrammarHandbook';
import { ConfigModal } from './components/ConfigModal';
import { AIExtendModal } from './components/AIExtendModal';
import {
  HSK1_GRAMMAR_POINTS,
  MULTIPLE_CHOICE_QUESTIONS,
  FILL_IN_BLANK_QUESTIONS,
  REORDER_QUESTIONS,
  TRANSLATION_QUESTIONS,
} from './data/hsk1GrammarData';
import { WorksheetConfig, MultipleChoiceQuestion } from './types';
import { generateWordWorksheet } from './utils/docxGenerator';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'preview' | 'practice' | 'handbook'>('preview');

  const [config, setConfig] = useState<WorksheetConfig>({
    title: 'รวมไวยากรณ์ HSK 1 (ระดับพื้นฐาน) & ใบงานแบบฝึกหัด',
    subtitle: 'HSK 1 Chinese Grammar Worksheet & Revision Test',
    schoolName: '',
    className: '',
    teacherName: '',
    studentNamePrompt: 'ชื่อ-นามสกุล / Name',
    selectedGrammarPointIds: HSK1_GRAMMAR_POINTS.map((g) => g.id), // All 25 selected by default
    includeGrammarNotes: true,
    includeMultipleChoice: true,
    includeFillInBlanks: true,
    includeSentenceReordering: true,
    includeTranslation: true,
    includeAnswerKey: true,
    languageMode: 'th_zh',
  });

  const [mcQuestions, setMcQuestions] = useState<MultipleChoiceQuestion[]>(MULTIPLE_CHOICE_QUESTIONS);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Filtered by selected grammar points
  const activeGrammarPoints = HSK1_GRAMMAR_POINTS.filter((gp) =>
    config.selectedGrammarPointIds.includes(gp.id),
  );

  const activeMcQuestions = mcQuestions.filter((q) =>
    config.selectedGrammarPointIds.includes(q.grammarPointId),
  );

  const activeFillQuestions = FILL_IN_BLANK_QUESTIONS.filter((q) =>
    config.selectedGrammarPointIds.includes(q.grammarPointId),
  );

  const activeReorderQuestions = REORDER_QUESTIONS.filter((q) =>
    config.selectedGrammarPointIds.includes(q.grammarPointId),
  );

  const activeTransQuestions = TRANSLATION_QUESTIONS.filter((q) =>
    config.selectedGrammarPointIds.includes(q.grammarPointId),
  );

  const handleToggleGrammarPoint = (id: number) => {
    setConfig((prev) => {
      const exists = prev.selectedGrammarPointIds.includes(id);
      return {
        ...prev,
        selectedGrammarPointIds: exists
          ? prev.selectedGrammarPointIds.filter((item) => item !== id)
          : [...prev.selectedGrammarPointIds, id].sort((a, b) => a - b),
      };
    });
  };

  const handleAddAIQuestions = (newQuestions: MultipleChoiceQuestion[]) => {
    setMcQuestions((prev) => [...prev, ...newQuestions]);
  };

  const handleDownloadDocx = async (mode: 'student' | 'teacher' | 'grammar_only') => {
    setIsDownloading(true);
    try {
      await generateWordWorksheet({
        config,
        grammarPoints: activeGrammarPoints,
        mcQuestions: activeMcQuestions,
        fillQuestions: activeFillQuestions,
        reorderQuestions: activeReorderQuestions,
        transQuestions: activeTransQuestions,
        mode,
      });

      const modeLabels = language === 'th'
        ? {
            student: 'ไฟล์ Word ฉบับนักเรียน (.docx)',
            teacher: 'ไฟล์ Word ฉบับครูผู้สอนพร้อมเฉลย (.docx)',
            grammar_only: 'ไฟล์ Word สรุป 25 ไวยากรณ์ (.docx)',
          }
        : {
            student: '學生練習版 Word 檔 (.docx)',
            teacher: '教師解答版 Word 檔 (.docx)',
            grammar_only: '25 項語法速查表 (.docx)',
          };

      setDownloadSuccessToast(
        language === 'th'
          ? `ดาวน์โหลด ${modeLabels[mode]} สำเร็จเรียบร้อยแล้ว!`
          : `成功產出並下載 ${modeLabels[mode]}！`
      );
      setTimeout(() => setDownloadSuccessToast(null), 4000);
    } catch (err: any) {
      console.error('Word export error:', err);
      alert(language === 'th' ? 'เกิดข้อผิดพลาดในการสร้างไฟล์ Word: ' + err.message : '匯出 Word 檔時發生錯誤: ' + err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-xs sm:text-sm font-medium">{downloadSuccessToast}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        config={config}
        onOpenConfig={() => setIsConfigOpen(true)}
        onOpenAIModal={() => setIsAIOpen(true)}
        onDownloadDocx={handleDownloadDocx}
        isDownloading={isDownloading}
        totalGrammarSelected={config.selectedGrammarPointIds.length}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activeTab === 'preview' && (
          <WorksheetPreview
            config={config}
            grammarPoints={activeGrammarPoints}
            mcQuestions={activeMcQuestions}
            fillQuestions={activeFillQuestions}
            reorderQuestions={activeReorderQuestions}
            transQuestions={activeTransQuestions}
            onDownloadDocx={handleDownloadDocx}
            isDownloading={isDownloading}
          />
        )}

        {activeTab === 'practice' && (
          <InteractivePractice
            mcQuestions={activeMcQuestions}
            fillQuestions={activeFillQuestions}
            reorderQuestions={activeReorderQuestions}
            grammarPoints={activeGrammarPoints}
          />
        )}

        {activeTab === 'handbook' && (
          <GrammarHandbook
            grammarPoints={HSK1_GRAMMAR_POINTS}
            selectedIds={config.selectedGrammarPointIds}
            onToggleGrammarPoint={handleToggleGrammarPoint}
          />
        )}
      </main>

      {/* Settings Modal */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        grammarPoints={HSK1_GRAMMAR_POINTS}
      />

      {/* AI Generate Extra Questions Modal */}
      <AIExtendModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        grammarPoints={HSK1_GRAMMAR_POINTS}
        onAddQuestions={handleAddAIQuestions}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
