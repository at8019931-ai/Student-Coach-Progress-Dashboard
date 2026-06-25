import { cn, pct } from '@/lib/utils'
import type { MonthlyGoal, GoalProgress } from '@/types/database'

interface MonthlyGoalsProps {
  goal: MonthlyGoal | null
  progress: GoalProgress | null
}

interface GoalRowProps {
  label: string
  icon: string
  current: number
  target: number
  percentage: number
  color: string
}

function GoalRow({ label, icon, current, target, percentage, color }: GoalRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {current} <span className="text-gray-400 font-normal">/ {target}</span>
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', color)}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>
      <div className="flex justify-end mt-0.5">
        <span className="text-xs text-gray-400">{Math.min(100, percentage)}%</span>
      </div>
    </div>
  )
}

export default function MonthlyGoals({ goal, progress }: MonthlyGoalsProps) {
  if (!goal || !progress) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 mb-3">Monthly Goals</h3>
        <p className="text-center py-6 text-sm text-gray-400">
          No goals set yet. Your coach will set goals for you soon! 🎯
        </p>
      </div>
    )
  }

  const month = new Date(goal.month).toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Monthly Goals</h3>
        <span className="text-xs text-gray-400 font-medium">{month}</span>
      </div>

      <div className="space-y-4">
        {goal.target_rating && (
          <GoalRow
            label="Rating Goal"
            icon="⭐"
            current={progress.rating.current}
            target={progress.rating.target}
            percentage={progress.rating.pct}
            color="bg-primary"
          />
        )}
        {goal.target_puzzles && (
          <GoalRow
            label="Puzzles Solved"
            icon="🧩"
            current={progress.puzzles.current}
            target={progress.puzzles.target}
            percentage={progress.puzzles.pct}
            color="bg-amber-400"
          />
        )}
        {goal.target_classes && (
          <GoalRow
            label="Classes Attended"
            icon="📚"
            current={progress.classes.current}
            target={progress.classes.target}
            percentage={progress.classes.pct}
            color="bg-green-500"
          />
        )}
        {goal.target_games && (
          <GoalRow
            label="Games Played"
            icon="♟"
            current={progress.games.current}
            target={progress.games.target}
            percentage={progress.games.pct}
            color="bg-blue-500"
          />
        )}
      </div>
    </div>
  )
}
