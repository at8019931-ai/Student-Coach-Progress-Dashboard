import type { CCStudentData } from '@/lib/cc-queries'
import { cn } from '@/lib/utils'

function StatCard({ label, value, icon, color = 'text-primary' }: {
  label: string; value: string | number; icon: string; color?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-2xl mb-2">{icon}</p>
      <p className={cn('text-3xl font-bold', color)}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}

export default function CCDashboard({ data }: { data: CCStudentData }) {
  const draws = data.matches_played - data.wins - data.losses

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {data.student_name.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {data.league_name ?? 'CircleChess'} · Player #{data.player_id}
        </p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Rating"           value={data.rating}                          icon="⭐" color="text-amber-500" />
        <StatCard label="Total Points"     value={data.total_points}                    icon="🏆" color="text-primary" />
        <StatCard label="Last 30d Points"  value={data.last_30_days_points}             icon="📈" color="text-green-600" />
        <StatCard label="Win Rate"         value={`${data.win_percentage}%`}            icon="🎯" color="text-blue-600" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Match stats */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">Match Record</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-green-600">{data.wins}</p>
              <p className="text-xs text-gray-500 mt-1">Wins</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-gray-500">{draws < 0 ? 0 : draws}</p>
              <p className="text-xs text-gray-500 mt-1">Draws</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-red-500">{data.losses}</p>
              <p className="text-xs text-gray-500 mt-1">Losses</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">{data.matches_played} total games played</p>
          </div>
        </div>

        {/* Subscription info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">Subscription</h2>
          {data.class_name ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Class</span>
                <span className="text-sm font-semibold text-gray-900">{data.class_name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className={cn(
                  'text-xs font-bold px-2 py-0.5 rounded-full',
                  data.subscription_status === 1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                )}>
                  {data.subscription_status === 1 ? 'Active' : 'Inactive'}
                </span>
              </div>
              {data.total_sessions && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Sessions</span>
                  <span className="text-sm font-semibold text-gray-900">{data.total_sessions}</span>
                </div>
              )}
              {data.subscription_start_date && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Start Date</span>
                  <span className="text-sm text-gray-700">
                    {new Date(data.subscription_start_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              {data.subscription_end_date && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">End Date</span>
                  <span className="text-sm text-gray-700">
                    {new Date(data.subscription_end_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">No active subscription</p>
          )}
        </div>

        {/* League info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">League Standing</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">League</span>
              <span className="text-sm font-semibold text-gray-900">{data.league_name ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Rating</span>
              <span className="text-xl font-bold text-amber-500">{data.rating}</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Points this month</span>
                <span className="font-semibold text-primary">{data.last_30_days_points}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">All-time points</span>
                <span className="font-semibold text-gray-900">{data.total_points}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
