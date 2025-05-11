import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface DetailItemProps {
  icon: LucideIcon
  label: string
  value: string | number | null
  capitalize?: boolean
  className?: string
}

export default function DetailItem({
  icon: Icon,
  label,
  value,
  capitalize = false,
  className,
}: DetailItemProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Icon className='text-muted-foreground mt-0.5 h-5 w-5 flex-shrink-0' />
      <div>
        <p className='text-muted-foreground text-xs font-medium uppercase'>{label}</p>
        <p className={cn('font-medium break-all', capitalize && 'capitalize')}>{value ?? '—'}</p>
      </div>
    </div>
  )
}
