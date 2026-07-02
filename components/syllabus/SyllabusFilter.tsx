'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const LEVELS = [
  { value: '', label: 'All Levels' },
  { value: 'Beginner',      label: 'Beginner' },
  { value: 'Foundation 1',  label: 'Foundation 1' },
  { value: 'Foundation 2',  label: 'Foundation 2' },
  { value: 'Foundation 3',  label: 'Foundation 3' },
  { value: 'Foundation 4',  label: 'Foundation 4' },
  { value: 'Intermediate 1',label: 'Intermediate 1' },
  { value: 'Intermediate 2',label: 'Intermediate 2' },
  { value: 'Intermediate 3',label: 'Intermediate 3' },
  { value: 'Intermediate 4',label: 'Intermediate 4' },
]

export default function SyllabusFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('level') ?? ''

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    if (val) {
      params.set('level', val)
    } else {
      params.delete('level')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="level-filter" className="text-sm font-medium text-gray-600 whitespace-nowrap">
        Filter by Level
      </label>
      <select
        id="level-filter"
        value={current}
        onChange={handleChange}
        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
      >
        {LEVELS.map(l => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
    </div>
  )
}
