'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { QuickAction } from '@/lib/types/components'

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  if (!actions.length) return null

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {actions.map(({ href, label, variant }) => (
        <Link key={href} href={href}>
          <Button className='w-full' variant={variant === 'outline' ? 'outline' : 'default'}>
            {label}
          </Button>
        </Link>
      ))}
    </div>
  )
}
