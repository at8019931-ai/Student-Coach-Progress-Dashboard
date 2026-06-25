import { createClient } from '@/lib/supabase/server'
import type { Coach, Assignment, Feedback, MonthlyGoal, Class } from '@/types/database'

export async function getCoachByUserId(userId: string): Promise<Coach | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('coaches')
    .select('*, profile:profiles!coaches_user_id_fkey(*)')
    .eq('user_id', userId)
    .single()
  return data
}

export async function getCoachById(coachId: string): Promise<Coach | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('coaches')
    .select('*, profile:profiles!coaches_user_id_fkey(*)')
    .eq('id', coachId)
    .single()
  return data
}

export async function createAssignment(data: {
  coach_id: string
  student_id?: string | null
  title: string
  description?: string
  due_date: string
  level_target?: string
}): Promise<Assignment | null> {
  const supabase = await createClient()
  const { data: result } = await supabase
    .from('assignments')
    .insert(data)
    .select()
    .single()
  return result
}

export async function createFeedback(data: {
  coach_id: string
  student_id: string
  content: string
  strengths?: string[]
  improvements?: string[]
  class_id?: string
}): Promise<Feedback | null> {
  const supabase = await createClient()

  const { data: result } = await supabase
    .from('feedback')
    .insert(data)
    .select()
    .single()

  // Create notification for student
  if (result) {
    const { data: student } = await supabase
      .from('students')
      .select('user_id')
      .eq('id', data.student_id)
      .single()

    if (student) {
      await supabase.from('notifications').insert({
        user_id: student.user_id,
        type: 'feedback',
        title: 'New feedback from your coach!',
        message: data.content.slice(0, 100) + (data.content.length > 100 ? '…' : ''),
        link: '/student/assignments',
      })
    }
  }

  return result
}

export async function setMonthlyGoal(data: {
  student_id: string
  coach_id: string
  month: string
  target_rating?: number
  target_puzzles?: number
  target_classes?: number
  target_games?: number
  notes?: string
}): Promise<MonthlyGoal | null> {
  const supabase = await createClient()
  const { data: result } = await supabase
    .from('monthly_goals')
    .upsert(data, { onConflict: 'student_id,month' })
    .select()
    .single()
  return result
}

export async function markAttendance(entries: {
  student_id: string
  class_id: string
  status: 'present' | 'absent' | 'late'
}[]): Promise<void> {
  const supabase = await createClient()
  await supabase.from('attendance').upsert(entries, { onConflict: 'student_id,class_id' })
}

export async function updateStudentLevel(
  studentId: string,
  level: 'beginner' | 'intermediate' | 'advanced'
): Promise<void> {
  const supabase = await createClient()
  await supabase.from('students').update({ level }).eq('id', studentId)
}

export async function updateStudentRating(
  studentId: string,
  rating: number
): Promise<void> {
  const supabase = await createClient()
  await Promise.all([
    supabase.from('students').update({ current_rating: rating }).eq('id', studentId),
    supabase.from('rating_history').insert({
      student_id: studentId,
      rating,
      source: 'manual',
    }),
  ])
}

export async function getCoachClasses(coachId: string): Promise<Class[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('classes')
    .select('*, coach:coaches(*, profile:profiles!coaches_user_id_fkey(*))')
    .eq('coach_id', coachId)
    .order('scheduled_at', { ascending: false })
  return data ?? []
}

export async function createClass(data: {
  coach_id: string
  title: string
  description?: string
  class_type: string
  scheduled_at: string
  duration_mins?: number
  join_url?: string
}): Promise<Class | null> {
  const supabase = await createClient()
  const { data: result } = await supabase
    .from('classes')
    .insert(data)
    .select()
    .single()
  return result
}

export async function awardAchievement(
  studentId: string,
  achievementId: string
): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('student_achievements')
    .insert({ student_id: studentId, achievement_id: achievementId })

  if (!error) {
    const { data: ach } = await supabase
      .from('achievements')
      .select('name, badge_icon')
      .eq('id', achievementId)
      .single()

    const { data: student } = await supabase
      .from('students')
      .select('user_id')
      .eq('id', studentId)
      .single()

    if (ach && student) {
      await supabase.from('notifications').insert({
        user_id: student.user_id,
        type: 'achievement',
        title: `Achievement unlocked: ${ach.name} ${ach.badge_icon}`,
        message: `You earned the "${ach.name}" badge!`,
        link: '/student/achievements',
      })
    }
  }
}
