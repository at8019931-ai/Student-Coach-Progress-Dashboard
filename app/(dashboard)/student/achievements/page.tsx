import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStudentByUserId, getStudentAchievements, getRatingHistory } from '@/services/student.service'
import AchievementGrid from '@/components/student/AchievementGrid'
import RatingChart from '@/components/student/RatingChart'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Achievements' }
export const dynamic = 'force-dynamic'

export default async function AchievementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const student = await getStudentByUserId(user.id)
  if (!student) redirect('/setup-required')

  const [{ all, earned }, ratingHistory] = await Promise.all([
    getStudentAchievements(student.id),
    getRatingHistory(student.id),
  ])

  const totalPoints = earned.reduce((sum, e) => {
    const ach = all.find(a => a.id === e.achievement_id)
    return sum + (ach?.points ?? 0)
  }, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <p className="text-sm text-gray-500 mt-0.5">{earned.length} of {all.length} unlocked · {totalPoints} total points</p>
      </div>

      {/* Recent unlocks */}
      {earned.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Recently Earned</h3>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {earned.slice(0, 6).map(e => {
              const ach = all.find(a => a.id === e.achievement_id)
              if (!ach) return null
              return (
                <div key={e.id} className="shrink-0 flex flex-col items-center gap-2 p-4 bg-amber-50 border border-amber-100 rounded-xl min-w-[100px]">
                  <span className="text-3xl">{ach.badge_icon}</span>
                  <p className="text-xs font-semibold text-gray-800 text-center leading-tight">{ach.name}</p>
                  <span className="text-[10px] text-amber-600 font-medium">+{ach.points} pts</span>
                  <span className="text-[9px] text-gray-400">{formatDate(e.earned_at)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AchievementGrid all={all} earned={earned} />
        <div className="space-y-4">
          <RatingChart history={ratingHistory} joiningRating={student.joining_rating} />

          {/* Stats card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Joining Rating', value: student.joining_rating, icon: '📈' },
                { label: 'Current Rating', value: student.current_rating, icon: '⭐' },
                { label: 'Rating Gain', value: `+${student.current_rating - student.joining_rating}`, icon: '🚀' },
                { label: 'Badges Earned', value: earned.length, icon: '🏆' },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg mb-0.5">{s.icon}</p>
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
