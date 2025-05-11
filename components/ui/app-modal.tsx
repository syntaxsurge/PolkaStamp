'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import type { LucideIcon } from 'lucide-react'
import { X, UserRound, KeyRound, Bot, Star } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { AppModalProps } from '@/lib/types/components'

/* -------------------------------------------------------------------------- */
/*                                 Icon Map                                   */
/* -------------------------------------------------------------------------- */

const ICON_MAP: Record<string, LucideIcon> = {
  userround: UserRound,
  keyround: KeyRound,
  bot: Bot,
  star: Star,
}

/* -------------------------------------------------------------------------- */
/*                                   Modal                                    */
/* -------------------------------------------------------------------------- */

/**
 * Generic application modal.
 *
 * - `required = true` locks the dialog (no close button & outside click disabled).
 * - Provide `children` for custom content; otherwise a single CTA button is shown.
 */
export function AppModal({
  icon,
  iconKey,
  title,
  description,
  buttonText,
  redirectTo,
  children,
  required = false,
}: AppModalProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(true)

  const Icon = icon ?? (iconKey ? ICON_MAP[iconKey.toLowerCase()] : undefined)

  /* Close handler ignored when required */
  const close = () => {
    if (!required) setOpen(false)
  }

  return (
    <AlertDialog open={required ? true : open} onOpenChange={required ? undefined : setOpen}>
      <AlertDialogContent className='sm:max-w-md'>
        {/* Close button (hidden when required) */}
        {!required && (
          <button
            type='button'
            onClick={close}
            className='text-muted-foreground hover:text-foreground focus:ring-ring absolute top-4 right-4 rounded-md p-1 focus:ring-2 focus:outline-none'
          >
            <X className='h-4 w-4' aria-hidden='true' />
            <span className='sr-only'>Close</span>
          </button>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            {Icon && <Icon className='h-5 w-5 text-rose-600' />}
            {title}
          </AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>

        {/* Custom content overrides default button */}
        {children ? (
          <div className='pt-4'>{children}</div>
        ) : (
          <Button
            className='w-full'
            onClick={() => redirectTo && router.push(redirectTo)}
            autoFocus
          >
            {buttonText || 'Continue'}
          </Button>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
