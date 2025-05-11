'use client'

import type { Role } from '@/lib/types'
import { cn } from '@/lib/utils'

const colorMap: Record<Role, string> = {
  candidate: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  recruiter: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  issuer: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
} as const

export function RoleBadge({ role }: { role?: Role }) {
  if (!role) return null
  const classes = colorMap[role] ?? 'bg-muted text-foreground/80'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium capitalize',
        classes,
      )}
    >
      {role}
    </span>
  )
}
