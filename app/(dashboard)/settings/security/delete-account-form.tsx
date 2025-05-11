'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { stringToU8a, u8aToHex } from '@polkadot/util'
import { Loader2, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { WALLET_HEADER } from '@/lib/constants/blockchain'
import { toH160Hex } from '@/lib/contract-utils'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

/* -------------------------------------------------------------------------- */
/*                         D E L E T E   A C C O U N T                        */
/* -------------------------------------------------------------------------- */

export default function DeleteAccountForm() {
  const router = useRouter()
  const { selectedAccount } = usePolkadotExtension()
  const [pending, setPending] = useState(false)

  async function handleDelete() {
    if (pending) return

    if (!selectedAccount) {
      toast.error('Please connect your wallet first.')
      return
    }

    /* ------------------------------------------------------------------ */
    /*                      P R E P   &   S I G N                         */
    /* ------------------------------------------------------------------ */

    const address = selectedAccount.address
    const message = `I confirm deletion of my PolkaStamp account (${address}) at ${new Date().toISOString()}`

    const signer = selectedAccount.extension?.signer
    if (!signer?.signRaw) {
      toast.error('Wallet does not support raw signing.')
      return
    }

    setPending(true)
    const toastId = toast.loading('Awaiting signature…')

    try {
      const { signature } = await signer.signRaw({
        address,
        data: u8aToHex(stringToU8a(message)),
        type: 'bytes',
      })

      /* ---------------------------------------------------------------- */
      /*                         A P I   C A L L                          */
      /* ---------------------------------------------------------------- */
      toast.loading('Deleting account…', { id: toastId })

      const res = await fetch('/api/auth/delete-account', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          [WALLET_HEADER]: toH160Hex(address),
        },
        body: JSON.stringify({ address, message, signature }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || data?.error) {
        throw new Error(data?.error ?? 'Account deletion failed.')
      }

      toast.success('Account deleted.', { id: toastId })
      router.push('/')
      router.refresh()
    } catch (err: any) {
      toast.error(err?.message ?? 'Signature rejected or transaction failed.', { id: toastId })
      setPending(false)
    }
  }

  return (
    <Button
      variant='destructive'
      onClick={handleDelete}
      disabled={pending}
      className='w-max whitespace-nowrap'
    >
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Deleting…
        </>
      ) : (
        <>
          <Trash className='mr-2 h-4 w-4' />
          Delete Account
        </>
      )}
    </Button>
  )
}
