import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  ShadingType,
} from 'docx';
import { saveAs } from 'file-saver';
import {
  GrammarPoint,
  MultipleChoiceQuestion,
  FillInBlankQuestion,
  ReorderQuestion,
  TranslationQuestion,
  WorksheetConfig,
} from '../types';

interface DocxExportParams {
  config: WorksheetConfig;
  grammarPoints: GrammarPoint[];
  mcQuestions: MultipleChoiceQuestion[];
  fillQuestions: FillInBlankQuestion[];
  reorderQuestions: ReorderQuestion[];
  transQuestions: TranslationQuestion[];
  mode: 'student' | 'teacher' | 'grammar_only';
}

const PRIMARY_COLOR = '1E3A8A'; // Navy Blue
const ACCENT_COLOR = '0F766E';  // Teal
const MUTED_GRAY = '64748B';    // Slate Gray
const BG_HEADER_GRAY = 'F1F5F9'; // Light Slate
const BG_BOX = 'F8FAFC';

const cellBorder = {
  top: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
  left: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
  right: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
};

export async function generateWordWorksheet(params: DocxExportParams): Promise<void> {
  const { config, grammarPoints, mcQuestions, fillQuestions, reorderQuestions, transQuestions, mode } = params;

  const isTeacher = mode === 'teacher';
  const isGrammarOnly = mode === 'grammar_only';

  const docChildren: (Paragraph | Table)[] = [];

  // ==========================================
  // 1. Header Information Block
  // ==========================================
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120, before: 0 },
      children: [
        new TextRun({
          text: config.title || 'รวมไวยากรณ์ HSK 1 (ระดับพื้นฐาน) & ใบงานแบบฝึกหัด',
          bold: true,
          size: 32, // 16pt
          color: PRIMARY_COLOR,
          font: 'TH Sarabun New, Cordia New, Microsoft YaHei, Arial',
        }),
      ],
    }),
  );

  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: isGrammarOnly
            ? 'HSK 1 Chinese Grammar Reference Guide (25 ข้อครบถ้วน)'
            : isTeacher
            ? `${config.subtitle || 'HSK 1 Grammar Worksheet'} [ฉบับเฉลยสำหรับครูผู้สอน / Teacher's Answer Key]`
            : `${config.subtitle || 'HSK 1 Grammar Worksheet'} [ฉบับนักเรียน / Student Version]`,
          italics: true,
          size: 22,
          color: isTeacher ? 'B91C1C' : MUTED_GRAY,
          font: 'TH Sarabun New, Microsoft YaHei, Arial',
        }),
      ],
    }),
  );

  // Student Info Box Table
  if (!isGrammarOnly) {
    const infoTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 70, type: WidthType.PERCENTAGE },
              borders: cellBorder,
              shading: { type: ShadingType.CLEAR, fill: BG_BOX },
              children: [
                new Paragraph({
                  spacing: { before: 80, after: 60 },
                  children: [
                    new TextRun({ text: 'ชื่อ-นามสกุล (Name): ____________________________   ', bold: true, size: 20 }),
                    new TextRun({ text: 'ชั้น / ห้อง (Class): ____________', bold: true, size: 20 }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 60, after: 80 },
                  children: [
                    new TextRun({ text: 'เลขที่ (No.): _______   ', bold: true, size: 20 }),
                    new TextRun({ text: 'วันที่ (Date): ___________________   ', bold: true, size: 20 }),
                    new TextRun({ text: `โรงเรียน/สถาบัน: ${config.schoolName || '________________'}`, size: 20 }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              borders: cellBorder,
              shading: { type: ShadingType.CLEAR, fill: BG_HEADER_GRAY },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 80, after: 40 },
                  children: [new TextRun({ text: 'คะแนนที่ได้ (Score)', bold: true, size: 20, color: PRIMARY_COLOR })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 40, after: 80 },
                  children: [new TextRun({ text: '_______ / 100', bold: true, size: 28, color: '334155' })],
                }),
              ],
            }),
          ],
        }),
      ],
    });
    docChildren.push(infoTable);
    docChildren.push(new Paragraph({ spacing: { after: 240 } }));
  }

  // ==========================================
  // 2. Part 1: Comprehensive Grammar Guide
  // ==========================================
  if (config.includeGrammarNotes || isGrammarOnly) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: 'สรุป 25 ไวยากรณ์ HSK 1 (ระดับพื้นฐาน) พร้อมตัวอย่างประโยค',
            bold: true,
            size: 26,
            color: ACCENT_COLOR,
          }),
        ],
      }),
    );

    const grammarTableRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            width: { size: 8, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: 'E2E8F0' },
            borders: cellBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'ข้อ', bold: true, size: 20 })] })],
          }),
          new TableCell({
            width: { size: 32, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: 'E2E8F0' },
            borders: cellBorder,
            children: [new Paragraph({ children: [new TextRun({ text: 'หัวข้อไวยากรณ์ & โครงสร้าง', bold: true, size: 20 })] })],
          }),
          new TableCell({
            width: { size: 60, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: 'E2E8F0' },
            borders: cellBorder,
            children: [new Paragraph({ children: [new TextRun({ text: 'คำอธิบาย & ตัวอย่างประโยค (พร้อมพินอิน/คำแปล)', bold: true, size: 20 })] })],
          }),
        ],
      }),
    ];

    grammarPoints.forEach((gp) => {
      const exampleParas: Paragraph[] = [
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({ text: '• คำอธิบาย: ', bold: true, size: 19, color: '334155' }),
            new TextRun({ text: gp.explanationTh, size: 19 }),
          ],
        }),
      ];

      gp.examples.forEach((ex) => {
        exampleParas.push(
          new Paragraph({
            spacing: { before: 20, after: 20 },
            children: [
              new TextRun({ text: `  - ${ex.hanzi} `, bold: true, size: 20, color: PRIMARY_COLOR }),
              new TextRun({ text: `(${ex.pinyin}) : `, italics: true, size: 19, color: '475569' }),
              new TextRun({ text: ex.translationTh, size: 19 }),
            ],
          }),
        );
      });

      grammarTableRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 8, type: WidthType.PERCENTAGE },
              borders: cellBorder,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${gp.id}`, bold: true, size: 20 })] })],
            }),
            new TableCell({
              width: { size: 32, type: WidthType.PERCENTAGE },
              borders: cellBorder,
              children: [
                new Paragraph({ children: [new TextRun({ text: gp.titleTh, bold: true, size: 20, color: PRIMARY_COLOR })] }),
                new Paragraph({
                  spacing: { before: 40 },
                  children: [
                    new TextRun({ text: 'โครงสร้าง: ', bold: true, size: 18, color: '0369A1' }),
                    new TextRun({ text: gp.structure, size: 18, bold: true }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 60, type: WidthType.PERCENTAGE },
              borders: cellBorder,
              children: exampleParas,
            }),
          ],
        }),
      );
    });

    const grammarTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: grammarTableRows,
    });
    docChildren.push(grammarTable);
    docChildren.push(new Paragraph({ spacing: { after: 240 } }));
  }

  // ==========================================
  // 3. Part 2: Multiple Choice Questions
  // ==========================================
  if (!isGrammarOnly && config.includeMultipleChoice && mcQuestions.length > 0) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
        children: [
          new TextRun({
            text: 'ตอนที่ 1: แบบฝึกหัดเลือกคำตอบที่ถูกต้อง (Multiple Choice)',
            bold: true,
            size: 24,
            color: PRIMARY_COLOR,
          }),
        ],
      }),
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: 'คำชี้แจง: จงเลือกคำตอบที่ถูกต้องที่สุดเพียงข้อเดียว แล้วเขียนตัวอักษรลงในช่องว่างด้านหน้า (ข้อละ 2 คะแนน)',
            italics: true,
            size: 19,
            color: '475569',
          }),
        ],
      }),
    );

    mcQuestions.forEach((q, idx) => {
      const qNum = idx + 1;
      const optionLetters = ['A', 'B', 'C', 'D'];
      const optChildren: TextRun[] = [];

      q.options.forEach((opt, oIdx) => {
        const isAns = isTeacher && oIdx === q.correctAnswerIndex;
        optChildren.push(
          new TextRun({
            text: `    ${optionLetters[oIdx]}. ${opt}      `,
            bold: isAns,
            color: isAns ? 'DC2626' : '000000',
            size: 20,
          }),
        );
      });

      docChildren.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: isTeacher ? `[ ${optionLetters[q.correctAnswerIndex]} ] ` : '(      ) ',
              bold: true,
              color: isTeacher ? 'DC2626' : PRIMARY_COLOR,
              size: 20,
            }),
            new TextRun({ text: `${qNum}. ${q.question} `, bold: true, size: 20 }),
            ...(q.pinyin ? [new TextRun({ text: `[${q.pinyin}]`, italics: true, size: 18, color: '64748B' })] : []),
          ],
        }),
      );

      docChildren.push(
        new Paragraph({
          spacing: { before: 20, after: 80 },
          children: optChildren,
        }),
      );

      if (isTeacher) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 0, after: 60 },
            children: [
              new TextRun({ text: `   [เฉลย & อธิบาย]: `, bold: true, size: 18, color: 'B91C1C' }),
              new TextRun({ text: q.explanationTh, size: 18, color: 'B91C1C' }),
            ],
          }),
        );
      }
    });

    docChildren.push(new Paragraph({ spacing: { after: 200 } }));
  }

  // ==========================================
  // 4. Part 3: Fill in the Blanks with Word Bank
  // ==========================================
  if (!isGrammarOnly && config.includeFillInBlanks && fillQuestions.length > 0) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
        children: [
          new TextRun({
            text: 'ตอนที่ 2: แบบฝึกหัดเติมคำในช่องว่าง (Fill in the Blanks)',
            bold: true,
            size: 24,
            color: PRIMARY_COLOR,
          }),
        ],
      }),
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: 'คำชี้แจง: นำคำศัพท์จากกล่องคำศัพท์ด้านล่างไปเติมลงในช่องว่างให้เป็นประโยคที่ถูกต้องสมบูรณ์',
            italics: true,
            size: 19,
            color: '475569',
          }),
        ],
      }),
    );

    // Word Bank Box
    const allWords = Array.from(new Set(fillQuestions.map((f) => f.correctWord)));
    const wordBankTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder,
              shading: { type: ShadingType.CLEAR, fill: 'EFF6FF' },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 60, after: 60 },
                  children: [
                    new TextRun({ text: '【 กล่องคำศัพท์ / 词语库 】:   ', bold: true, size: 20, color: PRIMARY_COLOR }),
                    new TextRun({ text: allWords.join('    •    '), bold: true, size: 22, color: '0369A1' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
    docChildren.push(wordBankTable);
    docChildren.push(new Paragraph({ spacing: { after: 140 } }));

    fillQuestions.forEach((fq, idx) => {
      const qNum = idx + 1;
      const displaySentence = isTeacher
        ? fq.sentenceWithBlank.replace('___', `[ ${fq.correctWord} ]`)
        : fq.sentenceWithBlank.replace('___', '__________');

      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: `${qNum}. `, bold: true, size: 20 }),
            new TextRun({
              text: displaySentence,
              bold: true,
              size: 22,
              color: isTeacher ? 'B91C1C' : '000000',
            }),
          ],
        }),
      );
      docChildren.push(
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({ text: `    คำอ่าน: ${fq.pinyinWithBlank} `, italics: true, size: 18, color: '64748B' }),
            new TextRun({ text: ` (ความหมาย: ${fq.translationTh})`, size: 18, color: '475569' }),
          ],
        }),
      );

      if (isTeacher) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 0, after: 60 },
            children: [
              new TextRun({ text: `    [เหตุผล]: `, bold: true, size: 18, color: 'B91C1C' }),
              new TextRun({ text: fq.explanationTh, size: 18, color: 'B91C1C' }),
            ],
          }),
        );
      }
    });

    docChildren.push(new Paragraph({ spacing: { after: 200 } }));
  }

  // ==========================================
  // 5. Part 4: Sentence Reordering
  // ==========================================
  if (!isGrammarOnly && config.includeSentenceReordering && reorderQuestions.length > 0) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
        children: [
          new TextRun({
            text: 'ตอนที่ 3: แบบฝึกหัดเรียงคำเป็นประโยค (Sentence Reordering)',
            bold: true,
            size: 24,
            color: PRIMARY_COLOR,
          }),
        ],
      }),
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: 'คำชี้แจง: นำคำที่กำหนดให้มาเรียงลำดับให้เป็นประโยคตามหลักไวยากรณ์ภาษาจีนที่ถูกต้อง',
            italics: true,
            size: 19,
            color: '475569',
          }),
        ],
      }),
    );

    reorderQuestions.forEach((rq, idx) => {
      const qNum = idx + 1;
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: `${qNum}. คำที่กำหนด: `, bold: true, size: 20 }),
            new TextRun({
              text: `[ ${rq.shuffledWords.join('  /  ')} ]`,
              bold: true,
              size: 22,
              color: '0369A1',
            }),
            new TextRun({ text: `  (ความหมาย: ${rq.translationTh})`, italics: true, size: 18, color: '475569' }),
          ],
        }),
      );

      docChildren.push(
        new Paragraph({
          spacing: { before: 20, after: 60 },
          children: [
            new TextRun({ text: '    ตอบ: ', bold: true, size: 20 }),
            new TextRun({
              text: isTeacher ? rq.correctSentence : '________________________________________________________________',
              bold: isTeacher,
              size: 21,
              color: isTeacher ? 'DC2626' : '334155',
            }),
            ...(isTeacher ? [new TextRun({ text: ` (${rq.pinyin})`, italics: true, size: 18, color: '64748B' })] : []),
          ],
        }),
      );

      if (isTeacher) {
        docChildren.push(
          new Paragraph({
            spacing: { before: 0, after: 60 },
            children: [
              new TextRun({ text: '    [หลักไวยากรณ์]: ', bold: true, size: 18, color: 'B91C1C' }),
              new TextRun({ text: rq.explanationTh, size: 18, color: 'B91C1C' }),
            ],
          }),
        );
      }
    });

    docChildren.push(new Paragraph({ spacing: { after: 200 } }));
  }

  // ==========================================
  // 6. Part 5: Translation & Sentence Matching
  // ==========================================
  if (!isGrammarOnly && config.includeTranslation && transQuestions.length > 0) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
        children: [
          new TextRun({
            text: 'ตอนที่ 4: แบบฝึกหัดแปลประโยค (Translation Practice)',
            bold: true,
            size: 24,
            color: PRIMARY_COLOR,
          }),
        ],
      }),
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: 'คำชี้แจง: จงแปลประโยคภาษาไทยต่อไปนี้ให้เป็นภาษาจีนให้ถูกต้องตามหลักไวยากรณ์',
            italics: true,
            size: 19,
            color: '475569',
          }),
        ],
      }),
    );

    transQuestions.forEach((tq, idx) => {
      const qNum = idx + 1;
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: `${qNum}. ภาษาไทย: `, bold: true, size: 20 }),
            new TextRun({ text: `"${tq.thaiSentence}" `, bold: true, size: 20, color: '0F172A' }),
            new TextRun({ text: `[คำใบ้: ${tq.hint}]`, italics: true, size: 18, color: '64748B' }),
          ],
        }),
      );

      docChildren.push(
        new Paragraph({
          spacing: { before: 20, after: 60 },
          children: [
            new TextRun({ text: '    ภาษาจีน (เขียนตัวอักษรจีน/พินอิน): ', bold: true, size: 19 }),
            new TextRun({
              text: isTeacher ? `${tq.chineseAnswer} (${tq.pinyin})` : '____________________________________________________',
              bold: isTeacher,
              size: 21,
              color: isTeacher ? 'DC2626' : '334155',
            }),
          ],
        }),
      );
    });

    docChildren.push(new Paragraph({ spacing: { after: 200 } }));
  }

  // ==========================================
  // 7. Answer Key Appendix (if requested for student or standalone)
  // ==========================================
  if (!isGrammarOnly && config.includeAnswerKey && !isTeacher) {
    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({
            text: 'ภาคผนวก: เฉลยคำตอบแบบฝึกหัด (Answer Key)',
            bold: true,
            size: 24,
            color: 'B91C1C',
          }),
        ],
      }),
    );

    // MC Answer Summary
    if (config.includeMultipleChoice && mcQuestions.length > 0) {
      const optionLetters = ['A', 'B', 'C', 'D'];
      const mcSummary = mcQuestions.map((q, idx) => `${idx + 1}.${optionLetters[q.correctAnswerIndex]}`).join('   |   ');
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: '• ตอนที่ 1 เลือกคำตอบ: ', bold: true, size: 20 }),
            new TextRun({ text: mcSummary, bold: true, size: 20, color: 'B91C1C' }),
          ],
        }),
      );
    }

    // Fill blank answers
    if (config.includeFillInBlanks && fillQuestions.length > 0) {
      const fillSummary = fillQuestions.map((f, idx) => `${idx + 1}.${f.correctWord}`).join('   |   ');
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: '• ตอนที่ 2 เติมคำในช่องว่าง: ', bold: true, size: 20 }),
            new TextRun({ text: fillSummary, bold: true, size: 20, color: 'B91C1C' }),
          ],
        }),
      );
    }

    // Reorder answers
    if (config.includeSentenceReordering && reorderQuestions.length > 0) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [new TextRun({ text: '• ตอนที่ 3 เรียงคำเป็นประโยค: ', bold: true, size: 20 })],
        }),
      );
      reorderQuestions.forEach((rq, idx) => {
        docChildren.push(
          new Paragraph({
            spacing: { before: 20, after: 20 },
            children: [
              new TextRun({ text: `    ${idx + 1}. ${rq.correctSentence} `, bold: true, size: 19, color: 'B91C1C' }),
              new TextRun({ text: `(${rq.pinyin})`, italics: true, size: 18, color: '475569' }),
            ],
          }),
        );
      });
    }

    // Translation answers
    if (config.includeTranslation && transQuestions.length > 0) {
      docChildren.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [new TextRun({ text: '• ตอนที่ 4 แปลประโยค: ', bold: true, size: 20 })],
        }),
      );
      transQuestions.forEach((tq, idx) => {
        docChildren.push(
          new Paragraph({
            spacing: { before: 20, after: 20 },
            children: [
              new TextRun({ text: `    ${idx + 1}. ${tq.chineseAnswer} `, bold: true, size: 19, color: 'B91C1C' }),
              new TextRun({ text: `(${tq.pinyin}) - ${tq.thaiSentence}`, italics: true, size: 18, color: '475569' }),
            ],
          }),
        );
      });
    }
  }

  // Footer / Encouragement
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 360, after: 120 },
      children: [
        new TextRun({
          text: '祝你学习进步！ (ขอให้มีความก้าวหน้าในการเรียนภาษาจีน!)',
          bold: true,
          italics: true,
          size: 20,
          color: ACCENT_COLOR,
        }),
      ],
    }),
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = isGrammarOnly
    ? 'HSK1_Grammar_CheatSheet_25Points.docx'
    : isTeacher
    ? 'HSK1_Grammar_Worksheet_Teacher_AnswerKey.docx'
    : 'HSK1_Grammar_Worksheet_Student.docx';

  saveAs(blob, fileName);
}
