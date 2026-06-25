import { cn } from '@/lib/utils'
import type { StudentLesson, LessonStatus } from '@/types/database'

interface LearningRoadmapProps {
  roadmap: StudentLesson[]
  compact?: boolean
}

const statusConfig: Record<LessonStatus, { icon: string; label: string; style: string; dotStyle: string }> = {
  completed:   { icon: '✓', label: 'Complete',   style: 'text-green-700 line-through',       dotStyle: 'bg-green-500 text-white' },
  in_progress: { icon: '↻', label: 'In Progress', style: 'text-gray-900 font-semibold',       dotStyle: 'bg-primary text-white' },
  todo:        { icon: '🔒', label: 'Locked',      style: 'text-gray-400',                    dotStyle: 'bg-gray-200 text-gray-400' },
}

export default function LearningRoadmap({ roadmap, compact = false }: LearningRoadmapProps) {
  const display = compact ? roadmap.slice(0, 6) : roadmap

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Learning Roadmap</h3>
        <span className="text-xs text-gray-400">
          {roadmap.filter(r => r.status === 'completed').length}/{roadmap.length} complete
        </span>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gray-100" />

        <div className="space-y-3">
          {display.map((sl, idx) => {
            const config = statusConfig[sl.status]
            const lesson = sl.lesson

            return (
              <div key={sl.id} className="relative flex items-start gap-3 pl-2">
                {/* Status dot */}
                <div className={cn(
                  'relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0',
                  config.dotStyle
                )}>
                  {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn('text-sm', config.style)}>
                      {lesson?.title ?? `Lesson ${idx + 1}`}
                    </p>
                    <span className={cn(
                      'shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full',
                      sl.status === 'completed' ? 'bg-green-100 text-green-700' :
                      sl.status === 'in_progress' ? 'bg-primary/10 text-primary' :
                      'bg-gray-100 text-gray-400'
                    )}>
                      {config.label}
                    </span>
                  </div>
                  {lesson?.estimated_mins && sl.status !== 'todo' && (
                    <p className="text-[11px] text-gray-400 mt-0.5">~{lesson.estimated_mins} min</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {compact && roadmap.length > 6 && (
        <p className="text-center mt-4 text-xs text-gray-400">
          +{roadmap.length - 6} more topics in your roadmap
        </p>
      )}
    </div>
  )
}
