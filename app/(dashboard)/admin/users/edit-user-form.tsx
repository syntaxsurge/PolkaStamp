'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { startTransition } from 'react'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { EditUserFormProps, ActionState } from '@/lib/types/forms'

import { updateUserAction } from './actions'

const ROLES = ['candidate', 'recruiter', 'issuer', 'admin'] as const

export default function EditUserForm({
  id,
  defaultName,
  defaultEmail,
  defaultRole,
  onDone,
}: EditUserFormProps) {
  const [state, action, pending] = React.useActionState<ActionState, FormData>(updateUserAction, {
    error: '',
    success: '',
  })
  const router = useRouter()

  /* ------------- toast de-dupe ------------- */
  const toastId = React.useRef(`edit-user-${id}`)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.append('userId', id.toString())
    startTransition(() => action(fd))
  }

  React.useEffect(() => {
    if (state.error) {
      toast.error(state.error, { id: toastId.current })
    }
    if (state.success) {
      toast.success(state.success, { id: toastId.current })
      onDone()
      router.refresh()
    }
  }, [state.error, state.success])

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' name='name' defaultValue={defaultName ?? ''} required />
      </div>

      <div>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' type='email' defaultValue={defaultEmail} required />
      </div>

      <div>
        <Label htmlFor='role'>Role</Label>
        <select
          id='role'
          name='role'
          defaultValue={defaultRole}
          className='h-10 w-full rounded-md border px-2 capitalize'
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <Button type='submit' className='w-full' disabled={pending}>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Saving…
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </form>
  )
}
