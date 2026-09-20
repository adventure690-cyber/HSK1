export type Language = 'th' | 'zh';

export interface TranslationDict {
  appName: string;
  appBadge: string;
  appSubtitle: string;
  downloadWordBtn: string;
  downloadingWord: string;
  downloadOptionsTitle: string;
  studentVersion: string;
  studentVersionDesc: string;
  teacherVersion: string;
  teacherVersionDesc: string;
  cheatsheetVersion: string;
  cheatsheetVersionDesc: string;
  printPdfBtn: string;
  customWorksheetBtn: string;
  aiGeneratorBtn: string;
  
  // Tabs
  tabPreview: string;
  tabPractice: string;
  tabHandbook: string;
  
  // Preview
  previewModeLabel: string;
  studentModeBtn: string;
  teacherModeBtn: string;
  quickDownloadBtn: string;
  teacherKeyBadge: string;
  studentNameLabel: string;
  classLabel: string;
  noLabel: string;
  dateLabel: string;
  teacherLabel: string;
  scoreLabel: string;
  outOf100: string;
  
  // Section Headers
  grammarSummaryTitle: string;
  grammarSummarySub: string;
  thColNo: string;
  thColGrammar: string;
  thColExplanation: string;
  structureLabel: string;
  explanationLabel: string;
  
  part1Title: string;
  part1Desc: string;
  part1Points: string;
  correctAnswerBadge: string;
  explanationAndReason: string;
  
  part2Title: string;
  part2Desc: string;
  wordBankTitle: string;
  grammarReason: string;
  
  part3Title: string;
  part3Desc: string;
  givenWords: string;
  targetMeaning: string;
  answerPrompt: string;
  
  part4Title: string;
  part4Desc: string;
  thaiPrompt: string;
  chineseAnswerPrompt: string;
  hintPrefix: string;
  
  appendixAnswerKey: string;
  footerEncouragement: string;

  // Interactive Quiz
  quizTitle: string;
  quizSubtitle: string;
  mcModeBtn: string;
  fillModeBtn: string;
  reorderModeBtn: string;
  progressLabel: string;
  scoreSummaryLabel: string;
  retryQuizBtn: string;
  listenAudio: string;
  checkAnswerBtn: string;
  nextQuestionBtn: string;
  clearSelectionBtn: string;
  correctToast: string;
  incorrectToast: string;
  congratsTitle: string;
  congratsScore: string;
  wordBankPrompt: string;
  reorderPrompt: string;
  reorderEmptyNotice: string;
  availableWordsPool: string;

  // Handbook
  handbookTitle: string;
  handbookSubtitle: string;
  selectedInWorksheet: string;
  searchPlaceholder: string;
  catAll: string;
  catQuestions: string;
  catNegation: string;
  catVerbs: string;
  catModals: string;
  catTime: string;
  selectedBadge: string;
  selectBtn: string;
  keyWordsLabel: string;

  // Settings Modal
  settingsTitle: string;
  headerInfoTitle: string;
  titleInputLabel: string;
  subtitleInputLabel: string;
  schoolInputLabel: string;
  classInputLabel: string;
  sectionsTitle: string;
  secGrammarNotes: string;
  secMc: string;
  secFill: string;
  secReorder: string;
  secTrans: string;
  secAnswerKey: string;
  grammarSelectionTitle: string;
  selectedPointsCount: string;
  selectAllPreset: string;
  questionsPreset: string;
  negationPreset: string;
  applySettingsBtn: string;

  // AI Modal
  aiModalTitle: string;
  aiModalDesc: string;
  selectGrammarTarget: string;
  questionCountLabel: string;
  generateAIBtn: string;
  generatingAIMsg: string;
  aiPreviewTitle: string;
  addQuestionsToWorksheet: string;
  addedSuccess: string;
  closeBtn: string;

  // Toast
  downloadSuccess: string;
}

export const translations: Record<Language, TranslationDict> = {
  th: {
    appName: 'ระบบสร้างใบงานไวยากรณ์ HSK 1',
    appBadge: 'ไฟล์ Word (.docx)',
    appSubtitle: 'รวมไวยากรณ์ HSK 1 ระดับพื้นฐาน 25 ข้อ พร้อมแบบฝึกหัด & เฉลย',
    downloadWordBtn: 'ดาวน์โหลดไฟล์ Word (.docx)',
    downloadingWord: 'กำลังสร้างไฟล์ Word...',
    downloadOptionsTitle: 'เลือกรูปแบบไฟล์ Word ที่ต้องการ',
    studentVersion: 'ฉบับนักเรียนสำหรับทำแบบฝึกหัด (.docx)',
    studentVersionDesc: 'มีช่องกรอกชื่อ ชั้น เลขที่ ข้อสอบเว้นว่าง พร้อมพิมพ์แจก',
    teacherVersion: 'ฉบับเฉลยและคำอธิบายสำหรับครู (.docx)',
    teacherVersionDesc: 'ระบุเฉลยตัวสีแดง พร้อมคำอธิบายหลักไวยากรณ์อย่างละเอียด',
    cheatsheetVersion: 'เอกสารสรุป 25 ไวยากรณ์ฉบับย่อ (.docx)',
    cheatsheetVersionDesc: 'ตารางสรุปโครงสร้าง ตัวอย่างประโยค และคำแปลภาษาไทย',
    printPdfBtn: 'พิมพ์ / บันทึก PDF',
    customWorksheetBtn: 'ปรับแต่งใบงาน',
    aiGeneratorBtn: 'AI ช่วยออกข้อสอบ',

    tabPreview: 'ดูตัวอย่างใบงาน (Worksheet Preview)',
    tabPractice: 'แบบฝึกหัดออนไลน์ (Online Quiz)',
    tabHandbook: 'คู่มือ 25 ไวยากรณ์ (Grammar Guide)',

    previewModeLabel: 'สลับมุมมองตัวอย่าง:',
    studentModeBtn: 'มุมมองนักเรียน (เว้นว่างคำตอบ)',
    teacherModeBtn: 'มุมมองครูผู้สอน (แสดงเฉลยและคำอธิบาย)',
    quickDownloadBtn: 'ดาวน์โหลด Word หน้านี้',
    teacherKeyBadge: '[ฉบับเฉลยสำหรับครู / Teacher\'s Answer Key]',
    studentNameLabel: 'ชื่อ-นามสกุล (Name)',
    classLabel: 'ชั้น / ห้อง (Class)',
    noLabel: 'เลขที่ (No.)',
    dateLabel: 'วันที่ (Date)',
    teacherLabel: 'ครูผู้สอน (Teacher)',
    scoreLabel: 'คะแนนที่ได้ (Score)',
    outOf100: '/ 100',

    grammarSummaryTitle: 'สรุป 25 ไวยากรณ์ HSK 1 (ระดับพื้นฐาน)',
    grammarSummarySub: 'HSK 1 Grammar Guide',
    thColNo: 'ข้อ',
    thColGrammar: 'หัวข้อไวยากรณ์ & โครงสร้าง',
    thColExplanation: 'คำอธิบาย & ตัวอย่างประโยค (พร้อมพินอินและคำแปล)',
    structureLabel: 'โครงสร้าง:',
    explanationLabel: 'คำอธิบาย:',

    part1Title: 'ตอนที่ 1: แบบฝึกหัดเลือกคำตอบที่ถูกต้อง (Multiple Choice)',
    part1Desc: 'คำชี้แจง: จงเลือกคำตอบที่ถูกต้องที่สุดเพียงข้อเดียว แล้วเขียนตัวอักษรลงในช่องว่างด้านหน้า',
    part1Points: 'ข้อ (ข้อละ 2 คะแนน)',
    correctAnswerBadge: 'คำตอบที่ถูกต้อง',
    explanationAndReason: 'เฉลย & คำอธิบาย:',

    part2Title: 'ตอนที่ 2: แบบฝึกหัดเติมคำในช่องว่าง (Fill in the Blanks)',
    part2Desc: 'คำชี้แจง: นำคำศัพท์จากกล่องคำศัพท์ด้านล่างไปเติมลงในช่องว่างให้เป็นประโยคที่ถูกต้องสมบูรณ์',
    wordBankTitle: '【 กล่องคำศัพท์ / 词语库 】',
    grammarReason: 'หลักไวยากรณ์:',

    part3Title: 'ตอนที่ 3: แบบฝึกหัดเรียงคำเป็นประโยค (Sentence Reordering)',
    part3Desc: 'คำชี้แจง: นำคำที่กำหนดให้มาเรียงลำดับให้เป็นประโยคตามหลักไวยากรณ์ภาษาจีนที่ถูกต้อง',
    givenWords: 'คำที่กำหนด:',
    targetMeaning: 'ความหมาย:',
    answerPrompt: 'ตอบ:',

    part4Title: 'ตอนที่ 4: แบบฝึกหัดแปลประโยค (Translation Practice)',
    part4Desc: 'คำชี้แจง: จงแปลประโยคภาษาไทยต่อไปนี้ให้เป็นภาษาจีนให้ถูกต้องตามหลักไวยากรณ์',
    thaiPrompt: 'ภาษาไทย:',
    chineseAnswerPrompt: 'ภาษาจีน (เขียนตัวอักษรจีน/พินอิน):',
    hintPrefix: 'คำใบ้:',

    appendixAnswerKey: 'ภาคผนวก: เฉลยคำตอบย่อ (Answer Key)',
    footerEncouragement: '祝你学习进步！ • ขอให้มีความก้าวหน้าในการเรียนภาษาจีน • HSK 1 Grammar Worksheet',

    quizTitle: 'คลังแบบฝึกหัดทดสอบไวยากรณ์ HSK 1 แบบโต้ตอบ',
    quizSubtitle: 'ฝึกทำแบบฝึกหัด 25 ไวยากรณ์ ฟังเสียงอ่านภาษาจีน พร้อมตรวจคำตอบและคำอธิบายทันที',
    mcModeBtn: 'เลือกตอบ',
    fillModeBtn: 'เติมคำในช่องว่าง',
    reorderModeBtn: 'เรียงประโยค',
    progressLabel: 'ความคืบหน้า: ข้อที่',
    scoreSummaryLabel: 'คะแนน: ตอบถูก',
    retryQuizBtn: 'เริ่มทำใหม่',
    listenAudio: 'ฟังเสียงอ่าน',
    checkAnswerBtn: 'ตรวจคำตอบ',
    nextQuestionBtn: 'ข้อถัดไป',
    clearSelectionBtn: 'ล้างคำตอบที่เลือก',
    correctToast: 'ถูกต้องแล้ว! (Correct)',
    incorrectToast: 'ยังไม่ถูกต้อง (Incorrect)',
    congratsTitle: 'ยินดีด้วย! คุณทำแบบทดสอบชุดนี้เสร็จสิ้นแล้ว',
    congratsScore: 'คุณตอบถูกทั้งหมด',
    wordBankPrompt: 'คลิกเลือกคำศัพท์เพื่อนำไปเติมในช่องว่าง (Word Bank):',
    reorderPrompt: 'คลิกเลือกคำตามลำดับเพื่อเรียงเป็นประโยคที่ถูกต้อง:',
    reorderEmptyNotice: '(คลิกคำศัพท์ด้านล่างเพื่อเรียงประโยคที่นี่...)',
    availableWordsPool: 'คลังคำศัพท์ (คลิกเพื่อเพิ่ม):',

    handbookTitle: 'คู่มือรวม 25 ไวยากรณ์ภาษาจีนพื้นฐาน HSK 1',
    handbookSubtitle: 'รวบรวมโครงสร้างไวยากรณ์ คำอธิบายภาษาไทย ตัวอย่างประโยคพร้อมพินอินและเสียงอ่าน',
    selectedInWorksheet: 'เลือกใส่ในใบงานแล้ว:',
    searchPlaceholder: 'ค้นหาไวยากรณ์ (เช่น 吗, 不, 没, 在, 多少, S+V+O, คำถาม, เวลา)...',
    catAll: 'ทั้งหมด 25 ข้อ (All)',
    catQuestions: 'ประโยคคำถาม (Questions)',
    catNegation: 'การปฏิเสธ (Negation 不/没)',
    catVerbs: 'กริยาและบุพบท (是/在/有/的)',
    catModals: 'คำช่วยกริยา & คุณศัพท์ (会/能/想/太...了)',
    catTime: 'เวลา & ตำแหน่ง (Time)',
    selectedBadge: 'เลือกแล้ว',
    selectBtn: 'เลือก',
    keyWordsLabel: 'คำสำคัญ:',

    settingsTitle: 'ตั้งค่าใบงานและการส่งออกไฟล์ Word',
    headerInfoTitle: 'ข้อมูลหัวกระดาษ (Header Information)',
    titleInputLabel: 'ชื่อหัวเรื่องใบงาน (Worksheet Title)',
    subtitleInputLabel: 'ชื่อเรื่องรอง (Subtitle)',
    schoolInputLabel: 'ชื่อโรงเรียน / สถาบันการศึกษา (School Name)',
    classInputLabel: 'ชั้น / ห้องเรียน (Class / Room)',
    sectionsTitle: 'ส่วนของข้อสอบที่ต้องการรวมในใบงาน',
    secGrammarNotes: '★ ตารางสรุปเนื้อหาไวยากรณ์ (Grammar Summary Table)',
    secMc: '1. ตอนที่ 1 แบบฝึกหัดเลือกตอบ (Multiple Choice)',
    secFill: '2. ตอนที่ 2 แบบฝึกหัดเติมคำในช่องว่าง (Fill in the Blanks)',
    secReorder: '3. ตอนที่ 3 แบบฝึกหัดเรียงคำเป็นประโยค (Sentence Reordering)',
    secTrans: '4. ตอนที่ 4 แบบฝึกหัดแปลประโยค (Translation Practice)',
    secAnswerKey: 'ภาคผนวก: เฉลยคำตอบย่อท้ายแผ่น (Answer Key)',
    grammarSelectionTitle: 'เลือกหัวข้อไวยากรณ์ที่จะนำมาออกสอบ',
    selectedPointsCount: 'เลือกแล้ว',
    selectAllPreset: 'เลือกทั้งหมด (25)',
    questionsPreset: 'ประโยคคำถาม',
    negationPreset: 'ประโยคปฏิเสธ',
    applySettingsBtn: 'บันทึกและนำไปใช้ (Apply Settings)',

    aiModalTitle: 'AI ช่วยออกข้อสอบเพิ่มเติม',
    aiModalDesc: 'ใช้ Google Gemini สร้างแบบฝึกหัดใหม่ที่ตรงตามหลักไวยากรณ์ HSK 1 พร้อมคำอธิบายภาษาไทยสำหรับผู้เรียนไทยโดยเฉพาะ',
    selectGrammarTarget: 'เลือกหัวข้อไวยากรณ์เป้าหมาย',
    questionCountLabel: 'จำนวนข้อที่ต้องการสร้าง',
    generateAIBtn: 'เริ่มสร้างข้อสอบด้วย AI',
    generatingAIMsg: 'Gemini กำลังสร้างข้อสอบเฉพาะให้คุณ...',
    aiPreviewTitle: 'ตัวอย่างข้อสอบที่สร้างขึ้น:',
    addQuestionsToWorksheet: 'เพิ่มข้อสอบเหล่านี้ลงในใบงาน',
    addedSuccess: 'เพิ่มลงในใบงานเรียบร้อยแล้ว!',
    closeBtn: 'ปิด',

    downloadSuccess: 'ดาวน์โหลดไฟล์สำเร็จเรียบร้อยแล้ว!',
  },
  zh: {
    appName: 'HSK 1 語法學習單產生器',
    appBadge: 'Word 檔 (.docx)',
    appSubtitle: '針對 HSK 1 基礎 25 項核心語法與例句，產生可編輯與列印之 Word 學習單',
    downloadWordBtn: '下載 Word 檔 (.docx)',
    downloadingWord: '正在產出 Word 檔...',
    downloadOptionsTitle: '選擇 Word 檔輸出版本',
    studentVersion: '學生練習版 (.docx)',
    studentVersionDesc: '含個人資訊欄、題目與作答區 (適合列印發放)',
    teacherVersion: '教師解答與解析版 (.docx)',
    teacherVersionDesc: '標註正確答案、中文泰語解析與考點說明',
    cheatsheetVersion: '25 項語法速查表 (.docx)',
    cheatsheetVersionDesc: '精簡整理表，包含結構、例句與拼音對照',
    printPdfBtn: '列印 / PDF',
    customWorksheetBtn: '自訂學習單',
    aiGeneratorBtn: 'AI 出題助手',

    tabPreview: '學習單即時預覽 (Worksheet Preview)',
    tabPractice: '線上互動練習測驗 (Online Quiz)',
    tabHandbook: '25 項語法圖解手冊 (Grammar Guide)',

    previewModeLabel: '預覽視圖切換:',
    studentModeBtn: '學生作答模式 (題目空白)',
    teacherModeBtn: '教師解答模式 (標註答案與解析)',
    quickDownloadBtn: '下載當前版 Word',
    teacherKeyBadge: '[ฉบับเฉลยสำหรับครู / Teacher\'s Answer Key]',
    studentNameLabel: '姓名 (Name)',
    classLabel: '班級 (Class)',
    noLabel: '座號 (No.)',
    dateLabel: '日期 (Date)',
    teacherLabel: '教師 (Teacher)',
    scoreLabel: '評分 (Score)',
    outOf100: '/ 100',

    grammarSummaryTitle: '總結 25 項 HSK 1 基礎語法整理表',
    grammarSummarySub: 'HSK 1 Grammar Guide',
    thColNo: '題號',
    thColGrammar: '語法要點與句型結構',
    thColExplanation: '說明與例句 (附拼音與泰文翻譯)',
    structureLabel: '句型結構:',
    explanationLabel: '說明:',

    part1Title: '第一大題：單項選擇題 (Multiple Choice)',
    part1Desc: '作答說明：請選出最正確的一項，並將代號填入題前括弧內。',
    part1Points: '題 (每題 2 分)',
    correctAnswerBadge: '正確解答',
    explanationAndReason: '解答與解析:',

    part2Title: '第二大題：詞庫填空題 (Fill in the Blanks)',
    part2Desc: '作答說明：請從詞語庫中挑選合適的詞填入空格中，使句子完整正確。',
    wordBankTitle: '【 詞語庫 / กล่องคำศัพท์ 】',
    grammarReason: '語法原理:',

    part3Title: '第三大題：連詞成句題 (Sentence Reordering)',
    part3Desc: '作答說明：請將給定的詞彙重新組合成符合漢語語法規則的句子。',
    givenWords: '給定詞彙:',
    targetMeaning: '目標句意:',
    answerPrompt: '作答:',

    part4Title: '第四大題：泰譯中翻譯題 (Translation Practice)',
    part4Desc: '作答說明：請將下列泰語句子翻譯成正確的漢語句子。',
    thaiPrompt: '泰語原句:',
    chineseAnswerPrompt: '漢語翻譯 (寫出漢字/拼音):',
    hintPrefix: '提示:',

    appendixAnswerKey: '附錄：簡要參考解答 (Answer Key)',
    footerEncouragement: '祝你学习进步！ • ขอให้มีความก้าวหน้าในการเรียนภาษาจีน • HSK 1 Grammar Worksheet',

    quizTitle: 'HSK 1 語法互動測驗庫',
    quizSubtitle: '針對 25 項基礎句型，提供即時互動答題、發音朗讀與語法解析',
    mcModeBtn: '選擇題',
    fillModeBtn: '填空題',
    reorderModeBtn: '重組句',
    progressLabel: '進度：第',
    scoreSummaryLabel: '得分：答對',
    retryQuizBtn: '重新測驗',
    listenAudio: '朗讀發音',
    checkAnswerBtn: '檢查答案',
    nextQuestionBtn: '下一題',
    clearSelectionBtn: '清空重選',
    correctToast: '回答正確！ (Correct)',
    incorrectToast: '尚未完全正確 (Incorrect)',
    congratsTitle: '恭喜！您已完成本階段所有測驗！',
    congratsScore: '總計答對',
    wordBankPrompt: '點擊選擇填入詞 (Word Bank):',
    reorderPrompt: '請點擊詞彙按正確語序連成句子：',
    reorderEmptyNotice: '(點擊下方詞彙在此連詞成句...)',
    availableWordsPool: '詞彙庫 (點擊加入):',

    handbookTitle: 'HSK 1 基礎中文 25 項核心語法彙整圖鑑',
    handbookSubtitle: '整理自教材內容：包含語法結構、泰語解釋、漢語拼音例句及語音朗讀',
    selectedInWorksheet: '目前學習單已選入:',
    searchPlaceholder: '搜尋語法關鍵字 (例如: 吗, 不, 没, 在, 多少, S+V+O, คำถาม, เวลา)...',
    catAll: '全部 25 項 (All)',
    catQuestions: '疑問句 (Questions)',
    catNegation: '否定句 (Negation 不/没)',
    catVerbs: '動詞與介詞 (是/在/有/的)',
    catModals: '助動詞與形容詞 (会/能/想/太...了)',
    catTime: '時間與位置 (Time)',
    selectedBadge: '已選入',
    selectBtn: '選入',
    keyWordsLabel: '關鍵詞:',

    settingsTitle: '自訂學習單與 Word 匯出設定',
    headerInfoTitle: '卷頭資訊與標題 (Header Information)',
    titleInputLabel: '學習單大標題 (Worksheet Title)',
    subtitleInputLabel: '副標題 (Subtitle)',
    schoolInputLabel: '學校 / 教學機構名稱 (School Name)',
    classInputLabel: '班級 / 組別 (Class / Room)',
    sectionsTitle: '學習單包含大題 (Worksheet Sections)',
    secGrammarNotes: '★ 語法知識整理表 (Grammar Summary Table)',
    secMc: '1. 單項選擇題 (Multiple Choice)',
    secFill: '2. 詞庫填空題 (Fill in the Blanks)',
    secReorder: '3. 連詞成句題 (Sentence Reordering)',
    secTrans: '4. 泰譯中翻譯題 (Translation Practice)',
    secAnswerKey: '附錄: 簡要參考解答 (Answer Key)',
    grammarSelectionTitle: '涵蓋語法條目 (自訂挑選)',
    selectedPointsCount: '已選',
    selectAllPreset: '全選 (25)',
    questionsPreset: '疑問句',
    negationPreset: '否定句',
    applySettingsBtn: '完成設定並套用 (Apply Settings)',

    aiModalTitle: 'AI 智能擴充新題目',
    aiModalDesc: '使用 Google Gemini 針對指定的 HSK 1 語法點，自動生成符合泰語母語學習者的全新題目與考點解析。',
    selectGrammarTarget: '選擇目標語法點',
    questionCountLabel: '產出題目數量',
    generateAIBtn: '立即生成新題',
    generatingAIMsg: 'Gemini 正在構思專屬題目...',
    aiPreviewTitle: '生成的題目預覽:',
    addQuestionsToWorksheet: '將這些題目加入學習單',
    addedSuccess: '已加入學習單!',
    closeBtn: '關閉',

    downloadSuccess: '成功產出並下載 Word 檔！',
  },
};
