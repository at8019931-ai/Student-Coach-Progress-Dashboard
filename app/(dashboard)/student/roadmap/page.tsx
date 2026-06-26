import { cn } from '@/lib/utils'
import { SYLLABUS, syllabusLevelFromCC } from '@/lib/syllabus'
import { fetchAllStudentProgress, deduplicateStudents, detectLevel } from '@/lib/cc-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Student Journey" }
export const dynamic = 'force-dynamic'

export default async function StudentRoadmapPage() {
  const rawStudents = await fetchAllStudentProgress().catch(() => [])
  const students = deduplicateStudents(rawStudents)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Journey</h1>
        <p className="text-sm text-gray-500 mt-0.5">Session-by-session curriculum progress for all students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {students.map(s => {
          const ccLevel = detectLevel(s.league_name)
          const syllabusLevel = syllabusLevelFromCC(ccLevel)
          const sessions = syllabusLevel ? SYLLABUS[syllabusLevel] : null
          const completedSessions = Math.min(s.total_sessions, 24)
          const pct = sessions ? Math.round((completedSessions / 24) * 100) : 0

          return (
            <div key={s.player_id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                  {s.student_name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate text-sm">{s.student_name}</p>
                  <p className="text-xs text-gray-400">{ccLevel} · {completedSessions}/24 sessions</p>
                </div>
                <span className="text-xs font-bold text-primary shrink-0">{pct}%</span>
              </div>

              <div className="h-1.5 bg-gray-100 rounded-full mb-3">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>

              {sessions && (
                <div className="grid grid-cols-6 gap-1">
                  {sessions.map(sess => {
                    const done = sess.session <= completedSessions
                    const current = sess.session === completedSessions + 1
                    return (
                      <div
                        key={sess.session}
                        title={`Session ${sess.session}: ${sess.topic}`}
                        className={cn(
                          'w-full aspect-square rounded flex items-center justify-center text-[9px] font-bold cursor-default',
                          sess.isTest
                            ? done ? 'bg-amber-400 text-white' : current ? 'bg-amber-200 text-amber-700' : 'bg-amber-50 text-amber-300'
                            : done ? 'bg-primary text-white' : current ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-300'
                        )}
                      >
                        {sess.isTest ? '★' : sess.session}
                      </div>
                    )
                  })}
                </div>
              )}

              {!sessions && (
                <p className="text-xs text-gray-400 text-center py-2">Level: {ccLevel}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
