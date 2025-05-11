'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { generateCandidateFit } from '@/app/(tools)/recruiter/actions'
import { Button } from '@/components/ui/button'

interface GenerateFitButtonProps {
  candidateId: number
  onGenerated?: (json: string) => void
}

/**
 * Async button that generates an AI "Why Hire" fit summary for the specified
 * candidate and refreshes the page to surface cached data for subsequent renders.
 */
export default function GenerateFitButton({ candidateId, onGenerated }: GenerateFitButtonProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleClick() {
    const toastId = toast.loading('Analysing fit…')
    startTransition(async () => {
      try {
        const res = await generateCandidateFit(candidateId)
        if ('error' in res && res.error) {
          throw new Error(res.error)
        }
        onGenerated?.(res.summaryJson ?? '')
        toast.success('Fit summary generated.', { id: toastId, icon: <Sparkles /> })
        router.refresh()
      } catch (err: any) {
        toast.error(err?.message ?? 'Failed to generate fit summary.', { id: toastId })
      }
    })
  }

  return (
    <Button onClick={handleClick} disabled={pending} variant='outline' size='sm' className='gap-2'>
      {pending ? <Loader2 className='h-4 w-4 animate-spin' /> : <Sparkles className='h-4 w-4' />}
      Why Hire
    </Button>
  )
}
