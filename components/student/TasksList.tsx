'use client'

import { useState, useTransition } from 'react'
import { cn, taskIcon, pct } from '@/lib/utils'
import type { DailyTask } from '@/types/database'

interface TasksListProps {
  tasks: DailyTask[]
  onComplete: (taskId: string) => Promise<void>
}

export default function TasksList({ tasks, onComplete }: TasksListProps) {
  const [pending, startTransition] = useTransition()
  const [completingId, setCompletingId] = useState<string | null>(null)

  const completed = tasks.filter(t => t.is_completed).length
  const progressPct = pct(completed, tasks.length)

  async function handleComplete(taskId: string) {
    setCompletingId(taskId)
    startTransition(async () => {
      await onComplete(taskId)
      setCompletingId(null)
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Today&apos;s Tasks</h3>
        <span className="text-sm text-gray-500">{completed}/{tasks.length} done</span>
      </div>

      {/* Overall progress */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Task items */}
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-center py-6 text-sm text-gray-400">No tasks for today. Check back soon! 🎯</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border transition-all',
                task.is_completed
                  ? 'bg-green-50 border-green-100'
                  : 'bg-gray-50 border-gray-100 hover:border-gray-200'
              )}
            >
              {/* Check button */}
              <button
                onClick={() => !task.is_completed && handleComplete(task.id)}
                disabled={task.is_completed || completingId === task.id}
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                  task.is_completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-primary',
                  completingId === task.id && 'animate-pulse'
                )}
                aria-label={`Mark ${task.title} complete`}
              >
                {task.is_completed && (
                  <svg className="w-3 h-3" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              {/* Icon + title */}
              <span className="text-base">{taskIcon(task.task_type)}</span>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium',
                  task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'
                )}>
                  {task.title}
                </p>
                {task.target_count > 1 && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {task.completed_count}/{task.target_count}
                  </p>
                )}
              </div>

              {/* Status badge */}
              <span className={cn(
                'text-xs font-semibold px-2 py-0.5 rounded-full shrink-0',
                task.is_completed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-500'
              )}>
                {task.is_completed ? 'Done' : 'Pending'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
