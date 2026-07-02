import { Suspense } from 'react'
import { cn } from '@/lib/utils'
import { SYLLABUS, syllabusLevelFromCC } from '@/lib/syllabus'
import { fetchAllStudentProgress, deduplicateStudents, detectLevel } from '@/lib/cc-explorer'
import CoachingGuideDrawer from '@/components/syllabus/CoachingGuideDrawer'
import SyllabusFilter from '@/components/syllabus/SyllabusFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Syllabus & Progress — Admin' }
export const dynamic = 'force-dynamic'

const LEVEL_ORDER = [
  'Beginner', 'Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4',
  'Intermediate 1', 'Intermediate 2', 'Intermediate 3', 'Intermediate 4',
] as const

// Always show these levels even with 0 students (curriculum reference)
const ALWAYS_SHOW = new Set(['Beginner', 'Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4'])

const LEVEL_COLORS: Record<string, { badge: string; bar: string; test: string }> = {
  'Beginner':      { badge: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', test: 'bg-emerald-300' },
  'Foundation 1':  { badge: 'bg-sky-100 text-sky-700',         bar: 'bg-sky-500',     test: 'bg-sky-300' },
  'Foundation 2':  { badge: 'bg-blue-100 text-blue-700',       bar: 'bg-blue-500',    test: 'bg-blue-300' },
  'Foundation 3':  { badge: 'bg-indigo-100 text-indigo-700',   bar: 'bg-indigo-500',  test: 'bg-indigo-300' },
  'Foundation 4':  { badge: 'bg-violet-100 text-violet-700',   bar: 'bg-violet-500',  test: 'bg-violet-300' },
  'Intermediate 1':{ badge: 'bg-amber-100 text-amber-700',     bar: 'bg-amber-500',   test: 'bg-amber-300' },
  'Intermediate 2':{ badge: 'bg-orange-100 text-orange-700',   bar: 'bg-orange-500',  test: 'bg-orange-300' },
  'Intermediate 3':{ badge: 'bg-rose-100 text-rose-700',       bar: 'bg-rose-500',    test: 'bg-rose-300' },
  'Intermediate 4':{ badge: 'bg-red-100 text-red-700',         bar: 'bg-red-500',     test: 'bg-red-300' },
}

export default async function SyllabusPage({
  searchParams,
}: {
  searchParams?: { level?: string }
}) {
  const selectedLevel = searchParams?.level ?? ''
  const rawStudents = await fetchAllStudentProgress().catch(() => [])
  const students = deduplicateStudents(rawStudents)

  // Group students by syllabus level
  const byLevel: Record<string, typeof students> = {}
  for (const s of students) {
    const ccLevel = detectLevel(s.league_name)
    const sl = syllabusLevelFromCC(ccLevel)
    const key = sl ?? ccLevel
    if (!byLevel[key]) byLevel[key] = []
    byLevel[key].push(s)
  }

  // Filter levels based on dropdown selection
  const visibleLevels = selectedLevel
    ? LEVEL_ORDER.filter(l => l === selectedLevel)
    : LEVEL_ORDER

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Syllabus & Student Progress</h1>
          <p className="text-sm text-gray-500 mt-0.5">Full curriculum with session-level progress per student</p>
        </div>
        <Suspense fallback={null}>
          <SyllabusFilter />
        </Suspense>
      </div>

      {visibleLevels.map(level => {
        const sessions = SYLLABUS[level]
        const levelStudents = byLevel[level] ?? []
        const colors = LEVEL_COLORS[level]
        if (!levelStudents.length && !ALWAYS_SHOW.has(level)) return null

        const avg = levelStudents.length
          ? Math.round(levelStudents.reduce((s, st) => s + Math.min(st.total_sessions, 24), 0) / levelStudents.length)
          : null

        return (
          <div key={level} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className={cn('text-xs font-bold px-3 py-1 rounded-full', colors.badge)}>{level}</span>
                <span className="text-sm text-gray-500">
                  {levelStudents.length ? `${levelStudents.length} students` : 'Curriculum reference'} · 24 sessions
                </span>
              </div>
              {avg !== null && (
                <span className="text-xs text-gray-400">Avg {avg}/24 sessions</span>
              )}
            </div>

            {/* Session grid legend */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="space-y-1.5">
                {sessions.map(sess => (
                  <div key={sess.session} className="flex items-center gap-2 group">
                    <div className={cn(
                      'w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold shrink-0 text-white',
                      sess.isTest ? colors.test : colors.bar
                    )}>
                      {sess.isTest ? '★' : sess.session}
                    </div>
                    <span className="text-[11px] text-gray-600 flex-1">{sess.topic}</span>
                    <CoachingGuideDrawer
                      level={level}
                      session={sess.session}
                      topic={sess.topic}
                      isTest={sess.isTest}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Student progress rows */}
            <div className="divide-y divide-gray-50">
              {levelStudents.map(s => {
                const completed = Math.min(s.total_sessions, 24)
                const pct = Math.round((completed / 24) * 100)
                return (
                  <div key={s.player_id} className="flex items-center gap-4 px-6 py-3">
                    <div className="w-32 shrink-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{s.student_name}</p>
                      <p className="text-xs text-gray-400">{completed}/24 · {pct}%</p>
                    </div>

                    {/* Progress bar mini */}
                    <div className="flex-1 flex items-center gap-0.5">
                      {sessions.map(sess => {
                        const done = sess.session <= completed
                        const isCurrent = sess.session === completed + 1
                        return (
                          <div
                            key={sess.session}
                            title={`Session ${sess.session}: ${sess.topic}`}
                            className={cn(
                              'flex-1 h-5 rounded-sm flex items-center justify-center text-[8px] font-bold',
                              sess.isTest
                                ? done ? 'bg-amber-400 text-white' : isCurrent ? 'bg-amber-100 text-amber-400' : 'bg-gray-100 text-gray-300'
                                : done ? `${colors.bar} text-white` : isCurrent ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-300'
                            )}
                          >
                            {sess.isTest ? '★' : ''}
                          </div>
                        )
                      })}
                    </div>

                    <div className="w-16 text-right shrink-0">
                      <span className="text-xs font-semibold text-gray-500">{s.rating ?? '—'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
