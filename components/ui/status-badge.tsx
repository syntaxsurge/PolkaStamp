'use client'

import { CheckCircle2, Clock, XCircle, HelpCircle, type LucideIcon } from 'lucide-react'

import { STAGES } from '@/lib/constants/recruiter'
import type { StatusBadgeProps } from '@/lib/types/components'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                               Color mapping                                */
/* -------------------------------------------------------------------------- */

const STYLE_MAP: Record<string, string> = {
  verified: 'bg-emerald-600/15 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-200',
  active: 'bg-emerald-600/15 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-200',
  accepted: 'bg-emerald-600/15 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-200',
  pending: 'bg-amber-500/20 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200',
  unverified: 'bg-muted text-muted-foreground',
  inactive: 'bg-muted text-muted-foreground',
  declined: 'bg-rose-600/15 text-rose-900 dark:bg-rose-500/20 dark:text-rose-200',
  rejected: 'bg-rose-600/15 text-rose-900 dark:bg-rose-500/20 dark:text-rose-200',
}

/* -------------------------------------------------------------------------- */
/*                               Icon mapping                                 */
/* -------------------------------------------------------------------------- */

const ICON_MAP: Record<string, LucideIcon> = {
  verified: CheckCircle2,
  active: CheckCircle2,
  accepted: CheckCircle2,
  pending: Clock,
  unverified: HelpCircle,
  inactive: HelpCircle,
  declined: XCircle,
  rejected: XCircle,
}

/* -------------------------------------------------------------------------- */
/*                     Dynamic recruiter-pipeline stages                      */
/* -------------------------------------------------------------------------- */

const PIPELINE_STYLE = 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-200'

STAGES.forEach((stage) => {
  STYLE_MAP[stage.toLowerCase()] = PIPELINE_STYLE
})

/* -------------------------------------------------------------------------- */
/*                                   Badge                                    */
/* -------------------------------------------------------------------------- */

export function StatusBadge({
  status,
  className,
  showIcon = false,
  iconPosition = 'left',
  count,
}: StatusBadgeProps) {
  const key = status.toLowerCase()
  const style = STYLE_MAP[key] ?? STYLE_MAP.unverified
  const Icon = ICON_MAP[key]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        style,
        className,
      )}
    >
      {showIcon && iconPosition === 'left' && Icon && <Icon className='size-3 shrink-0' />}

      <span className='capitalize'>{status}</span>
      {count !== undefined && <span>: {count}</span>}

      {showIcon && iconPosition === 'right' && Icon && <Icon className='size-3 shrink-0' />}
    </span>
  )
}

export default StatusBadge
