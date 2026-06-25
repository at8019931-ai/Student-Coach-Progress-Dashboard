import { cn, formatDateTime, formatTime } from '@/lib/utils'
import type { Class } from '@/types/database'

interface UpcomingClassesProps {
  classes: Class[]
}

const classTypeLabel: Record<string, string> = {
  group: 'Group Class',
  individual: 'Private Class',
  tournament: 'Tournament Prep',
}

export default function UpcomingClasses({ classes }: UpcomingClassesProps) {
  const now = new Date()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-4">Upcoming Classes</h3>

      {classes.length === 0 ? (
        <p className="text-center py-6 text-sm text-gray-400">No upcoming classes scheduled. 📅</p>
      ) : (
        <div className="space-y-3">
          {classes.map((cls, idx) => {
            const classDate = new Date(cls.scheduled_at)
            const isNext = idx === 0
            const isToday = classDate.toDateString() === now.toDateString()

            return (
              <div
                key={cls.id}
                className={cn(
                  'flex items-center gap-3 p-3.5 rounded-xl border transition-all',
                  isNext ? 'border-primary/20 bg-primary/[0.03]' : 'border-gray-100 bg-gray-50'
                )}
              >
                {/* Date block */}
                <div className={cn(
                  'w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 text-center',
                  isNext ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                )}>
                  <span className="text-[10px] font-medium uppercase leading-none">
                    {classDate.toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-xl font-bold leading-tight">{classDate.getDate()}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {classTypeLabel[cls.class_type] ?? cls.title}
                    </p>
                    {isToday && (
                      <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded-full">
                        TODAY
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatTime(cls.scheduled_at)} · {cls.duration_mins} min
                    {cls.coach?.profile?.full_name && ` · ${cls.coach.profile.full_name}`}
                  </p>
                </div>

                {/* Join button */}
                {cls.join_url ? (
                  <a
                    href={cls.join_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      isNext
                        ? 'bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/20'
                        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                    )}
                  >
                    Join →
                  </a>
                ) : (
                  <span className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-400">
                    Soon
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
