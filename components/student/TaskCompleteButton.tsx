'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import TasksList from './TasksList'
import type { DailyTask } from '@/types/database'

export default function TaskCompleteButton({ tasks: initialTasks }: { tasks: DailyTask[] }) {
  const router = useRouter()
  const [tasks, setTasks] = useState(initialTasks)

  async function handleComplete(taskId: string) {
    const supabase = createClient()
    await supabase
      .from('daily_tasks')
      .update({ is_completed: true, completed_at: new Date().toISOString() })
      .eq('id', taskId)

    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, is_completed: true, completed_at: new Date().toISOString() } : t)
    )
    router.refresh()
  }

  return <TasksList tasks={tasks} onComplete={handleComplete} />
}
