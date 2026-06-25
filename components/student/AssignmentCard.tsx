import { cn, dueDateLabel, formatDate } from '@/lib/utils'
import type { Assignment } from '@/types/database'

interface AssignmentCardProps {
  assignment: Assignment
  onSubmit?: (id: string) => void
}

export default function AssignmentCard({ assignment, onSubmit }: AssignmentCardProps) {
  const status = assignment.submission?.status ?? 'pending'
  const label = dueDateLabel(assignment.due_date)
  const isOverdue = label === 'Overdue'

  const statusConfig = {
    pending: { label: 'Pending', style: 'bg-amber-50 text-amber-700 border-amber-100' },
    submitted: { label: 'Submitted', style: 'bg-blue-50 text-blue-700 border-blue-100' },
    graded: { label: 'Graded', style: 'bg-green-50 text-green-700 border-green-100' },
    overdue: { label: 'Overdue', style: 'bg-red-50 text-red-600 border-red-100' },
  }

  const effectiveStatus = isOverdue && status === 'pending' ? 'overdue' : status
  const sc = statusConfig[effectiveStatus] ?? statusConfig.pending

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-xl border transition-all',
      isOverdue && status === 'pending' ? 'bg-red-50/50 border-red-100' : 'bg-gray-50 border-gray-100'
    )}>
      <span className="text-xl mt-0.5">📋</span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{assignment.title}</p>
        {assignment.description && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{assignment.description}</p>
        )}
        <p className={cn(
          'text-xs font-medium mt-1.5',
          isOverdue ? 'text-red-500' : 'text-gray-400'
        )}>
          {isOverdue ? '⚠️ ' : '📅 '}{label}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border', sc.style)}>
          {sc.label}
        </span>
        {status === 'graded' && assignment.submission?.grade != null && (
          <span className="text-xs font-bold text-primary">{assignment.submission.grade}/100</span>
        )}
      </div>
    </div>
  )
}
