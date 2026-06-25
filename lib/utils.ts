import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return format(new Date(date), 'MMM d, yyyy')
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), 'MMM d · h:mm a')
}

export function formatTime(date: string | Date) {
  return format(new Date(date), 'h:mm a')
}

export function relativeTime(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function dueDateLabel(date: string): string {
  const d = new Date(date)
  if (isPast(d) && !isToday(d)) return 'Overdue'
  if (isToday(d)) return 'Due Today'
  if (isTomorrow(d)) return 'Due Tomorrow'
  return `Due ${format(d, 'MMM d')}`
}

export function pct(value: number, total: number): number {
  if (!total) return 0
  return Math.min(100, Math.round((value / total) * 100))
}

export function ratingDiff(current: number, joining: number): string {
  const diff = current - joining
  return diff >= 0 ? `+${diff}` : `${diff}`
}

export function levelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

export function levelColor(level: string): string {
  const map: Record<string, string> = {
    beginner: 'bg-emerald-100 text-emerald-700',
    intermediate: 'bg-blue-100 text-blue-700',
    advanced: 'bg-purple-100 text-purple-700',
  }
  return map[level] ?? 'bg-gray-100 text-gray-700'
}

export function taskIcon(type: string): string {
  const map: Record<string, string> = {
    class: '📚',
    puzzles: '🧩',
    games: '♟',
    analysis: '🔍',
    lesson: '📖',
    assignment: '📋',
  }
  return map[type] ?? '✅'
}

export function notificationIcon(type: string): string {
  const map: Record<string, string> = {
    achievement: '🏆',
    feedback: '💬',
    class: '📅',
    assignment: '📋',
    goal: '🎯',
    system: 'ℹ️',
  }
  return map[type] ?? '🔔'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function avatarUrl(name: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=6366f1`
}

export function firstDayOfMonth(date?: Date): string {
  const d = date ?? new Date()
  return format(new Date(d.getFullYear(), d.getMonth(), 1), 'yyyy-MM-dd')
}
