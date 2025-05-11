'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { Loader2 } from 'lucide-react'
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
/*                                    VIEW                                    */
/* -------------------------------------------------------------------------- */

export default function AddCredentialForm({ addCredentialAction }: AddCredentialFormProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  /* ---------------------------------------------------------------------- */
  /*                               S U B M I T                              */
  /* ---------------------------------------------------------------------- */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const toastId = toast.loading('Adding credential…')
    startTransition(async () => {
      try {
        const res = await addCredentialAction(fd)

        /* Explicit error from server-action */
        if (res && typeof res === 'object' && 'error' in res && res.error) {
          toast.error(res.error, { id: toastId })
          return
        }

        /* Successful result without redirect */
        toast.success('Credential added.', { id: toastId })
        router.refresh()
      } catch (err: any) {
        /* NEXT_REDIRECT digest indicates a server-side redirect on success */
        if (
          err &&
          typeof err === 'object' &&
          'digest' in err &&
          (err as any).digest === 'NEXT_REDIRECT'
        ) {
          toast.success('Credential added.', { id: toastId })
          router.refresh()
          return
        }

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

        {/* File URL */}
        <div className='space-y-2 sm:col-span-2'>
          <Label htmlFor='fileUrl'>File URL</Label>
          <Input
            id='fileUrl'
            name='fileUrl'
            type='url'
            required
            placeholder='https://university.edu/diploma.pdf'
          />
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
