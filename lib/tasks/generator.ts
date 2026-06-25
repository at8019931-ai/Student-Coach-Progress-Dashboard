import type { StudentLevel, TaskType } from '@/types/database'

interface TaskTemplate {
  task_type: TaskType
  title: string
  target_count: number
}

export const DAILY_TASK_TEMPLATES: Record<StudentLevel, TaskTemplate[]> = {
  beginner: [
    { task_type: 'class',      title: 'Attend Class',        target_count: 1 },
    { task_type: 'puzzles',    title: 'Solve 10 Puzzles',    target_count: 10 },
    { task_type: 'games',      title: 'Play 2 Games',        target_count: 2 },
    { task_type: 'lesson',     title: 'Watch Lesson',        target_count: 1 },
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

export function getTasksForLevel(
  studentId: string,
  level: StudentLevel,
  date: string
): Array<TaskTemplate & { student_id: string; task_date: string }> {
  const templates = DAILY_TASK_TEMPLATES[level] ?? DAILY_TASK_TEMPLATES.beginner
  return templates.map(t => ({ ...t, student_id: studentId, task_date: date }))
}
