'use client'

import { useRouter } from 'next/navigation'
import { useTransition, useRef, useState } from 'react'

import { Loader2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'

import IssuerSelect from '@/components/issuer-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import type { AddCredentialFormProps } from '@/lib/types/forms'

/* -------------------------------------------------------------------------- */
/*                                 CONSTANTS                                  */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  'EDUCATION',
  'EXPERIENCE',
  'PROJECT',
  'AWARD',
  'CERTIFICATION',
  'OTHER',
] as const

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function AddCredentialForm({ addCredentialAction }: AddCredentialFormProps) {
  const [isPending, startTransition] = useTransition()
  const [fileName, setFileName] = useState<string | null>(null)
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement | null>(null)

  /* --------------------------- H E L P E R S ----------------------------- */

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/storage/upload', {
      method: 'POST',
      body: fd,
    })

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({}))
      throw new Error(error || 'Upload failed')
    }

    const { url } = await res.json()
    if (!url) throw new Error('Upload failed')
    return url as string
  }

  /* ---------------------------------------------------------------------- */
  /*                               S U B M I T                              */
  /* ---------------------------------------------------------------------- */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const toastId = toast.loading('Adding credential…')
    startTransition(async () => {
      try {
        const fd = new FormData(e.currentTarget)

        /* ----------------------- File or manual URL ---------------------- */
        const fileInput = fileRef.current
        const file = fileInput?.files?.[0] ?? null
        const manualUrl = (fd.get('manualUrl') as string | null)?.trim() || ''

        if (file) {
          const uploadedUrl = await uploadFile(file)
          fd.set('fileUrl', uploadedUrl)
        } else if (manualUrl) {
          fd.set('fileUrl', manualUrl)
        } else {
          toast.error('Upload a file or provide a link.', { id: toastId })
          return
        }

        /* Remove helper fields not expected by server action */
        fd.delete('manualUrl')
        fd.delete('file')

        const res = await addCredentialAction(fd)

        if (res && typeof res === 'object' && 'error' in res && res.error) {
          toast.error(res.error, { id: toastId })
          return
        }

        toast.success('Credential added.', { id: toastId })
        router.refresh()
      } catch (err: any) {
        toast.error(err?.message ?? 'Something went wrong.', { id: toastId })
      }
    })
  }

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* Essentials */}
      <div className='grid gap-6 sm:grid-cols-2'>
        {/* Title */}
        <div className='space-y-2'>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            name='title'
            required
            placeholder='e.g. BS Computer Science'
            autoComplete='off'
          />
        </div>

        {/* Category */}
        <div className='space-y-2'>
          <Label htmlFor='category'>Category</Label>
          <Select name='category' required defaultValue='EDUCATION'>
            <SelectTrigger id='category'>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type / sub-type */}
        <div className='space-y-2'>
          <Label htmlFor='type'>Type</Label>
          <Input id='type' name='type' required placeholder='e.g. degree / certificate' />
        </div>

        {/* File picker */}
        <div className='space-y-2 sm:col-span-2'>
          <Label htmlFor='file'>Credential File</Label>
          <div
            className='border-border flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-center'
            onClick={() => fileRef.current?.click()}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={(ev) => {
              ev.preventDefault()
              const dropped = ev.dataTransfer.files?.[0]
              if (dropped) {
                fileRef.current!.files = ev.dataTransfer.files
                setFileName(dropped.name)
              }
            }}
          >
            <UploadCloud className='h-6 w-6 opacity-70' />
            <p className='text-sm'>
              {fileName ? (
                <span className='font-medium'>{fileName}</span>
              ) : (
                'Drag and drop a file or click to browse'
              )}
            </p>
            <Input
              ref={fileRef}
              id='file'
              name='file'
              type='file'
              accept='application/pdf,image/*'
              className='hidden'
              onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name || null)}
            />
          </div>
        </div>

        {/* Manual link fallback */}
        <div className='space-y-2 sm:col-span-2'>
          <Label htmlFor='manualUrl'>Or paste a link</Label>
          <Input
            id='manualUrl'
            name='manualUrl'
            type='url'
            placeholder='https://example.com/credential.pdf'
          />
          <p className='text-muted-foreground text-xs'>
            Upload credential file or paste a link – the upload takes priority if both are provided.
          </p>
        </div>
      </div>

      <IssuerSelect />

      <Button type='submit' disabled={isPending} className='w-full sm:w-max'>
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Saving…
          </>
        ) : (
          'Add Credential'
        )}
      </Button>
    </form>
  )
}
