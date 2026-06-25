import type { Achievement, Student } from '@/types/database'

export interface AchievementContext {
  student: Student
  classesAttended: number
  puzzlesSolved: number
  gamesPlayed: number
  attendancePct: number
}

export function checkAchievementQualifies(
  achievement: Achievement,
  ctx: AchievementContext
): boolean {
  const val = achievement.trigger_value ?? 0

  switch (achievement.trigger_type) {
    case 'rating':
      return ctx.student.current_rating >= val
    case 'puzzles':
      return ctx.puzzlesSolved >= val
    case 'classes':
      return ctx.classesAttended >= val
    case 'games':
      return ctx.gamesPlayed >= val
    case 'attendance':
      return ctx.attendancePct >= val && ctx.classesAttended >= 5
    case 'custom':
      return false // manually awarded
    default:
      return false
  }
}

export function getNewlyQualified(
  achievements: Achievement[],
  earnedIds: Set<string>,
  ctx: AchievementContext
): Achievement[] {
  return achievements.filter(
    a => !earnedIds.has(a.id) && checkAchievementQualifies(a, ctx)
  )
}
