'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState, useTransition } from 'react'

import { Loader2, UserPlus } from 'lucide-react'
import { toast } from 'sonner'

import { AppModal } from '@/components/ui/app-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'
import { WALLET_HEADER } from '@/lib/constants/blockchain'
import type { WalletOnboardModalProps } from '@/lib/types/components'

/* -------------------------------------------------------------------------- */
/*                                 C O N S T S                                */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { value: 'candidate', label: 'Candidate' },
  { value: 'recruiter', label: 'Recruiter' },
  { value: 'issuer', label: 'Issuer' },
] as const

/* -------------------------------------------------------------------------- */
/*                               C O M P O N E N T                            */
/* -------------------------------------------------------------------------- */

export default function WalletOnboardModal({ isConnected, user }: WalletOnboardModalProps) {
  const router = useRouter()
  const { selectedAccount } = usePolkadotExtension()

  const address = selectedAccount?.address
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  /* Ensure auto-login check runs only once per wallet connection */
  const attemptedAutoRef = useRef(false)

  /* ---------------------------------------------------------------------- */
  /*                        A U T O - L O G I N  C H E C K                  */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!isConnected || user || !address || attemptedAutoRef.current) return

    attemptedAutoRef.current = true
    ;(async () => {
      try {
        const res = await fetch(`/api/auth/wallet-status?address=${address}`, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
        })
        const json = await res.json().catch(() => ({}))

        /* If user exists, server sets session cookie – just refresh */
        if (res.ok && json?.exists) {
          router.refresh()
          return
        }

        /* Otherwise, prompt onboarding modal */
        setOpen(true)
      } catch {
        /* Network failure – still show modal */
        setOpen(true)
      }
    })()
  }, [isConnected, user, address, router])

  /* Close modal when wallet disconnects or session becomes available */
  useEffect(() => {
    if (!isConnected || user) setOpen(false)
  }, [isConnected, user])

  /* ---------------------------------------------------------------------- */
  /*                              S U B M I T                               */
  /* ---------------------------------------------------------------------- */

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!address) {
      toast.error('Wallet not connected.')
      return
    }

    const fd = new FormData(e.currentTarget)
    const name = fd.get('name')?.toString().trim()
    const email = fd.get('email')?.toString().trim().toLowerCase()
    const role = fd.get('role')?.toString()

    if (!name || !email || !role) {
      toast.error('Please complete all fields.')
      return
    }

    const toastId = toast.loading('Creating your account…')

    startTransition(async () => {
      try {
        const res = await fetch('/api/auth/wallet-onboard', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            [WALLET_HEADER]: address,               // forward wallet header
          },
          body: JSON.stringify({ name, email, role, address }),
        })

        const json = await res.json().catch(() => ({}))

        if (!res.ok || json?.error) {
          toast.error(json?.error ?? 'On-board failed.', { id: toastId })
          return
        }

        toast.success('Account created!', { id: toastId })
        setOpen(false)
        router.refresh()
      } catch (err: any) {
        toast.error(err?.message ?? 'Something went wrong.', { id: toastId })
      }
    })
  }

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  if (!open) return null

  return (
    <AppModal
      icon={UserPlus}
      title='Complete your PolkaStamp profile'
      description='Just a few details and you’re ready to go.'
    >
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Name */}
        <div className='space-y-2'>
          <Label htmlFor='name'>Full name</Label>
          <Input id='name' name='name' placeholder='Jane Doe' required />
        </div>

        {/* Email */}
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' name='email' type='email' placeholder='you@example.com' required />
        </div>

        {/* Role */}
        <div className='space-y-2'>
          <Label>I am signing up as</Label>
          <RadioGroup name='role' defaultValue='candidate' className='flex gap-6'>
            {ROLES.map((r) => (
              <div key={r.value} className='flex items-center gap-2'>
                <RadioGroupItem id={r.value} value={r.value} />
                <Label htmlFor={r.value} className='cursor-pointer select-none'>
                  {r.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Submit */}
        <Button type='submit' disabled={isPending} className='w-full'>
          {isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving…
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </AppModal>
  )
}