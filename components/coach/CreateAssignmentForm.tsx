'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { Student } from '@/types/database'

interface CreateAssignmentFormProps {
  coachId: string
  students: Student[]
}

export default function CreateAssignmentForm({ coachId, students }: CreateAssignmentFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    student_id: '', // empty = all
    level_target: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from('assignments').insert({
      coach_id: coachId,
      title: form.title,
      description: form.description || null,
      due_date: form.due_date,
      student_id: form.student_id || null,
      level_target: form.level_target || null,
    })

    if (!error) {
      setSuccess(true)
      setForm({ title: '', description: '', due_date: '', student_id: '', level_target: '' })
      setTimeout(() => { setSuccess(false); router.refresh() }, 2000)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-4">Create Assignment</h3>

      {success ? (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 text-center">
          ✓ Assignment created!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Title *</label>
            <input
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Fork Practice"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Instructions…"
              rows={2}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Due Date *</label>
            <input
              required
              type="date"
              value={form.due_date}
              onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Assign To</label>
            <select
              value={form.student_id}
              onChange={e => setForm(f => ({ ...f, student_id: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm bg-white"
            >
              <option value="">All students</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.profile?.full_name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-white',
              'hover:bg-primary/90 disabled:opacity-50 transition-all shadow-sm shadow-primary/20'
            )}
          >
            {loading ? 'Creating…' : 'Create Assignment'}
          </button>
        </form>
      )}
    </div>
  )
}
