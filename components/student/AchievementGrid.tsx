import { cn } from '@/lib/utils'
import type { Achievement, StudentAchievement } from '@/types/database'

interface AchievementGridProps {
  all: Achievement[]
  earned: StudentAchievement[]
  compact?: boolean
}

export default function AchievementGrid({ all, earned, compact = false }: AchievementGridProps) {
  const earnedIds = new Set(earned.map(e => e.achievement_id))
  const recentIds = new Set(
    [...earned]
      .sort((a, b) => new Date(b.earned_at).getTime() - new Date(a.earned_at).getTime())
      .slice(0, 3)
      .map(e => e.achievement_id)
  )

  const display = compact ? all.slice(0, 9) : all

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Achievements</h3>
        <span className="text-sm text-gray-500">
          {earned.length}/{all.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {display.map(achievement => {
          const isEarned = earnedIds.has(achievement.id)
          const isRecent = recentIds.has(achievement.id)

          return (
            <div
              key={achievement.id}
              className={cn(
                'relative flex flex-col items-center p-3 rounded-xl border transition-all text-center',
                isEarned
                  ? 'border-amber-100 bg-amber-50/50'
                  : 'border-gray-100 bg-gray-50 opacity-50 grayscale'
              )}
              title={achievement.description}
            >
              {isRecent && (
                <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold px-1.5 py-0.5 bg-primary text-white rounded-full animate-badge-pop">
                  NEW
                </span>
              )}
              <span className={cn(
                'text-2xl mb-1.5',
                !isEarned && 'opacity-30'
              )}>
                {isEarned ? achievement.badge_icon : '🔒'}
              </span>
              <p className={cn(
                'text-[10px] font-semibold leading-tight',
                isEarned ? 'text-gray-800' : 'text-gray-400'
              )}>
                {achievement.name}
              </p>
              {isEarned && (
                <span className="mt-1 text-[9px] font-medium px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded-full">
                  +{achievement.points} pts
                </span>
              )}
            </div>
          )
        })}
      </div>

      {compact && all.length > 9 && (
        <p className="text-center mt-3 text-xs text-gray-400">
          +{all.length - 9} more achievements to unlock
        </p>
      )}
    </div>
  )
}
