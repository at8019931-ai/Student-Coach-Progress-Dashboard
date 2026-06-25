// Supabase Edge Function: send-notifications
// Checks for overdue assignments and sends notifications
// Schedule: cron('0 9 * * *') — 9am UTC daily

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const today = new Date().toISOString().split('T')[0]

  // Find overdue pending submissions
  const { data: overdueAssignments } = await supabase
    .from('assignments')
    .select(`
      id, title, due_date, student_id,
      submissions:submissions(status, student_id)
    `)
    .lt('due_date', today)

  let notified = 0

  for (const assignment of overdueAssignments ?? []) {
    // Find students who haven't submitted
    const submittedStudentIds = new Set(
      (assignment.submissions as any[])
        ?.filter(s => s.status !== 'pending')
        .map((s: any) => s.student_id)
    )

    // Get enrolled students (if individual assignment, just that student)
    let studentIds: string[] = []
    if (assignment.student_id) {
      studentIds = [assignment.student_id]
    } else {
      const { data: students } = await supabase
        .from('students')
        .select('id')
        .eq('is_active', true)
      studentIds = students?.map(s => s.id) ?? []
    }

    for (const studentId of studentIds) {
      if (submittedStudentIds.has(studentId)) continue

      // Get user_id for notification
      const { data: student } = await supabase
        .from('students')
        .select('user_id')
        .eq('id', studentId)
        .single()

      if (!student) continue

      // Check if already notified today
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', student.user_id)
        .eq('type', 'assignment')
        .gte('created_at', today)

      if ((count ?? 0) === 0) {
        await supabase.from('notifications').insert({
          user_id: student.user_id,
          type: 'assignment',
          title: 'Overdue Assignment',
          message: `"${assignment.title}" was due on ${assignment.due_date}. Please submit ASAP.`,
          link: '/student/assignments',
        })
        notified++
      }
    }
  }

  return new Response(JSON.stringify({
    success: true,
    overdue_assignments: overdueAssignments?.length ?? 0,
    notifications_sent: notified,
  }))
})
