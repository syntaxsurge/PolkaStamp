'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useActionState, startTransition } from 'react'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { updateIssuerDidAction } from './actions'

type ActionState = { error?: string; success?: string }

export function LinkDidForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateIssuerDidAction,
    { error: '', success: '' },
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(() => formAction(fd))
  }

  React.useEffect(() => {
    if (state.error) toast.error(state.error)
    if (state.success) toast.success(state.success)
  }, [state.error, state.success])

  React.useEffect(() => {
    if (state.success) router.refresh()
  }, [state.success, router])

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div>
        <Label htmlFor='did'>Link your Polkadot DID</Label>
        <Input id='did' name='did' required placeholder='did:polkadot:0xabc…' />
      </div>

      <Button type='submit' disabled={pending}>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Saving…
          </>
        ) : (
          'Save DID'
        )}
      </Button>
    </form>
  )
}
