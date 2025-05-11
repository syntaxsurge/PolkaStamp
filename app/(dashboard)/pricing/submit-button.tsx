'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { syncSubscription } from '@/lib/payments/client'
import { paySubscription } from '@/lib/subscription-manager'
import type { SubmitButtonProps } from '@/lib/types/forms'
import { buildExplorerLink, ensureSigner } from '@/lib/utils'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

/**
 * Pay‑in‑DOT subscription checkout button (Polkadot API version).
 */
export function SubmitButton({ planKey, priceWei }: SubmitButtonProps) {
  const router = useRouter()
  const { selectedAccount } = usePolkadotExtension()

  const [pending, setPending] = useState(false)

  /* ------------------------------------------------------------------ */
  /*                            H A N D L E R                           */
  /* ------------------------------------------------------------------ */

  async function handleClick() {
    if (pending) return
    try {
      ensureSigner(selectedAccount)
    } catch (err: any) {
      toast.error(err.message)
      return
    }

    if (priceWei === undefined || priceWei === null) {
      toast.error('Price unavailable.')
      return
    }

    const toastId = toast.loading('Preparing transaction…')
    setPending(true)

    try {
      /* Execute chain call */
      toast.loading('Signing & submitting…', { id: toastId })
      const txResult = await paySubscription({
        account: selectedAccount!,
        team: selectedAccount!.address,
        planKey,
        value: BigInt(priceWei),
      })

      /* Show explorer link if available */
      if (txResult.txHash) {
        toast.loading(`Tx sent: ${txResult.txHash.slice(0, 10)}…`, {
          id: toastId,
          action: {
            label: 'View',
            onClick: () => window.open(buildExplorerLink(txResult.txHash!), '_blank'),
          },
        })
      }

      /* Persist to backend */
      await syncSubscription(planKey)

      toast.success('Subscription activated ✅', { id: toastId })
      router.refresh()
    } catch (err: any) {
      toast.error(err?.message ?? 'Transaction failed.', { id: toastId })
    } finally {
      setPending(false)
    }
  }

  /* ------------------------------------------------------------------ */
  /*                                UI                                  */
  /* ------------------------------------------------------------------ */

  return (
    <div className='flex flex-col items-center gap-1'>
      <Button
        onClick={handleClick}
        disabled={pending}
        className='flex w-full items-center justify-center rounded-full'
      >
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Processing…
          </>
        ) : (
          <>
            Get Started
            <ArrowRight className='ml-2 h-4 w-4' />
          </>
        )}
      </Button>
    </div>
  )
}
