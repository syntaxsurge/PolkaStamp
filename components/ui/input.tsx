import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        // Keep a solid border at all times for better visibility
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        'dark:bg-input/30 border-border dark:border-border border-2',
        // Increase height slightly for comfort
        'flex h-10 w-full min-w-0 rounded-md px-3 py-2 text-base shadow-sm',
        // Subtle transitions
        'transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        // Focus ring with subtle color
        'focus-visible:ring-primary/40 focus-visible:ring-offset-background focus-visible:ring-1 focus-visible:ring-offset-1',
        // Mark invalid states
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
