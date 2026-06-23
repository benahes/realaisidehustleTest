import axios from "axios";

export async function generateBlogWithOpenRouter(params: {
  topic: string;
  tone?: string;
  length?: string;
}) {
  const { topic, tone = "professional", length = "medium" } = params;

  const openrouterKey = process.env.OPENROUTER_API_KEY?.trim();

  if (!openrouterKey) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://real-ai-side-hustle.vercel.app";

  const lengthMap: Record<string, string> = {
    short: "500-800 words",
    medium: "1200-1800 words",
    long: "2500-3500 words",
  };

  const systemPrompt = `You are an expert AI and technology blogger for "Real AI Side Hustle". Write engaging, actionable blog posts that help readers leverage AI for business and personal growth. Use a ${tone} tone. Output ONLY valid JSON with these keys: title, slug, excerpt, content (markdown), category, tags (array of up to 5 strings). Do not include markdown code fences around the JSON.`;

  const userPrompt = `Write a ${lengthMap[length]} blog post about: ${topic}`;

  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: process.env.OPENROUTER_MODEL || "openai/gpt-oss-20b:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${openrouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": appUrl,
        "X-Title": "Real AI Side Hustle",
      },
      timeout: 60000,
    },
  );

  const raw = res.data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty response from OpenRouter");

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

export function isOpenRouterAuthError(err: any): boolean {
  return err?.response?.status === 401 || err?.response?.status === 403;
}

export function isOpenRouterQuotaError(err: any): boolean {
  return err?.response?.status === 402 || err?.response?.status === 429;
}
