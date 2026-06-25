import { cn } from '@/lib/utils'
import { fetchAllStudentProgress, deduplicateStudents, detectLevel } from '@/lib/cc-explorer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analytics — Admin' }
export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const rawCCStudents = await fetchAllStudentProgress().catch(() => [])
  const ccStudents = deduplicateStudents(rawCCStudents)
  const totalStudents = ccStudents.length

  const levelCounts: Record<string, number> = {}
  for (const s of ccStudents) {
    const lv = detectLevel(s.league_name)
    levelCounts[lv] = (levelCounts[lv] ?? 0) + 1
  }

  const avgRating = (() => {
    const rated = ccStudents.filter(s => s.rating)
    if (!rated.length) return 0
    return Math.round(rated.reduce((sum, s) => sum + (s.rating ?? 0), 0) / rated.length)
  })()

  const avgWinPct = (() => {
    const played = ccStudents.filter(s => s.matches_played > 0)
    if (!played.length) return 0
    return Math.round(played.reduce((sum, s) => sum + Number(s.win_percentage), 0) / played.length)
  })()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Academy Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Live data from CircleChess Explorer</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students',  value: totalStudents,               icon: '👥', color: 'text-primary' },
          { label: 'Total Enrolments',value: rawCCStudents.length,        icon: '📋', color: 'text-blue-600' },
          { label: 'Avg Rating',      value: avgRating || '—',            icon: '⭐', color: 'text-amber-500' },
          { label: 'Avg Win Rate',    value: avgWinPct ? `${avgWinPct}%` : '—', icon: '🏆', color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl mb-2">{s.icon}</p>
            <p className={cn('text-3xl font-bold', s.color)}>{s.value}</p>
            <p className="text-sm text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Level distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-1">Student Level Distribution</h2>
          <p className="text-xs text-gray-400 mb-4">{totalStudents} unique active students</p>
          <div className="space-y-3">
            {[
              { level: 'Foundation 1', color: 'bg-sky-400',     textColor: 'text-sky-700',     bg: 'bg-sky-50' },
              { level: 'Foundation 2', color: 'bg-blue-400',    textColor: 'text-blue-700',    bg: 'bg-blue-50' },
              { level: 'Foundation 3', color: 'bg-indigo-400',  textColor: 'text-indigo-700',  bg: 'bg-indigo-50' },
              { level: 'Foundation 4', color: 'bg-violet-400',  textColor: 'text-violet-700',  bg: 'bg-violet-50' },
              { level: 'Beginner',     color: 'bg-emerald-400', textColor: 'text-emerald-700', bg: 'bg-emerald-50' },
              { level: 'Intermediate', color: 'bg-amber-400',   textColor: 'text-amber-700',   bg: 'bg-amber-50' },
              { level: 'Advanced',     color: 'bg-rose-400',    textColor: 'text-rose-700',    bg: 'bg-rose-50' },
            ].map(({ level, color, textColor, bg }) => {
              const count = levelCounts[level] ?? 0
              const pct = totalStudents ? Math.round((count / totalStudents) * 100) : 0
              return (
                <div key={level}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', bg, textColor)}>{level}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {count} <span className="text-gray-400 font-normal text-xs">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top students by rating */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Top Students by Rating</h2>
          <div className="space-y-3">
            {ccStudents
              .filter(s => s.rating)
              .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
              .slice(0, 8)
              .map((s, i) => (
                <div key={s.player_id} className="flex items-center gap-3">
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                    i === 0 ? 'bg-amber-100 text-amber-600' :
                    i === 1 ? 'bg-gray-100 text-gray-600' :
                    i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'
                  )}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{s.student_name}</p>
                    <p className="text-xs text-gray-400">{s.league_name ?? '—'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">{s.rating}</p>
                    <p className="text-xs text-gray-400">{Number(s.total_points).toFixed(0)} pts</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Student progress table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Student Progress Data</h2>
          <p className="text-xs text-gray-400 mt-0.5">{totalStudents} unique · {rawCCStudents.length} total enrolments · live from CircleChess</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">League</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total Pts</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">30d Pts</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">W / L</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Win%</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Sub Ends</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ccStudents.map(s => {
                const endDate = s.subscription_end_date ? new Date(s.subscription_end_date) : null
                const daysLeft = endDate ? Math.ceil((endDate.getTime() - Date.now()) / 86400000) : null
                return (
                  <tr key={s.player_id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 whitespace-nowrap">{s.student_name}</p>
                      <p className="text-xs text-gray-400">#{s.player_id}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{s.league_name ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-bold text-amber-500">{s.rating ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">{Number(s.total_points).toFixed(0)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600">{Number(s.last_30_days_points).toFixed(0)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      <span className="text-green-600">{s.wins}</span>
                      <span className="text-gray-300 mx-1">/</span>
                      <span className="text-red-500">{s.losses}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={cn('font-semibold',
                        Number(s.win_percentage) >= 60 ? 'text-green-600' :
                        Number(s.win_percentage) >= 40 ? 'text-amber-500' : 'text-gray-400'
                      )}>
                        {s.matches_played > 0 ? `${s.win_percentage}%` : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {endDate ? (
                        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap',
                          daysLeft !== null && daysLeft <= 14 ? 'bg-red-100 text-red-600' :
                          daysLeft !== null && daysLeft <= 30 ? 'bg-amber-100 text-amber-600' :
                          'bg-green-100 text-green-700'
                        )}>
                          {endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
