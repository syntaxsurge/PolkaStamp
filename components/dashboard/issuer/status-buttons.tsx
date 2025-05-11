'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import {
  updateIssuerStatusAction,
  deleteIssuerAction,
} from '@/app/(dashboard)/admin/issuers/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IssuerStatus } from '@/lib/db/schema/issuer'
import type { IssuerStatusButtonsProps } from '@/lib/types/components'

const PRESETS = ['Spam / fraudulent', 'Incorrect details', 'Other'] as const

export default function IssuerStatusButtons({ issuerId, status }: IssuerStatusButtonsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  /* Reject state */
  const [showReject, setShowReject] = useState(false)
  const [preset, setPreset] = useState<(typeof PRESETS)[number]>('Spam / fraudulent')
  const [custom, setCustom] = useState('')

  /* Delete confirm */
  const [showDelete, setShowDelete] = useState(false)

  /* ------------------------- helpers ------------------------- */
  function mutateStatus(nextStatus: keyof typeof IssuerStatus, reason?: string) {
    startTransition(async () => {
      const fd = new FormData()
      fd.append('issuerId', issuerId.toString())
      fd.append('status', nextStatus)
      if (reason) fd.append('rejectionReason', reason)
      await updateIssuerStatusAction({}, fd)
      setShowReject(false)
      router.refresh()
    })
  }

  function deleteIssuer() {
    startTransition(async () => {
      const fd = new FormData()
      fd.append('issuerId', issuerId.toString())
      await deleteIssuerAction({}, fd)
      router.refresh()
    })
  }

  /* ------------------------- UI blocks ----------------------- */
  if (showReject) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const reason = preset === 'Other' ? custom : preset
          mutateStatus(IssuerStatus.REJECTED, reason)
        }}
        className='flex flex-col gap-2'
      >
        <div>
          <Label htmlFor='reason' className='mb-1 block text-xs font-medium'>
            Rejection Reason
          </Label>
          <select
            id='reason'
            value={preset}
            onChange={(e) => setPreset(e.target.value as (typeof PRESETS)[number])}
            className='h-8 w-full rounded-md border px-2 text-xs'
          >
            {PRESETS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {preset === 'Other' && (
          <Input
            placeholder='Add custom reason…'
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            required
            className='h-8'
          />
        )}

        <div className='flex gap-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled={isPending}
            onClick={() => setShowReject(false)}
          >
            Cancel
          </Button>
          <Button type='submit' size='sm' variant='destructive' disabled={isPending}>
            Confirm
          </Button>
        </div>
      </form>
    )
  }

  if (showDelete) {
    return (
      <div className='flex flex-col gap-2'>
        <p className='text-xs'>Delete this issuer permanently?</p>
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            disabled={isPending}
            onClick={() => setShowDelete(false)}
          >
            Cancel
          </Button>
          <Button size='sm' variant='destructive' disabled={isPending} onClick={deleteIssuer}>
            Delete
          </Button>
        </div>
      </div>
    )
  }

  /* Default buttons */
  return (
    <div className='flex flex-wrap items-center gap-2 whitespace-nowrap'>
      {status !== IssuerStatus.ACTIVE && (
        <Button size='sm' disabled={isPending} onClick={() => mutateStatus(IssuerStatus.ACTIVE)}>
          Verify
        </Button>
      )}

      {status === IssuerStatus.ACTIVE && (
        <Button
          size='sm'
          variant='outline'
          disabled={isPending}
          onClick={() => mutateStatus(IssuerStatus.PENDING)}
        >
          Unverify
        </Button>
      )}

      {status !== IssuerStatus.REJECTED && (
        <Button
          size='sm'
          variant='destructive'
          disabled={isPending}
          onClick={() => setShowReject(true)}
        >
          Reject
        </Button>
      )}

      <Button
        size='sm'
        variant='destructive'
        disabled={isPending}
        onClick={() => setShowDelete(true)}
      >
        Delete
      </Button>
    </div>
  )
}
