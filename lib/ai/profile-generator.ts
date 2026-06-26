// ─────────────────────────────────────────────────────────────────────────────
// AI Profile Generator — Claude Opus 4.8 with adaptive thinking
//
// Generates professional coach profile content from raw form data.
// IMPORTANT: Never hallucinates — only uses data explicitly provided.
//
// Requires:
//   ANTHROPIC_API_KEY — Anthropic API key
// ─────────────────────────────────────────────────────────────────────────────

import Anthropic from '@anthropic-ai/sdk'
import type { AIGenerationInput, AIGeneratedContent } from '@/types/coach-profiles'

const MODEL = 'claude-opus-4-8'

let _client: Anthropic | null = null

function getClient(): Anthropic {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Missing ANTHROPIC_API_KEY environment variable')
    }
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return _client
}

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert writer specialising in professional chess coach profiles for CircleChess, a premium online chess coaching platform.

Your job is to craft compelling, accurate profile content based ONLY on the data provided. You must NEVER invent, assume, or extrapolate facts, ratings, titles, achievements, or biographical details that are not explicitly present in the input. If a field has no source data, say so gracefully without fabricating.

Writing style:
- Professional yet warm and approachable
- Confident without being boastful
- Chess parents (not just players) are your target audience
- UK/Indian English conventions are fine
- Avoid clichés like "passionate about chess", "dedicated coach", "love of the game"

Output format: You MUST return a single valid JSON object with these exact keys:
{
  "short_bio":           "2–3 sentence overview (max 80 words)",
  "full_bio":            "Comprehensive 3–4 paragraph biography (max 350 words)",
  "coaching_philosophy": "1–2 paragraph teaching philosophy (max 150 words)",
  "key_highlights":      ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
  "parent_intro":        "1 paragraph parent-facing introduction explaining why this coach is great for children (max 100 words)",
  "website_summary":     "SEO-optimised 1-paragraph blurb for search engines (max 60 words, include relevant chess keywords)"
}

Rules:
1. key_highlights must contain 4–6 items maximum. Only include verifiable highlights from the input data.
2. If FIDE/rapid/blitz ratings are provided, mention the strongest one naturally.
3. If years_coaching is unknown, say something like "experienced coach" without inventing a number.
4. Return ONLY the JSON object — no markdown fences, no explanation, no prefix text.
5. All strings must be properly JSON-escaped.`

// ─── Build user message ───────────────────────────────────────────────────────
function buildUserMessage(input: AIGenerationInput): string {
  const lines: string[] = [
    `== COACH DATA ==`,
    `Name: ${input.fullName}`,
    `Title: ${input.title ?? 'Not provided'}`,
    `Location: ${input.location ?? 'Not provided'}`,
    `Years coaching: ${input.yearsCoaching ?? 'Not provided'}`,
    `Years playing: ${input.yearsPlaying ?? 'Not provided'}`,
    ``,
    `== RATINGS ==`,
    `FIDE Classical: ${input.fideRating ?? 'Not provided'}`,
    `Rapid: ${input.rapidRating ?? 'Not provided'}`,
    `Blitz: ${input.blitzRating ?? 'Not provided'}`,
    `Peak: ${input.peakRating ?? 'Not provided'}`,
    `FIDE ID: ${input.fideId ?? 'Not provided'}`,
    `Lichess: ${input.lichessUsername ?? 'Not provided'}`,
    `Chess.com: ${input.chessComUsername ?? 'Not provided'}`,
    ``,
    `== SPECIALISATIONS ==`,
    input.specializations.length > 0 ? input.specializations.join(', ') : 'Not provided',
    ``,
    `== LANGUAGES ==`,
    input.languages.length > 0 ? input.languages.join(', ') : 'Not provided',
    ``,
    `== TEACHING FORMATS ==`,
    input.teachingFormats.length > 0
      ? input.teachingFormats.map(f => f.format + (f.details ? ` (${f.details})` : '')).join(', ')
      : 'Not provided',
    ``,
    `== CERTIFICATIONS ==`,
  ]

  if (input.certifications.length > 0) {
    input.certifications.forEach(c => {
      lines.push(`- ${c.name} from ${c.issuer}${c.year ? ` (${c.year})` : ''}`)
    })
  } else {
    lines.push('None provided')
  }

  lines.push('', '== NOTABLE TOURNAMENTS & RESULTS ==')
  if (input.tournaments.length > 0) {
    input.tournaments.forEach(t => {
      lines.push(`- ${t.name}${t.year ? ` (${t.year})` : ''}: ${t.result}${t.location ? ` — ${t.location}` : ''}`)
    })
  } else {
    lines.push('None provided')
  }

  lines.push('', '== ACHIEVEMENTS ==')
  if (input.achievements.length > 0) {
    input.achievements.forEach(a => {
      lines.push(`- ${a.title}: ${a.description}${a.year ? ` (${a.year})` : ''}`)
    })
  } else {
    lines.push('None provided')
  }

  if (input.rawBio) {
    lines.push('', '== RAW BIO (coach-submitted text, use as source only) ==', input.rawBio)
  }

  if (input.rawPhilosophy) {
    lines.push('', '== RAW COACHING PHILOSOPHY (coach-submitted, use as source only) ==', input.rawPhilosophy)
  }

  return lines.join('\n')
}

// ─── Generate profile ─────────────────────────────────────────────────────────
export async function generateCoachProfile(
  input: AIGenerationInput,
): Promise<AIGeneratedContent> {
  const client = getClient()

  const stream = await client.messages.stream({
    model:      MODEL,
    max_tokens: 4096,
    thinking:   { type: 'adaptive' },
    system:     SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: buildUserMessage(input) },
    ],
  })

  const message = await stream.finalMessage()

  // Extract the text content block
  const textBlock = message.content.find(b => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('AI returned no text content')
  }

  const raw = textBlock.text.trim()

  // Strip markdown fences if the model returned them despite instructions
  const jsonStr = raw.startsWith('```')
    ? raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
    : raw

  let parsed: AIGeneratedContent
  try {
    parsed = JSON.parse(jsonStr)
  } catch {
    throw new Error(`AI returned non-JSON response: ${raw.slice(0, 200)}`)
  }

  // Validate required fields
  const required: (keyof AIGeneratedContent)[] = [
    'short_bio', 'full_bio', 'coaching_philosophy',
    'key_highlights', 'parent_intro', 'website_summary',
  ]
  for (const key of required) {
    if (!parsed[key]) throw new Error(`AI response missing field: ${key}`)
  }

  if (!Array.isArray(parsed.key_highlights) || parsed.key_highlights.length === 0) {
    throw new Error('AI response key_highlights must be a non-empty array')
  }

  return parsed
}

// ─── Regenerate a single field ────────────────────────────────────────────────
export async function regenerateSingleField(
  input: AIGenerationInput,
  field: keyof AIGeneratedContent,
  currentContent: AIGeneratedContent,
  customInstruction?: string,
): Promise<string | string[]> {
  const client = getClient()

  const instruction = customInstruction
    ?? `Please regenerate only the "${field}" section. Make it more compelling and varied.`

  const prompt = [
    buildUserMessage(input),
    '',
    '== CURRENT GENERATED CONTENT ==',
    JSON.stringify(currentContent, null, 2),
    '',
    `== INSTRUCTION ==`,
    instruction,
    '',
    `Return ONLY the new value for "${field}" as a JSON value (string or array of strings). No extra text.`,
  ].join('\n')

  const message = await client.messages.create({
    model:      MODEL,
    max_tokens: 1024,
    thinking:   { type: 'adaptive' },
    system:     SYSTEM_PROMPT,
    messages:   [{ role: 'user', content: prompt }],
  })

  const textBlock = message.content.find(b => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('AI returned no text for field regeneration')
  }

  return JSON.parse(textBlock.text.trim())
}
