'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { addCandidateToPipelineAction } from '@/app/(dashboard)/recruiter/pipelines/actions'
import { ActionButton } from '@/components/ui/action-button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import type { AddToPipelineFormProps } from '@/lib/types/forms'

/**
 * Recruiter utility: add a candidate to one of the recruiter’s pipelines.
 * The dropdown and button remain fully opaque even when the action is not yet available
 * to avoid the muted, hard-to-see state reported by users.
 */
export default function AddToPipelineForm({ candidateId, pipelines }: AddToPipelineFormProps) {
  const router = useRouter()
  const [pipelineId, setPipelineId] = useState<string>('')

  async function handleAdd() {
    if (!pipelineId) return { error: 'Please select a pipeline first.' }

    const fd = new FormData()
    fd.append('candidateId', String(candidateId))
    fd.append('pipelineId', pipelineId)
    const res = await addCandidateToPipelineAction({}, fd)

    if (res?.success) {
      setPipelineId('')
      router.refresh()
    }
    return res
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className='flex items-end gap-3'>
      {/* Pipeline selector – always interactive but shows placeholder when none exist */}
      <div className='flex flex-1'>
        <Select value={pipelineId} onValueChange={setPipelineId}>
          <SelectTrigger id='pipelineId' className='focus:ring-primary w-full focus:ring-2'>
            <SelectValue placeholder='Add to Pipeline' />
          </SelectTrigger>

          <SelectContent>
            {pipelines.length === 0 ? (
              <SelectItem value='' disabled>
                No pipelines available
              </SelectItem>
            ) : (
              pipelines.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Submit button – functional guard replaces disabled muting */}
      <ActionButton onAction={handleAdd} pendingLabel='Adding…' className='disabled:opacity-100'>
        Add
      </ActionButton>
    </form>
  )
}
