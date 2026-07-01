export const runtime = 'nodejs'

const SYSTEM_PROMPT = `You are a CircleChess coach trainer. Generate a quick coaching guide for a live chess class (ages 5–16).

Use EXACTLY these 6 ### sections, each with 3–4 bullet points only. Be direct and practical.

### Objective & Outcomes
Why this topic matters + 3 things students will be able to do after class.

### How to Explain It
Simple child-friendly explanation. No jargon. One short analogy or story hook.

### Teaching Steps
Numbered step-by-step plan for the class. Interactive — students think before coach reveals.

### Questions to Ask Students
5 questions that guide students to discover ideas themselves.

### Watch For (Common Mistakes)
3–4 typical errors children make and how to correct them gently.

### Timeline & Homework
5-line time breakdown for a 45-min class + one homework task.`

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const level   = searchParams.get('level')   ?? ''
  const session = searchParams.get('session') ?? ''
  const topic   = searchParams.get('topic')   ?? ''

  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: 'GROQ_API_KEY environment variable is not set' }, { status: 500 })
  }
  if (!level || !session || !topic) {
    return Response.json({ error: 'Missing level, session, or topic params' }, { status: 400 })
  }

  const userPrompt = `Generate a complete coaching guide for this chess class session.

Level: ${level}
Session: ${session} of 24
Topic: ${topic}

Follow all 18 sections exactly. Tailor the story, analogies, activities, and difficulty to students at the ${level} level.`

  const openaiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      max_tokens: 800,
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: userPrompt },
      ],
    }),
  })

  if (!openaiRes.ok) {
    const err = await openaiRes.text()
    return Response.json({ error: `OpenAI API error: ${openaiRes.status} — ${err}` }, { status: 500 })
  }

  // Transform OpenAI SSE stream → plain text stream
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = openaiRes.body!.getReader()
      try {
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (!data || data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const text = parsed.choices?.[0]?.delta?.content
              if (text) controller.enqueue(encoder.encode(text))
            } catch { /* skip malformed lines */ }
          }
        }
      } finally {
        controller.close()
        reader.releaseLock()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
