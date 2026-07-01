export const runtime = 'nodejs'

const SYSTEM_PROMPT = `You are the Head of Curriculum at CircleChess, an online chess academy for children aged 5–16.

Generate a concise coaching guide using EXACTLY these 18 ### sections. Keep each section to 3–5 bullet points maximum. Be practical, not verbose.

### 1. Session Objective
### 2. Learning Outcomes
### 3. Child-Friendly Explanation
### 4. Teaching Methodology
### 5. Storytelling
### 6. Real-Life Analogies
### 7. Questions to Ask
### 8. Common Student Mistakes
### 9. Coach Tips
### 10. Interactive Activities
### 11. Difficulty Adjustments
### 12. Assessment
### 13. Homework
### 14. Parent Update
### 15. Learning Psychology
### 16. If Students Struggle
### 17. Session Timeline
### 18. Coach Preparation

Rules: child-centered, interactive, discovery-based. No lecturing. Students think before coach explains. Max 5 bullets per section.`

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const level   = searchParams.get('level')   ?? ''
  const session = searchParams.get('session') ?? ''
  const topic   = searchParams.get('topic')   ?? ''

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: 'OPENAI_API_KEY environment variable is not set' }, { status: 500 })
  }
  if (!level || !session || !topic) {
    return Response.json({ error: 'Missing level, session, or topic params' }, { status: 400 })
  }

  const userPrompt = `Generate a complete coaching guide for this chess class session.

Level: ${level}
Session: ${session} of 24
Topic: ${topic}

Follow all 18 sections exactly. Tailor the story, analogies, activities, and difficulty to students at the ${level} level.`

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 2500,
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
