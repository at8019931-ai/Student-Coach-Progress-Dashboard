'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/**
 * Subscribe to realtime changes for a student's dashboard data.
 * Refreshes the Next.js router (re-fetches server components) on any change.
 */
export function useStudentRealtime(studentId: string, userId: string) {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`student-${studentId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'daily_tasks',
        filter: `student_id=eq.${studentId}`,
      }, () => router.refresh())
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'feedback',
        filter: `student_id=eq.${studentId}`,
      }, () => router.refresh())
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'student_achievements',
        filter: `student_id=eq.${studentId}`,
      }, () => router.refresh())
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'monthly_goals',
        filter: `student_id=eq.${studentId}`,
      }, () => router.refresh())
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, () => router.refresh())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [studentId, userId, router])
}
