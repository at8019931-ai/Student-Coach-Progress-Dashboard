'use client'
import type { DailyTask } from '@/types/database'
import TasksList from './TasksList'

export default function TaskCompleteButton({ tasks }: { tasks: DailyTask[] }) {
  return <TasksList tasks={tasks} onComplete={async () => {}} />
}
