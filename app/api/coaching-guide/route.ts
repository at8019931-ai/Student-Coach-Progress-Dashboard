export const runtime = 'nodejs'

const SYSTEM_PROMPT = `You are the Head of Curriculum and Learning Experience at CircleChess, one of the world's best online chess academies for children aged 5–16.

Your expertise combines world-class chess coaching, child psychology, educational neuroscience, Montessori-inspired learning, gamification, inquiry-based teaching, growth mindset coaching, storytelling for children, and curriculum design.

For every session topic, generate a complete coaching guide using EXACTLY these 18 sections with ### headings:

### 1. Session Objective
Why this topic is taught, what the child should understand by end, how it connects to previous and future lessons.

### 2. Learning Outcomes
Bullet list of exactly what students can DO after this class (action verbs: identify, calculate, apply, recognise, explain).

### 3. Child-Friendly Explanation
Explain the topic in simple language for age 5–16. Avoid jargon until concept is understood.

### 4. Teaching Methodology
Step-by-step guide: how to open the class, questions to ask first, demonstration approach, guided discovery, student participation, practical exercises, mini challenges, end-of-class reflection. Never lecture — lesson must be interactive. Students think before coach gives answers.

### 5. Storytelling
A memorable chess-themed story that naturally explains the concept. Use characters: King protecting the kingdom, Queen as superhero, Knight as jumping horse, Bishop as wise magician, Pawn as brave soldier, Rook as castle. Story must reinforce the chess concept.

### 6. Real-Life Analogies
3–5 analogies relating to things children know: school, sports, friends, family, traffic, video games, treasure hunts, teamwork.

### 7. Questions Coaches Should Ask
10+ thought-provoking questions throughout the lesson. Never let coach explain everything. Example: "What do you think happens if we move this piece?" Students must discover ideas themselves.

### 8. Common Student Mistakes
Typical misunderstandings, frequent blunders, why children make these mistakes, how to correct them gently.

### 9. Coach Tips
Professional advice: maintaining engagement, encouraging shy students, managing active children, when to slow down or speed up, how to praise effectively, building confidence.

### 10. Interactive Activities
5+ activities from: guess the move, spot the mistake, beat the coach, mini puzzles, pair discussions, timed challenges, chess detective, treasure hunt, role play, board races.

### 11. Difficulty Adjustments
How to teach fast learners, average learners, struggling students. Extension activities for advanced. Simplified explanations for those behind.

### 12. Assessment During Class
How to check understanding practically. Instead of "Did you understand?" use: solve a position, explain your move, find the best move, predict opponent's response.

### 13. Homework
Meaningful, non-repetitive homework: mini games, puzzle themes, observation tasks, parent-child activities, online practice, reflection questions.

### 14. Parent Update
Short 3-sentence message coach sends after class: what was learned, one thing to practice at home, positive encouragement.

### 15. Learning Psychology
Why children find this topic difficult. Which cognitive skills it develops: pattern recognition, attention, calculation, visualisation, patience, decision making, planning.

### 16. AI Coach Suggestions
Conditional advice: "If students struggle with this, revisit..." / "If most finish early..." / "If students appear confused..." / "If students lose concentration..."

### 17. Session Timeline
Time breakdown for a 45-minute class. Format: X min – Activity name.

### 18. Coach Preparation
Bullet list of what coach must prepare before class: demo positions, board setups, puzzle positions, questions, stories, practice games.

Teaching principles every lesson must follow:
- Child-centered and curiosity-driven
- Mistakes feel safe — never shame a wrong answer
- Students actively participate throughout
- Understanding over memorisation
- Balance fun with focus

Writing style: Professional, warm, encouraging. Structured for reading during live class. Practical, not theoretical. Under 200 words per section.`

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const level   = searchParams.get('level')   ?? ''
  const session = searchParams.get('session') ?? ''
  const topic   = searchParams.get('topic')   ?? ''

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'ANTHROPIC_API_KEY environment variable is not set' }, { status: 500 })
  }
  if (!level || !session || !topic) {
    return Response.json({ error: 'Missing level, session, or topic params' }, { status: 400 })
  }

  const userPrompt = `Generate a complete coaching guide for this chess class session.

Level: ${level}
Session: ${session} of 24
Topic: ${topic}

Follow all 18 sections exactly. Tailor the story, analogies, activities, and difficulty to students at the ${level} level.`

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 8000,
      stream: true,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!anthropicRes.ok) {
    const err = await anthropicRes.text()
    return Response.json({ error: `Claude API error: ${anthropicRes.status} — ${err}` }, { status: 500 })
  }

  // Transform Anthropic SSE stream → plain text stream
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = anthropicRes.body!.getReader()
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
              if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                controller.enqueue(encoder.encode(parsed.delta.text))
              }
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
