'use client'

import * as React from 'react'
import { useActionState, startTransition } from 'react'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { updateCandidateProfile } from './actions'

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  defaultName: string
  defaultBio: string
  defaultTwitterUrl: string
  defaultGithubUrl: string
  defaultLinkedinUrl: string
  defaultWebsiteUrl: string
}

type ActionState = {
  error?: string
  success?: string
}

/* -------------------------------------------------------------------------- */
/*                                    FORM                                    */
/* -------------------------------------------------------------------------- */

export default function ProfileForm({
  defaultName,
  defaultBio,
  defaultTwitterUrl,
  defaultGithubUrl,
  defaultLinkedinUrl,
  defaultWebsiteUrl,
}: Props) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    updateCandidateProfile,
    { error: '', success: '' },
  )

  const [bio, setBio] = React.useState<string>(defaultBio || '')

  /* Keep toast ID to update after server response */
  const toastId = React.useRef<string | number | undefined>(undefined)

  /* Submit handler - show loading toast then trigger server action */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    toastId.current = toast.loading('Saving profile…')
    startTransition(() => formAction(fd))
  }

  /* Update toast once the server action resolves */
  React.useEffect(() => {
    if (!pending && toastId.current !== undefined) {
      if (state.error) {
        toast.error(state.error, { id: toastId.current })
      } else if (state.success) {
        toast.success(state.success, { id: toastId.current })
      }
    }
  }, [state, pending])

  /* ---------------------------- UI ---------------------------- */
  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* ------------------------ Basic Info ------------------------ */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='name' className='font-medium'>
            Full Name
          </Label>
          <Input id='name' name='name' defaultValue={defaultName} required />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='websiteUrl' className='font-medium'>
            Personal Website
          </Label>
          <Input
            id='websiteUrl'
            name='websiteUrl'
            type='url'
            defaultValue={defaultWebsiteUrl}
            placeholder='https://your-site.com'
          />
        </div>
      </div>

      <Separator />

      {/* --------------------------- About -------------------------- */}
      <div className='space-y-2'>
        <Label htmlFor='bio' className='font-medium'>
          About You
        </Label>
        <textarea
          id='bio'
          name='bio'
          rows={6}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={2000}
          className='border-border focus-visible:ring-primary w-full rounded-md border p-3 text-sm focus-visible:ring-2'
          placeholder='Tell recruiters about your background, passions, and goals…'
        />
        <p className='text-muted-foreground text-right text-xs'>{bio.length}/2000</p>
      </div>

      <Separator />

      {/* ------------------------ Social Links ---------------------- */}
      <fieldset className='space-y-4'>
        <legend className='text-base font-medium'>Social Links</legend>

        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='twitterUrl' className='font-medium'>
              Twitter
            </Label>
            <Input
              id='twitterUrl'
              name='twitterUrl'
              type='url'
              defaultValue={defaultTwitterUrl}
              placeholder='https://twitter.com/username'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='githubUrl' className='font-medium'>
              GitHub
            </Label>
            <Input
              id='githubUrl'
              name='githubUrl'
              type='url'
              defaultValue={defaultGithubUrl}
              placeholder='https://github.com/username'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='linkedinUrl' className='font-medium'>
              LinkedIn
            </Label>
            <Input
              id='linkedinUrl'
              name='linkedinUrl'
              type='url'
              defaultValue={defaultLinkedinUrl}
              placeholder='https://linkedin.com/in/username'
            />
          </div>
        </div>
      </fieldset>

      {/* ------------------------- Actions ------------------------- */}
      <Button type='submit' disabled={pending} className='w-full md:w-max'>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Saving…
          </>
        ) : (
          'Save Profile'
        )}
      </Button>
    </form>
  )
}
