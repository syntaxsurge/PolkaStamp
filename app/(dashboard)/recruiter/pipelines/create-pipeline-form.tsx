'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { ActionButton } from '@/components/ui/action-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { createPipelineAction } from './actions'

export default function CreatePipelineForm() {
  const router = useRouter()
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  async function handleCreate() {
    const fd = new FormData()
    fd.append('name', name)
    if (description.trim()) fd.append('description', description)
    const res = await createPipelineAction({}, fd)
    if (res?.success) {
      setName('')
      setDescription('')
      router.refresh()
    }
    return res
  }

  return (
    <Card id='create-pipeline-form' className='max-w-xl scroll-mt-20'>
      <CardHeader>
        <CardTitle>Create New Pipeline</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='space-y-5'>
          <div>
            <Label htmlFor='pipeline-name' className='mb-1 block text-sm font-medium'>
              Name
            </Label>
            <Input
              id='pipeline-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='e.g. Backend Engineer May 2025'
            />
          </div>

          <div>
            <Label htmlFor='pipeline-description' className='mb-1 block text-sm font-medium'>
              Description
            </Label>
            <textarea
              id='pipeline-description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className='border-border w-full rounded-md border p-2 text-sm'
              placeholder='Optional summary of the role, seniority, location, etc.'
            />
          </div>

          <ActionButton onAction={handleCreate} pendingLabel='Creating…'>
            Create Pipeline
          </ActionButton>
        </div>
      </CardContent>
    </Card>
  )
}
