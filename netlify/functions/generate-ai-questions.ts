import { GoogleGenAI } from '@google/genai';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'GEMINI_API_KEY is not configured on Netlify environment variables.',
        }),
      };
    }

    const { grammarPointTitle, count = 3 } = JSON.parse(event.body || '{}');
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
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Empty response from AI' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: text,
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Failed to generate questions' }),
    };
  }
};
