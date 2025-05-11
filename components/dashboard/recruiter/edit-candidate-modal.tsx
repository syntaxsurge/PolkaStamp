'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { updateCandidateStageAction } from '@/app/(dashboard)/recruiter/pipelines/actions'
import { ActionButton } from '@/components/ui/action-button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { STAGES } from '@/lib/constants/recruiter'
import type { EditCandidateModalProps } from '@/lib/types/components'
import { Stage } from '@/lib/types/recruiter'

/**
 * Reusable modal wrapper around updateCandidateStageAction.
 */
export default function EditCandidateModal({
  pipelineCandidateId,
  currentStage,
  children,
}: EditCandidateModalProps) {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<Stage>(currentStage)
  const [saving, setSaving] = useState(false)

  /** Async action bound to the ActionButton. */
  async function handleSave(): Promise<any> {
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('pipelineCandidateId', String(pipelineCandidateId))
      fd.append('stage', stage)

      const res = await updateCandidateStageAction({}, fd)

      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success('Candidate updated.')
        setOpen(false)
        /* Mild refresh to keep board in sync; heavy reload avoided intentionally */
        window.location.reload()
      }

      return res
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !saving && setOpen(v)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='stage' className='mb-1 text-sm font-medium'>
              Stage
            </label>
            <select
              id='stage'
              value={stage}
              onChange={(e) => setStage(e.target.value as Stage)}
              className='border-border h-10 rounded-md border px-2 text-sm'
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <ActionButton onAction={handleSave} pendingLabel='Saving…' disabled={saving}>
            Save Changes
          </ActionButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
