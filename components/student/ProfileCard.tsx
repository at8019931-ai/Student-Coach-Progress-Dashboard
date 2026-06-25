import { cn, levelColor, levelLabel, ratingDiff, formatDate, pct } from '@/lib/utils'
import type { Student } from '@/types/database'

interface ProfileCardProps {
  student: Student
  attendancePct: number
}

export default function ProfileCard({ student, attendancePct }: ProfileCardProps) {
  const profile = student.profile
  const coachName = student.coach?.profile?.full_name ?? 'Unassigned'
  const diff = student.current_rating - student.joining_rating
  const initials = profile?.full_name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() ?? 'S'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 truncate">
            {profile?.full_name ?? 'Student'}
          </h2>
          <p className="text-sm text-gray-500">Coach: {coachName}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold', levelColor(student.level))}>
              {levelLabel(student.level)}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
              Since {formatDate(student.join_date)}
            </span>
          </div>
        </div>
      </div>

      {/* Rating stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Joining</p>
          <p className="text-2xl font-bold text-gray-700">{student.joining_rating}</p>
        </div>
        <div className="bg-primary/5 rounded-xl p-3 text-center border border-primary/10">
          <p className="text-xs text-primary/70 mb-1">Current</p>
          <p className="text-2xl font-bold text-primary">{student.current_rating}</p>
        </div>
        <div className={cn(
          'rounded-xl p-3 text-center',
          diff >= 0 ? 'bg-green-50' : 'bg-red-50'
        )}>
          <p className={cn('text-xs mb-1', diff >= 0 ? 'text-green-600' : 'text-red-500')}>
            Growth
          </p>
          <p className={cn('text-2xl font-bold', diff >= 0 ? 'text-green-600' : 'text-red-500')}>
            {ratingDiff(student.current_rating, student.joining_rating)}
          </p>
        </div>
      </div>

      {/* Attendance */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-gray-600">Attendance</span>
          <span className={cn(
            'text-xs font-bold',
            attendancePct >= 80 ? 'text-green-600' : attendancePct >= 60 ? 'text-amber-500' : 'text-red-500'
          )}>
            {attendancePct}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              attendancePct >= 80 ? 'bg-green-500' : attendancePct >= 60 ? 'bg-amber-400' : 'bg-red-500'
            )}
            style={{ width: `${attendancePct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
