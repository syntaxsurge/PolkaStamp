'use client'

import * as React from 'react'
import { startTransition } from 'react'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { updatePlanFeaturesAction } from './actions'

interface Props {
  defaultFeatures: {
    free: string[]
    base: string[]
    plus: string[]
  }
}

/**
 * Text-area based editor — one line per benefit bullet.
 */
export default function UpdatePlanFeaturesForm({ defaultFeatures }: Props) {
  const [free, setFree] = React.useState(defaultFeatures.free.join('\n'))
  const [base, setBase] = React.useState(defaultFeatures.base.join('\n'))
  const [plus, setPlus] = React.useState(defaultFeatures.plus.join('\n'))

  const [state, action, pending] = React.useActionState<any, FormData>(updatePlanFeaturesAction, {})

  React.useEffect(() => {
    if (state?.error) toast.error(state.error)
    if (state?.success) toast.success(state.success)
  }, [state])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('free', free)
    fd.append('base', base)
    fd.append('plus', plus)
    startTransition(() => action(fd))
  }

  const textareaCls =
    'w-full rounded-md border p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary'

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Free ---------------------------------------------------------------- */}
      <div>
        <label htmlFor='free' className='mb-1 block text-sm font-medium'>
          Free Plan Features&nbsp;(one per line)
        </label>
        <textarea
          id='free'
          rows={5}
          value={free}
          onChange={(e) => setFree(e.target.value)}
          className={textareaCls}
        />
      </div>

      {/* Base ---------------------------------------------------------------- */}
      <div>
        <label htmlFor='base' className='mb-1 block text-sm font-medium'>
          Base Plan Features&nbsp;(one per line)
        </label>
        <textarea
          id='base'
          rows={5}
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className={textareaCls}
        />
      </div>

      {/* Plus ---------------------------------------------------------------- */}
      <div>
        <label htmlFor='plus' className='mb-1 block text-sm font-medium'>
          Plus Plan Features&nbsp;(one per line)
        </label>
        <textarea
          id='plus'
          rows={5}
          value={plus}
          onChange={(e) => setPlus(e.target.value)}
          className={textareaCls}
        />
      </div>

      <Button type='submit' className='w-full sm:w-auto' disabled={pending}>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Updating…
          </>
        ) : (
          'Update Features'
        )}
      </Button>
    </form>
  )
}
