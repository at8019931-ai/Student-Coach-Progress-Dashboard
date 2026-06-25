import { createClient } from '@/lib/supabase/server'
import { firstDayOfMonth, pct } from '@/lib/utils'
import type {
  Student, DailyTask, Class, MonthlyGoal, GoalProgress,
  Feedback, StudentAchievement, Achievement, StudentLesson,
  RatingHistory, Assignment, StudentDashboard
} from '@/types/database'

export async function getStudentByUserId(userId: string): Promise<Student | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_user_id_fkey(*),
      coach:coaches(*, profile:profiles!coaches_user_id_fkey(*))
    `)
    .eq('user_id', userId)
    .single()
  return data
}

export async function getStudentById(studentId: string): Promise<Student | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_user_id_fkey(*),
      coach:coaches(*, profile:profiles!coaches_user_id_fkey(*))
    `)
    .eq('id', studentId)
    .single()
  return data
}

export async function getStudentsByCoach(coachId: string): Promise<Student[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_user_id_fkey(*),
      coach:coaches(*, profile:profiles!coaches_user_id_fkey(*))
    `)
    .eq('coach_id', coachId)
    .eq('is_active', true)
    .order('created_at', { ascending: true })
  return data ?? []
}

export async function getTodayTasks(studentId: string): Promise<DailyTask[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase
    .from('daily_tasks')
    .select('*')
    .eq('student_id', studentId)
    .eq('task_date', today)
    .order('created_at')
  return data ?? []
}

export async function completeTask(taskId: string): Promise<void> {
  const supabase = await createClient()
  await supabase
    .from('daily_tasks')
    .update({
      is_completed: true,
      completed_at: new Date().toISOString(),
      completed_count: 999, // will be capped by target_count
    })
    .eq('id', taskId)
}

export async function getUpcomingClasses(studentId: string, limit = 5): Promise<Class[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('class_enrollments')
    .select(`class:classes(*, coach:coaches(*, profile:profiles!coaches_user_id_fkey(*)))`)
    .eq('student_id', studentId)
    .order('class(scheduled_at)', { ascending: true })
    .limit(limit)
  return (data?.map((d: any) => d.class).filter(Boolean) ?? []) as Class[]
}

export async function getCurrentGoal(studentId: string): Promise<MonthlyGoal | null> {
  const supabase = await createClient()
  const month = firstDayOfMonth()
  const { data } = await supabase
    .from('monthly_goals')
    .select('*')
    .eq('student_id', studentId)
    .eq('month', month)
    .single()
  return data
}

export async function getGoalProgress(studentId: string, goal: MonthlyGoal): Promise<GoalProgress> {
  const supabase = await createClient()
  const monthStart = goal.month
  const monthEnd = new Date(new Date(monthStart).getFullYear(), new Date(monthStart).getMonth() + 1, 0)
    .toISOString().split('T')[0]

  // puzzles solved this month: sum of completed puzzle tasks
  const { data: puzzleData } = await supabase
    .from('daily_tasks')
    .select('completed_count')
    .eq('student_id', studentId)
    .eq('task_type', 'puzzles')
    .eq('is_completed', true)
    .gte('task_date', monthStart)
    .lte('task_date', monthEnd)
  const puzzlesDone = puzzleData?.reduce((s, t) => s + (t.completed_count ?? 0), 0) ?? 0

  // classes attended
  const { count: classesAttended } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', studentId)
    .eq('status', 'present')

  // games played
  const { data: gamesData } = await supabase
    .from('daily_tasks')
    .select('completed_count')
    .eq('student_id', studentId)
    .eq('task_type', 'games')
    .gte('task_date', monthStart)
    .lte('task_date', monthEnd)
  const gamesDone = gamesData?.reduce((s, t) => s + (t.completed_count ?? 0), 0) ?? 0

  // current rating from students table
  const { data: studentData } = await supabase
    .from('students')
    .select('current_rating')
    .eq('id', studentId)
    .single()
  const currentRating = studentData?.current_rating ?? 0

  return {
    rating: {
      current: currentRating,
      target: goal.target_rating ?? 0,
      pct: pct(currentRating, goal.target_rating ?? 1),
    },
    puzzles: {
      current: puzzlesDone,
      target: goal.target_puzzles ?? 0,
      pct: pct(puzzlesDone, goal.target_puzzles ?? 1),
    },
    classes: {
      current: classesAttended ?? 0,
      target: goal.target_classes ?? 0,
      pct: pct(classesAttended ?? 0, goal.target_classes ?? 1),
    },
    games: {
      current: gamesDone,
      target: goal.target_games ?? 0,
      pct: pct(gamesDone, goal.target_games ?? 1),
    },
  }
}

export async function getStudentAchievements(studentId: string): Promise<{
  all: Achievement[]
  earned: StudentAchievement[]
}> {
  const supabase = await createClient()
  const [{ data: all }, { data: earned }] = await Promise.all([
    supabase.from('achievements').select('*').eq('is_active', true).order('trigger_value'),
    supabase.from('student_achievements')
      .select('*, achievement:achievements(*)')
      .eq('student_id', studentId)
      .order('earned_at', { ascending: false }),
  ])
  return { all: all ?? [], earned: earned ?? [] }
}

export async function getLatestFeedback(studentId: string): Promise<Feedback | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('feedback')
    .select('*, coach:coaches(*, profile:profiles!coaches_user_id_fkey(*))')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return data
}

export async function getAllFeedback(studentId: string): Promise<Feedback[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('feedback')
    .select('*, coach:coaches(*, profile:profiles!coaches_user_id_fkey(*))')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getStudentRoadmap(studentId: string, level: string): Promise<StudentLesson[]> {
  const supabase = await createClient()
  // Get all lessons for the level
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('level', level)
    .order('sequence_order')

  // Get student progress
  const { data: progress } = await supabase
    .from('student_lessons')
    .select('*')
    .eq('student_id', studentId)

  const progressMap = new Map(progress?.map(p => [p.lesson_id, p]))

  return (lessons ?? []).map(lesson => {
    const prog = progressMap.get(lesson.id)
    return prog
      ? { ...prog, lesson }
      : {
          id: crypto.randomUUID(),
          student_id: studentId,
          lesson_id: lesson.id,
          status: 'todo' as const,
          started_at: null,
          completed_at: null,
          lesson,
        }
  })
}

export async function getRatingHistory(studentId: string): Promise<RatingHistory[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('rating_history')
    .select('*')
    .eq('student_id', studentId)
    .order('recorded_at', { ascending: true })
    .limit(12)
  return data ?? []
}

export async function getStudentAssignments(studentId: string): Promise<Assignment[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('assignments')
    .select(`*, submission:submissions!submissions_assignment_id_fkey(*)`)
    .or(`student_id.eq.${studentId},student_id.is.null`)
    .order('due_date', { ascending: true })
  return data ?? []
}

export async function getAttendancePct(studentId: string): Promise<number> {
  const supabase = await createClient()
  const [{ count: total }, { count: present }] = await Promise.all([
    supabase.from('attendance').select('*', { count: 'exact', head: true }).eq('student_id', studentId),
    supabase.from('attendance').select('*', { count: 'exact', head: true })
      .eq('student_id', studentId).eq('status', 'present'),
  ])
  if (!total) return 0
  return Math.round(((present ?? 0) / total) * 100)
}

export async function getFullStudentDashboard(userId: string): Promise<StudentDashboard | null> {
  const student = await getStudentByUserId(userId)
  if (!student) return null

  const [
    todayTasks,
    upcomingClasses,
    currentGoal,
    { all: allAchievements, earned: earnedAchievements },
    recentFeedback,
    roadmap,
    ratingHistory,
    pendingAssignments,
    attendancePct,
  ] = await Promise.all([
    getTodayTasks(student.id),
    getUpcomingClasses(student.id),
    getCurrentGoal(student.id),
    getStudentAchievements(student.id),
    getLatestFeedback(student.id),
    getStudentRoadmap(student.id, student.level),
    getRatingHistory(student.id),
    getStudentAssignments(student.id),
    getAttendancePct(student.id),
  ])

  let goalProgress = null
  if (currentGoal) {
    goalProgress = await getGoalProgress(student.id, currentGoal)
  }

  return {
    student,
    todayTasks,
    upcomingClasses,
    currentGoal,
    goalProgress,
    recentFeedback,
    achievements: earnedAchievements,
    roadmap,
    ratingHistory,
    attendancePct,
    pendingAssignments: pendingAssignments.filter(
      a => !a.submission || a.submission.status === 'pending'
    ),
    _allAchievements: allAchievements,
  } as StudentDashboard & { _allAchievements: Achievement[] }
}
