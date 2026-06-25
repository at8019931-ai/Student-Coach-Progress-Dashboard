import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Assignments — Coach' }

export default function CoachAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="text-sm text-gray-500 mt-0.5">Coming soon</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <p className="text-4xl mb-4">📋</p>
        <p className="text-gray-500">Assignment management will be available soon.</p>
      </div>
    </div>
  )
}
