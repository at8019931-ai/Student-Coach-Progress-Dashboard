// Supabase Edge Function: check-achievements
// Called via DB trigger on rating_history insert, daily_tasks update, attendance insert

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const { student_id } = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Get student current state
  const { data: student } = await supabase
    .from('students')
    .select('id, current_rating, user_id')
    .eq('id', student_id)
    .single()

  if (!student) return new Response(JSON.stringify({ error: 'Student not found' }), { status: 404 })

  // Compute aggregates
  const [
    { count: classesAttended },
    { data: puzzleData },
    { data: gamesData },
    { count: attendanceTotal },
    { count: presentCount },
    { data: allAchievements },
    { data: alreadyEarned },
  ] = await Promise.all([
    supabase.from('attendance').select('*', { count: 'exact', head: true })
      .eq('student_id', student_id).eq('status', 'present'),
    supabase.from('daily_tasks').select('completed_count')
      .eq('student_id', student_id).eq('task_type', 'puzzles').eq('is_completed', true),
    supabase.from('daily_tasks').select('completed_count')
      .eq('student_id', student_id).eq('task_type', 'games'),
    supabase.from('attendance').select('*', { count: 'exact', head: true })
      .eq('student_id', student_id),
    supabase.from('attendance').select('*', { count: 'exact', head: true })
      .eq('student_id', student_id).eq('status', 'present'),
    supabase.from('achievements').select('*').eq('is_active', true),
    supabase.from('student_achievements').select('achievement_id')
      .eq('student_id', student_id),
  ])

  const totalPuzzles = puzzleData?.reduce((s, t) => s + (t.completed_count ?? 0), 0) ?? 0
  const totalGames = gamesData?.reduce((s, t) => s + (t.completed_count ?? 0), 0) ?? 0
  const attendancePct = attendanceTotal ? Math.round(((presentCount ?? 0) / attendanceTotal) * 100) : 0
  const earnedIds = new Set(alreadyEarned?.map(e => e.achievement_id))

  const newlyEarned: string[] = []

  for (const ach of allAchievements ?? []) {
    if (earnedIds.has(ach.id)) continue

    let qualifies = false

    switch (ach.trigger_type) {
      case 'rating':
        qualifies = student.current_rating >= (ach.trigger_value ?? 0)
        break
      case 'puzzles':
        qualifies = totalPuzzles >= (ach.trigger_value ?? 0)
        break
      case 'classes':
        qualifies = (classesAttended ?? 0) >= (ach.trigger_value ?? 0)
        break
      case 'games':
        qualifies = totalGames >= (ach.trigger_value ?? 0)
        break
      case 'attendance':
        qualifies = attendancePct >= (ach.trigger_value ?? 0) && (attendanceTotal ?? 0) >= 5
        break
    }

    if (qualifies) {
      const { error } = await supabase.from('student_achievements').insert({
        student_id: student_id,
        achievement_id: ach.id,
      })

      if (!error) {
        newlyEarned.push(ach.id)

        // Notify student
        await supabase.from('notifications').insert({
          user_id: student.user_id,
          type: 'achievement',
          title: `Achievement unlocked: ${ach.name} ${ach.badge_icon}`,
          message: ach.description,
          link: '/student/achievements',
        })
      }
    }
  }

  return new Response(JSON.stringify({
    student_id,
    newly_earned: newlyEarned.length,
    achievements: newlyEarned,
  }))
})
