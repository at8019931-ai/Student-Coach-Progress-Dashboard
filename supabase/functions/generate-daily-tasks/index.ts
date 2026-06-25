// Supabase Edge Function: generate-daily-tasks
// Schedule: cron('0 0 * * *') — runs at midnight UTC daily

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TASK_TEMPLATES = {
  beginner: [
    { task_type: 'class',      title: 'Attend Class',        target_count: 1 },
    { task_type: 'puzzles',    title: 'Solve 10 Puzzles',    target_count: 10 },
    { task_type: 'games',      title: 'Play 2 Games',        target_count: 2 },
    { task_type: 'lesson',     title: 'Watch a Lesson',      target_count: 1 },
  ],
  intermediate: [
    { task_type: 'class',      title: 'Attend Class',        target_count: 1 },
    { task_type: 'puzzles',    title: 'Solve 20 Puzzles',    target_count: 20 },
    { task_type: 'analysis',   title: 'Analyze 1 Game',      target_count: 1 },
    { task_type: 'assignment', title: 'Complete Assignment',  target_count: 1 },
  ],
  advanced: [
    { task_type: 'class',      title: 'Attend Class',        target_count: 1 },
    { task_type: 'puzzles',    title: 'Solve 30 Puzzles',    target_count: 30 },
    { task_type: 'analysis',   title: 'Analyze 2 Games',     target_count: 2 },
    { task_type: 'lesson',     title: 'Study Opening Prep',  target_count: 1 },
  ],
}

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const today = new Date().toISOString().split('T')[0]

  // Get all active students
  const { data: students, error } = await supabase
    .from('students')
    .select('id, level')
    .eq('is_active', true)

  if (error || !students?.length) {
    return new Response(JSON.stringify({ error: error?.message ?? 'No students' }), { status: 400 })
  }

  let created = 0
  for (const student of students) {
    const templates = TASK_TEMPLATES[student.level as keyof typeof TASK_TEMPLATES] ?? TASK_TEMPLATES.beginner

    for (const template of templates) {
      const { error: insertError } = await supabase
        .from('daily_tasks')
        .upsert({
          student_id: student.id,
          task_date: today,
          task_type: template.task_type,
          title: template.title,
          target_count: template.target_count,
          completed_count: 0,
          is_completed: false,
        }, { onConflict: 'student_id,task_date,task_type' })

      if (!insertError) created++
    }
  }

  return new Response(JSON.stringify({
    success: true,
    date: today,
    students: students.length,
    tasks_created: created,
  }))
})
