import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI-powered question generator based on HSK 1 grammar points
  app.post('/api/generate-ai-questions', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
        });
      }

      const { grammarPointTitle, count = 3 } = req.body;
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are an expert Chinese language teacher specialized in HSK 1 and Thai-speaking learners.
Create ${count} new practice exercises for HSK 1 grammar: "${grammarPointTitle || 'HSK 1 Chinese Grammar'}".

Requirements:
- Target audience: Thai students learning HSK 1
- Output strictly in valid JSON format matching this schema:
{
  "questions": [
    {
      "question": "Thai question asking for correct Chinese sentence or filling the blank",
      "pinyin": "Pinyin representation if applicable",
      "options": ["Option A with pinyin", "Option B with pinyin", "Option C with pinyin", "Option D with pinyin"],
      "correctAnswerIndex": 0,
      "explanationTh": "Clear grammatical explanation in Thai",
      "explanationZh": "Brief explanation in Chinese"
    }
  ]
}
Only output the raw JSON object, without markdown formatting or code fences.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (!text) {
        return res.status(500).json({ error: 'Empty response from AI' });
      }

      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error in /api/generate-ai-questions:', err);
      return res.status(500).json({ error: err.message || 'Failed to generate questions' });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HSK 1 Worksheet Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
