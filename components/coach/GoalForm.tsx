'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn, firstDayOfMonth } from '@/lib/utils'
import type { MonthlyGoal } from '@/types/database'

interface GoalFormProps {
  studentId: string
  coachId: string
  currentGoal: MonthlyGoal | null
}

export default function GoalForm({ studentId, coachId, currentGoal }: GoalFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    target_rating: currentGoal?.target_rating?.toString() ?? '',
    target_puzzles: currentGoal?.target_puzzles?.toString() ?? '',
    target_classes: currentGoal?.target_classes?.toString() ?? '',
    target_games: currentGoal?.target_games?.toString() ?? '',
    notes: currentGoal?.notes ?? '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    await supabase.from('monthly_goals').upsert({
      student_id: studentId,
      coach_id: coachId,
      month: firstDayOfMonth(),
      target_rating: form.target_rating ? parseInt(form.target_rating) : null,
      target_puzzles: form.target_puzzles ? parseInt(form.target_puzzles) : null,
      target_classes: form.target_classes ? parseInt(form.target_classes) : null,
      target_games: form.target_games ? parseInt(form.target_games) : null,
      notes: form.notes || null,
    }, { onConflict: 'student_id,month' })

    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-900">Monthly Goals</h3>
        <button
          onClick={() => setOpen(!open)}
          className="text-xs font-semibold text-primary hover:underline"
        >
          {open ? 'Cancel' : currentGoal ? 'Edit Goals' : 'Set Goals'}
        </button>
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { key: 'target_rating', label: 'Target Rating', placeholder: '1300' },
            { key: 'target_puzzles', label: 'Target Puzzles', placeholder: '100' },
            { key: 'target_classes', label: 'Target Classes', placeholder: '8' },
            { key: 'target_games', label: 'Target Games', placeholder: '20' },
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs font-medium text-gray-600 mb-1 block">{field.label}</label>
              <input
                type="number"
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={2}
              placeholder="Notes for the student…"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-white',
              'hover:bg-primary/90 disabled:opacity-50 transition-all'
            )}
          >
            {loading ? 'Saving…' : 'Save Goals'}
          </button>
        </form>
      )}

      {!open && !currentGoal && (
        <p className="text-sm text-gray-400 text-center py-2">No goals set for this month yet</p>
      )}
      {!open && currentGoal && (
        <div className="text-xs text-gray-400 space-y-1">
          {currentGoal.target_rating && <p>⭐ Rating: {currentGoal.target_rating}</p>}
          {currentGoal.target_puzzles && <p>🧩 Puzzles: {currentGoal.target_puzzles}</p>}
          {currentGoal.target_classes && <p>📚 Classes: {currentGoal.target_classes}</p>}
          {currentGoal.target_games && <p>♟ Games: {currentGoal.target_games}</p>}
        </div>
      )}
    </div>
  )
}
