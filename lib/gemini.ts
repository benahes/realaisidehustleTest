import axios from "axios";

const geminiKey = process.env.GEMINI_API_KEY;

export async function generateBlogWithGemini(params: {
  topic: string;
  tone?: string;
  length?: string;
}) {
  const { topic, tone = "professional", length = "medium" } = params;

  if (!geminiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const lengthMap: Record<string, string> = {
    short: "500-800 words",
    medium: "1200-1800 words",
    long: "2500-3500 words",
  };

  const prompt = `You are an expert AI and technology blogger for "Real AI Side Hustle". Write an engaging, actionable ${lengthMap[length]} blog post about: ${topic}. Use a ${tone} tone. Output ONLY valid JSON with these keys: title, slug, excerpt, content (markdown), category, tags (array of up to 5 strings). Do not include markdown code fences around the JSON.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;

  const res = await axios.post(
    url,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
    },
  );

  const candidate = res.data.candidates?.[0];
  const raw = candidate?.content?.parts?.[0]?.text;
  if (!raw) throw new Error("Empty response from Gemini");

  // Strip markdown fences if present
  const clean = raw.replace(/^```json\s*/, "").replace(/```\s*$/, "").trim();
  const parsed = JSON.parse(clean);
  return parsed as {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
  };
}
