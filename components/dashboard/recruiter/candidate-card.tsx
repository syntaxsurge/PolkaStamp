'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'

import { Pencil, Info, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { deletePipelineCandidateAction } from '@/app/(dashboard)/recruiter/pipelines/actions'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { PipelineCandidateCard } from '@/lib/types/components'

import EditCandidateModal from './edit-candidate-modal'

export default function CandidateCard({ candidate }: { candidate: PipelineCandidateCard }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const fd = new FormData()
      fd.append('pipelineCandidateId', String(candidate.id))
      const res = await deletePipelineCandidateAction({}, fd)
      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success('Candidate removed.')
        setDialogOpen(false)
        window.location.reload()
      }
    })
  }

  return (
    <Card className='relative'>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
        <div className='min-w-0'>
          <CardTitle className='truncate text-sm font-medium'>
            {candidate.name || candidate.email}
          </CardTitle>
          <p className='text-muted-foreground truncate text-xs'>{candidate.email}</p>
        </div>

        <div className='flex items-center gap-1'>
          <EditCandidateModal pipelineCandidateId={candidate.id} currentStage={candidate.stage}>
            <Button variant='ghost' size='icon' className='h-6 w-6'>
              <Pencil className='h-4 w-4' />
              <span className='sr-only'>Edit</span>
            </Button>
          </EditCandidateModal>

          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6'
            onClick={() => setDialogOpen(true)}
          >
            <Trash2 className='h-4 w-4 text-rose-500' />
            <span className='sr-only'>Delete</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className='pt-0'>
        <Button asChild variant='link' size='sm' className='text-primary h-6 px-0 text-xs'>
          <Link
            href={`/candidates/${candidate.candidateId}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Info className='mr-1 h-3 w-3' />
            View Details
          </Link>
        </Button>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={(v) => !isPending && setDialogOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Candidate?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this candidate from the pipeline? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDialogOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDelete} disabled={isPending}>
              {isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
