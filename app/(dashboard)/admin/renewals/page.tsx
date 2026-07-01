import { cn } from '@/lib/utils'
import {
  fetchAllStudentProgress,
  fetchCoachStudentData,
  deduplicateStudents,
  detectLevel,
} from '@/lib/cc-explorer'
import { syllabusLevelFromCC } from '@/lib/syllabus'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Renewals — Admin' }
export const dynamic = 'force-dynamic'

// ─── Status logic ─────────────────────────────────────────────────────────────
type RenewalStatus = 'In Progress' | 'Upcoming' | 'Due' | 'Overdue'

function getRenewalStatus(sessions: number, endDate: string | null): RenewalStatus {
  const now = Date.now()
  if (endDate) {
    const end = new Date(endDate).getTime()
    if (end < now) return 'Overdue'
    const daysLeft = (end - now) / (1000 * 60 * 60 * 24)
    if (daysLeft <= 14 && sessions >= 21) return 'Due'
  }
  if (sessions >= 24) return 'Due'
  if (sessions >= 21) return 'Upcoming'
  return 'In Progress'
}

const STATUS_STYLES: Record<RenewalStatus, string> = {
  'In Progress': 'bg-emerald-50  text-emerald-700 border-emerald-200',
  'Upcoming':    'bg-amber-50    text-amber-700   border-amber-200',
  'Due':         'bg-orange-50   text-orange-700  border-orange-200',
  'Overdue':     'bg-red-50      text-red-700     border-red-200',
}

const STATUS_DOT: Record<RenewalStatus, string> = {
  'In Progress': 'bg-emerald-500',
  'Upcoming':    'bg-amber-500',
  'Due':         'bg-orange-500',
  'Overdue':     'bg-red-500',
}

// ─── Next module ─────────────────────────────────────────────────────────────
const LEVEL_PROGRESSION: Record<string, string> = {
  'Beginner':     'Foundation 1',
  'Foundation 1': 'Foundation 2',
  'Foundation 2': 'Foundation 3',
  'Foundation 3': 'Foundation 4',
  'Foundation 4': 'Intermediate 1',
  'Intermediate 1': 'Intermediate 2',
  'Intermediate 2': 'Intermediate 3',
  'Intermediate 3': 'Intermediate 4',
  'Intermediate 4': 'Advanced',
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function RenewalsPage() {
  const [rawStudents, coachRaw] = await Promise.all([
    fetchAllStudentProgress().catch(() => []),
    fetchCoachStudentData().catch(() => []),
  ])

  const students = deduplicateStudents(rawStudents)

  // Build student_name → coach_name lookup (normalised)
  const coachLookup = new Map<string, string>()
  for (const r of coachRaw) {
    coachLookup.set(r.student_name.trim().toLowerCase(), r.coach_name.trim())
  }

  // Build renewal rows
  const rows = students.map(s => {
    const nameKey = s.student_name.trim().toLowerCase()
    const coach = coachLookup.get(nameKey) ?? 'Unassigned'
    const ccLevel = detectLevel(s.league_name)
    const syllabusLevel = syllabusLevelFromCC(ccLevel) ?? ccLevel
    const sessions = Math.min(s.total_sessions, 24)
    const status = getRenewalStatus(sessions, s.subscription_end_date)
    const nextModule = LEVEL_PROGRESSION[syllabusLevel] ?? '—'

    return { s, coach, syllabusLevel, sessions, status, nextModule }
  })

  // Sort: Overdue → Due → Upcoming → In Progress
  const ORDER: Record<RenewalStatus, number> = { Overdue: 0, Due: 1, Upcoming: 2, 'In Progress': 3 }
  rows.sort((a, b) => ORDER[a.status] - ORDER[b.status] || a.coach.localeCompare(b.coach))

  // Summary counts
  const counts = rows.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1
    return acc
  }, {} as Record<RenewalStatus, number>)

  // Group by coach for stats
  const coachGroups = new Map<string, typeof rows>()
  for (const r of rows) {
    if (!coachGroups.has(r.coach)) coachGroups.set(r.coach, [])
    coachGroups.get(r.coach)!.push(r)
  }

  const coachNames = Array.from(coachGroups.keys()).sort()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Renewal Tracker</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Module completion and subscription renewal status across all students
        </p>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        {((['Overdue', 'Due', 'Upcoming', 'In Progress'] as RenewalStatus[])).map(s => (
          <div key={s} className={cn('flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold', STATUS_STYLES[s])}>
            <span className={cn('w-2 h-2 rounded-full', STATUS_DOT[s])} />
            <span>{s}</span>
            <span className="font-bold">{counts[s] ?? 0}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600">
          Total <span className="font-bold">{rows.length}</span>
        </div>
      </div>

      {/* Per-coach sections */}
      {coachNames.map(coach => {
        const group = coachGroups.get(coach)!
        const urgentCount = group.filter(r => r.status === 'Due' || r.status === 'Overdue').length

        return (
          <div key={coach} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Coach header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {coach.charAt(0)}
                </div>
                <span className="font-semibold text-gray-900">{coach}</span>
                <span className="text-sm text-gray-400">{group.length} students</span>
              </div>
              {urgentCount > 0 && (
                <span className="text-xs font-bold px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full">
                  {urgentCount} need renewal
                </span>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Current Module</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Sessions</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Next Module</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Expires</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {group.map(({ s, syllabusLevel, sessions, status, nextModule }) => {
                    const pct = Math.round((sessions / 24) * 100)
                    const endDate = s.subscription_end_date
                      ? new Date(s.subscription_end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '—'

                    return (
                      <tr key={s.player_id} className="hover:bg-gray-50/50 transition-colors">
                        {/* Student */}
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                              {s.student_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{s.student_name}</p>
                              {s.rating && <p className="text-xs text-gray-400">Rating {s.rating}</p>}
                            </div>
                          </div>
                        </td>

                        {/* Current module */}
                        <td className="px-4 py-3">
                          <span className="font-medium text-gray-700">{syllabusLevel}</span>
                        </td>

                        {/* Sessions progress */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="w-20 h-1.5 bg-gray-100 rounded-full">
                              <div
                                className={cn('h-full rounded-full', pct >= 100 ? 'bg-orange-500' : pct >= 87 ? 'bg-amber-400' : 'bg-emerald-500')}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-600 w-10 text-center">{sessions}/24</span>
                          </div>
                        </td>

                        {/* Next module */}
                        <td className="px-4 py-3 text-gray-500 text-xs">{nextModule}</td>

                        {/* Expiry date */}
                        <td className="px-4 py-3 text-xs text-gray-500">{endDate}</td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold', STATUS_STYLES[status])}>
                            <span className={cn('w-1.5 h-1.5 rounded-full', STATUS_DOT[status])} />
                            {status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
