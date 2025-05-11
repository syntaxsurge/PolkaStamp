'use client'

import * as React from 'react'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setPlanPrice } from '@/lib/subscription-manager'
import { buildExplorerLink, decimalToWei, ensureSigner, weiToDecimal } from '@/lib/utils'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

/* -------------------------------------------------------------------------- */
/*                                   Props                                    */
/* -------------------------------------------------------------------------- */

interface Props {
  /** Current Base-plan price (wei as string) */
  defaultBaseWei: string
  /** Current Plus-plan price (wei as string) */
  defaultPlusWei: string
}

/* -------------------------------------------------------------------------- */
/*                            C O M P O N E N T                               */
/* -------------------------------------------------------------------------- */

/**
 * Admin form that updates on-chain prices for Base and Plus plans
 * using Polkadot API transactions and explorer links in toasts.
 */
export default function UpdatePlanPricesForm({ defaultBaseWei, defaultPlusWei }: Props) {
  /* ------------------------------- state -------------------------------- */
  const [base, setBase] = React.useState<string>(weiToDecimal(defaultBaseWei))
  const [plus, setPlus] = React.useState<string>(weiToDecimal(defaultPlusWei))
  const [pending, setPending] = React.useState(false)

  /* ------------------------- wallet context ----------------------------- */
  const { selectedAccount } = usePolkadotExtension()

  /* ---------------------------- submit ---------------------------------- */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      ensureSigner(selectedAccount)
    } catch (err: any) {
      toast.error(err.message)
      return
    }

    const toastId = toast.loading('Preparing transactions…')
    setPending(true)

    try {
      const baseWeiNew = decimalToWei(base)
      const plusWeiNew = decimalToWei(plus)

      const jobs: Promise<any>[] = []

      if (baseWeiNew !== BigInt(defaultBaseWei)) {
        jobs.push(
          setPlanPrice({
            account: selectedAccount!,
            planKey: 1,
            newPrice: baseWeiNew,
          }),
        )
      }
      if (plusWeiNew !== BigInt(defaultPlusWei)) {
        jobs.push(
          setPlanPrice({
            account: selectedAccount!,
            planKey: 2,
            newPrice: plusWeiNew,
          }),
        )
      }

      if (jobs.length === 0) {
        toast.info('No changes to update.', { id: toastId })
        return
      }

      toast.loading('Signing & submitting…', { id: toastId })
      const results = await Promise.all(jobs)

      const hash = results[0]?.txHash
      toast.success('Plan prices updated ✅', {
        id: toastId,
        action: hash
          ? {
              label: 'View',
              onClick: () => window.open(buildExplorerLink(hash), '_blank'),
            }
          : undefined,
      })
    } catch (err: any) {
      toast.error(err?.message ?? 'Transaction failed.', { id: toastId })
    } finally {
      setPending(false)
    }
  }

  /* -------------------------------- UI ---------------------------------- */
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid gap-6 sm:grid-cols-2'>
        {/* Base plan */}
        <div>
          <label htmlFor='base' className='mb-1 block text-sm font-medium'>
            Base Plan Price
          </label>
          <Input
            id='base'
            type='number'
            min='0'
            step='0.000000000000000001'
            value={base}
            onChange={(e) => setBase(e.target.value)}
            required
          />
        </div>

        {/* Plus plan */}
        <div>
          <label htmlFor='plus' className='mb-1 block text-sm font-medium'>
            Plus Plan Price
          </label>
          <Input
            id='plus'
            type='number'
            min='0'
            step='0.000000000000000001'
            value={plus}
            onChange={(e) => setPlus(e.target.value)}
            required
          />
        </div>
      </div>

      <Button type='submit' className='w-full sm:w-auto' disabled={pending}>
        {pending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Updating…
          </>
        ) : (
          'Update Prices'
        )}
      </Button>
    </form>
  )
}
