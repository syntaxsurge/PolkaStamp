'use client'

import * as React from 'react'

import { CheckCircle2, XCircle, ShieldCheck, ShieldX, type LucideProps } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Utility that wraps a Lucide icon with default colour classes while preserving ref support.
 */
function withColor(
  Base: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >,
  defaultClasses: string,
) {
  return React.forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) => (
    <Base ref={ref} {...props} className={cn(defaultClasses, className)} />
  ))
}

/* -------------------------------------------------------------------------- */
/*                               Coloured Icons                               */
/* -------------------------------------------------------------------------- */

export const AcceptIcon = withColor(
  CheckCircle2,
  'mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400',
)
AcceptIcon.displayName = 'AcceptIcon'

export const DeclineIcon = withColor(XCircle, 'mr-2 h-4 w-4 text-amber-600 dark:text-amber-400')
DeclineIcon.displayName = 'DeclineIcon'

export const VerifyIcon = withColor(
  ShieldCheck,
  'mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400',
)
VerifyIcon.displayName = 'VerifyIcon'

export const UnverifyIcon = withColor(ShieldX, 'mr-2 h-4 w-4 text-amber-600 dark:text-amber-400')
UnverifyIcon.displayName = 'UnverifyIcon'

export const RejectIcon = withColor(XCircle, 'mr-2 h-4 w-4 text-rose-600 dark:text-rose-400')
RejectIcon.displayName = 'RejectIcon'
