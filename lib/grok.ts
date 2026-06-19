import axios from 'axios'

const grokClient = axios.create({
  baseURL: 'https://api.x.ai/v1',
  headers: {
    Authorization: `Bearer ${process.env.XAI_API_KEY || process.env.GROK_API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

export async function generateBlogPost(params: {
  topic: string
  tone?: string
  length?: string
}) {
  const { topic, tone = 'professional', length = 'medium' } = params

  const lengthMap: Record<string, string> = {
    short: '500-800 words',
    medium: '1200-1800 words',
    long: '2500-3500 words',
  }

  const systemPrompt = `You are an expert AI and technology blogger for "Real AI Side Hustle". Write engaging, actionable blog posts that help readers leverage AI for business and personal growth. Use a ${tone} tone. Output valid JSON with keys: title, slug, excerpt, content (markdown), category, tags (array of up to 5 strings).`

  const userPrompt = `Write a ${lengthMap[length]} blog post about: ${topic}`

  const res = await grokClient.post('/chat/completions', {
    model: 'grok-3',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const raw = res.data.choices[0]?.message?.content
  if (!raw) throw new Error('Empty response from Grok')

  const parsed = JSON.parse(raw)
  return parsed as {
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    tags: string[]
  }
}

export function isGrokNoCreditsError(err: any): boolean {
  const msg = err?.response?.data?.error || err?.message || ''
  return typeof msg === 'string' && msg.toLowerCase().includes("doesn't have any credits")
}

export async function generateOpenAI(params: { prompt: string }) {
  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: params.prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    }
  )

  const raw = res.data.choices[0]?.message?.content
  if (!raw) throw new Error('Empty response from OpenAI')
  return JSON.parse(raw)
}
