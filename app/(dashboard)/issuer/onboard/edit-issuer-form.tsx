'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useActionState, startTransition } from 'react'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IssuerCategory, IssuerIndustry } from '@/lib/db/schema/issuer'

import { updateIssuerDetailsAction } from './actions'

type ActionState = { error?: string; success?: string }

export function EditIssuerForm({ issuer }: { issuer: any }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateIssuerDetailsAction,
    { error: '', success: '' },
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => formAction(new FormData(e.currentTarget)))
  }

  React.useEffect(() => {
    if (state.error) toast.error(state.error)
    if (state.success) toast.success(state.success)
  }, [state.error, state.success])

  React.useEffect(() => {
    if (state.success) router.refresh()
  }, [state.success, router])

  const CATEGORIES = Object.values(IssuerCategory)
  const INDUSTRIES = Object.values(IssuerIndustry)

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div>
        <Label htmlFor='name'>Organisation Name</Label>
        <Input id='name' name='name' defaultValue={issuer.name} required />
      </div>

      <div>
        <Label htmlFor='domain'>Domain</Label>
        <Input id='domain' name='domain' defaultValue={issuer.domain} required />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <Label htmlFor='category'>Category</Label>
          <select
            id='category'
            name='category'
            className='h-10 w-full rounded-md border px-2'
            defaultValue={issuer.category}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className='capitalize'>
                {c.replaceAll('_', ' ').toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor='industry'>Industry</Label>
          <select
            id='industry'
            name='industry'
            className='h-10 w-full rounded-md border px-2'
            defaultValue={issuer.industry}
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i} className='capitalize'>
                {i.toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor='logoUrl'>Logo URL</Label>
        <Input
          id='logoUrl'
          name='logoUrl'
          type='url'
          pattern='https://.*'
          defaultValue={issuer.logoUrl ?? ''}
          placeholder='https://…'
        />
      </div>

      <Button type='submit' disabled={pending} className='w-full'>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Resubmitting…
          </>
        ) : (
          'Resubmit for Review'
        )}
      </Button>
    </form>
  )
}
