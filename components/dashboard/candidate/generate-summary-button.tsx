'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { Loader2, Bot } from 'lucide-react'
import { toast } from 'sonner'

import { generateCandidateSummary } from '@/app/(tools)/candidates/actions'
import { Button } from '@/components/ui/button'

export default function GenerateSummaryButton({ candidateId }: { candidateId: number }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    const toastId = toast.loading('Generating summary…')
    startTransition(async () => {
      try {
        await generateCandidateSummary(candidateId)
        toast.success('Summary generated.', { id: toastId })
        router.refresh()
      } catch (err: any) {
        toast.error(err?.message ?? 'Failed to generate summary.', { id: toastId })
      }
    })
  }

  return (
    <Button onClick={handleClick} disabled={isPending} className='gap-2'>
      {isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : <Bot className='h-4 w-4' />}
      Generate AI Summary
    </Button>
  )
}
