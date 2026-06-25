export interface CCStudentProgress {
  player_id: number
  student_name: string
  rating: number | null
  league_name: string | null
  class_name: string | null
  subscription_status: number
  subscription_start_date: string | null
  subscription_end_date: string | null
  total_sessions: number
  total_points: string
  last_30_days_points: string
  matches_played: number
  wins: number
  losses: number
  win_percentage: string
}

const EXPLORER_BASE = 'https://explorer.circlechess.com'
const QUERY_ID = '1152'

let cachedCookie: string | null = null
let cookieExpiry = 0

async function getSessionCookie(): Promise<string> {
  if (cachedCookie && Date.now() < cookieExpiry) return cachedCookie

  const user = process.env.CC_EXPLORER_USER!
  const pass = process.env.CC_EXPLORER_PASS!

  // Step 1: GET login page to get CSRF token + csrftoken cookie
  const loginRes = await fetch(`${EXPLORER_BASE}/${QUERY_ID}/?show=0`, {
    redirect: 'follow',
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  const html = await loginRes.text()
  const csrfMatch = html.match(/csrfmiddlewaretoken" value="([^"]+)"/)
  const csrf = csrfMatch?.[1]
  if (!csrf) throw new Error('Could not extract CSRF token from login page')

  const rawCookies = loginRes.headers.get('set-cookie') ?? ''
  const csrfCookie = rawCookies.match(/csrftoken=([^;]+)/)?.[1] ?? ''

  // Step 2: POST login
  const body = new URLSearchParams({
    csrfmiddlewaretoken: csrf,
    username: user,
    password: pass,
    next: `/${QUERY_ID}/?show=0`,
  })
  const postRes = await fetch(`${EXPLORER_BASE}/${QUERY_ID}/?show=0`, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': `${EXPLORER_BASE}/${QUERY_ID}/?show=0`,
      'Cookie': `csrftoken=${csrfCookie}`,
      'User-Agent': 'Mozilla/5.0',
    },
    body: body.toString(),
  })

  const postCookies = postRes.headers.get('set-cookie') ?? ''
  const sessionId = postCookies.match(/sessionid=([^;]+)/)?.[1]
  const newCsrf = postCookies.match(/csrftoken=([^;]+)/)?.[1] ?? csrfCookie

  if (!sessionId) throw new Error('Login failed — no session cookie returned')

  cachedCookie = `csrftoken=${newCsrf}; sessionid=${sessionId}`
  // Session valid for 2 weeks but re-auth after 10 minutes to be safe
  cookieExpiry = Date.now() + 10 * 60 * 1000
  return cachedCookie
}

export async function fetchAllStudentProgress(): Promise<CCStudentProgress[]> {
  const cookie = await getSessionCookie()
  const res = await fetch(`${EXPLORER_BASE}/explorer/${QUERY_ID}/download?format=json`, {
    redirect: 'follow',
    headers: {
      Cookie: cookie,
      Referer: `${EXPLORER_BASE}/${QUERY_ID}/?show=0`,
      'User-Agent': 'Mozilla/5.0',
    },
    next: { revalidate: 300 }, // cache 5 min
  })
  if (!res.ok) throw new Error(`Explorer fetch failed: ${res.status}`)
  return res.json()
}

export async function fetchStudentProgress(playerId: number): Promise<CCStudentProgress | null> {
  const all = await fetchAllStudentProgress()
  return all.find(s => s.player_id === playerId) ?? null
}

// Deduplicate rows by player_id, keeping the entry with the highest total_points
export function deduplicateStudents(students: CCStudentProgress[]): CCStudentProgress[] {
  const map = new Map<number, CCStudentProgress>()
  for (const s of students) {
    const existing = map.get(s.player_id)
    if (!existing || Number(s.total_points) > Number(existing.total_points)) {
      map.set(s.player_id, s)
    }
  }
  return Array.from(map.values())
}

export type CCLevel =
  | 'Foundation 1' | 'Foundation 2' | 'Foundation 3' | 'Foundation 4'
  | 'Beginner' | 'Intermediate' | 'Advanced' | 'Other'

// ─── Coach / Batch data (query 1153) ────────────────────────────────────────

export interface CCCoachStudent {
  student_id: number
  student_name: string
  coach_name: string
  batch_name: string
}

export interface CCCoachSummary {
  coach_name: string
  student_count: number
  batch_count: number
  batches: { batch_name: string; student_count: number }[]
}

const EXCLUDED_BATCHES = new Set(['demo_call', 'strategy', 'psychology'])

export async function fetchCoachStudentData(): Promise<CCCoachStudent[]> {
  const cookie = await getSessionCookie()
  const res = await fetch(`${EXPLORER_BASE}/explorer/1153/download?format=json`, {
    redirect: 'follow',
    headers: {
      Cookie: cookie,
      Referer: `${EXPLORER_BASE}/1153/?show=0`,
      'User-Agent': 'Mozilla/5.0',
    },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Coach data fetch failed: ${res.status}`)
  const raw: CCCoachStudent[] = await res.json()
  return raw.filter(r =>
    r.coach_name?.trim() &&
    !EXCLUDED_BATCHES.has((r.batch_name ?? '').trim().toLowerCase())
  )
}

export function groupByCoach(data: CCCoachStudent[]): CCCoachSummary[] {
  // Deduplicate by name within each batch to avoid counting the same student twice
  const batchSeen = new Map<string, Set<string>>() // `${batch}` → Set of lowercased names
  const deduped = data.filter(r => {
    const key = r.batch_name
    if (!batchSeen.has(key)) batchSeen.set(key, new Set())
    const nameKey = r.student_name.trim().toLowerCase()
    if (batchSeen.get(key)!.has(nameKey)) return false
    batchSeen.get(key)!.add(nameKey)
    return true
  })

  const map = new Map<string, { students: Set<string>; batches: Map<string, number> }>()
  for (const r of deduped) {
    const coach = r.coach_name.trim()
    if (!map.has(coach)) map.set(coach, { students: new Set(), batches: new Map() })
    const entry = map.get(coach)!
    entry.students.add(r.student_name.trim().toLowerCase())
    entry.batches.set(r.batch_name, (entry.batches.get(r.batch_name) ?? 0) + 1)
  }
  return Array.from(map.entries())
    .map(([coach_name, { students, batches }]) => ({
      coach_name,
      student_count: students.size,
      batch_count: batches.size,
      batches: Array.from(batches.entries())
        .map(([batch_name, student_count]) => ({ batch_name, student_count }))
        .sort((a, b) => b.student_count - a.student_count),
    }))
    .sort((a, b) => b.student_count - a.student_count)
}

// ─── Level detection ─────────────────────────────────────────────────────────

// Detect level from league_name using CircleChess batch code conventions
export function detectLevel(leagueName: string | null): CCLevel {
  if (!leagueName) return 'Other'
  // Split on dashes and spaces to get individual segments
  const parts = leagueName.toUpperCase().split(/[-\s]+/)
  // Check from most-specific to least-specific
  if (parts.includes('F4')) return 'Foundation 4'
  if (parts.includes('F3')) return 'Foundation 3'
  if (parts.includes('F2')) return 'Foundation 2'
  if (parts.includes('F1') || parts.includes('F')) return 'Foundation 1'
  if (parts.some(p => p === 'ADV' || p === 'AD' || p.startsWith('ADV'))) return 'Advanced'
  if (parts.some(p => p === 'IN' || p === 'IN2' || p === 'IN3' || p === 'IN4')) return 'Intermediate'
  if (parts.includes('B')) return 'Beginner'
  return 'Other'
}
