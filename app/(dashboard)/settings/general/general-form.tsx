'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { updateAccount } from '@/app/(auth)/actions'
import { ActionButton } from '@/components/ui/action-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { GeneralFormProps } from '@/lib/types/forms'

export default function GeneralForm({ defaultName, defaultEmail }: GeneralFormProps) {
  const router = useRouter()
  const [name, setName] = useState(defaultName)
  const [email, setEmail] = useState(defaultEmail)

  async function handleSave() {
    const fd = new FormData()
    fd.append('name', name.trim())
    fd.append('email', email.trim().toLowerCase())
    const res = await updateAccount({}, fd)
    if (res?.success) router.refresh()
    return res
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
      {/* Name */}
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='Enter your name'
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Enter your email'
        />
      </div>

      {/* Save */}
      <ActionButton onAction={handleSave} pendingLabel='Saving…'>
        Save Changes
      </ActionButton>
    </form>
  )
}
