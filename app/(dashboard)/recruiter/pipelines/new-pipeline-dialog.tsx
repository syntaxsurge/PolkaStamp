'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import CreatePipelineForm from './create-pipeline-form'

/**
 * Button + modal for creating a new recruiter pipeline.
 */
export default function NewPipelineDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          New Pipeline
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Pipeline</DialogTitle>
          <DialogDescription>
            Fill out the details below to add a new hiring pipeline.
          </DialogDescription>
        </DialogHeader>

        {/* Re‑use existing form component */}
        <CreatePipelineForm />
      </DialogContent>
    </Dialog>
  )
}
