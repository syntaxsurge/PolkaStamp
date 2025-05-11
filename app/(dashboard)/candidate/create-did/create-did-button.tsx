'use client'

import * as React from 'react'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { toH160Hex } from '@/lib/contract-utils'
import { createDid } from '@/lib/did-registry'
import { buildExplorerLink, ensureSigner } from '@/lib/utils'
import { parseInkError } from '@/lib/utils/ink-errors'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

import { createDidAction } from './actions'

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export function CreateDidButton() {
  const { selectedAccount } = usePolkadotExtension()
  const [pending, setPending] = React.useState(false)

  /* ---------------------------------------------------------------------- */
  /*                                HANDLER                                 */
  /* ---------------------------------------------------------------------- */

  async function handleClick() {
    if (pending) return

    /* Pre-flight signer check */
    try {
      ensureSigner(selectedAccount)
    } catch (err: any) {
      toast.error(parseInkError(err))
      return
    }

    const toastId = toast.loading('Signing & submitting…')
    setPending(true)

    try {
      /* Chain call — zero-hash inline as per spec */
      const owner = toH160Hex(selectedAccount!.address)
      const zeroHash = '0x' + '0'.repeat(64)

      const txResult = await createDid({
        account: selectedAccount!,
        owner,
        docHash: zeroHash,
      })

      /* Persist to backend */
      const did = `did:polkadot:${owner}`
      const fd = new FormData()
      fd.append('did', did)

      const res = await createDidAction({}, fd)

      if (res && 'error' in res && res.error) {
        toast.error(res.error, { id: toastId })
      } else {
        toast.success(res?.success ?? 'Team DID registered successfully ✅', {
          id: toastId,
          action: txResult.txHash
            ? {
                label: 'View',
                onClick: () => window.open(buildExplorerLink(txResult.txHash!), '_blank'),
              }
            : undefined,
        })
      }
    } catch (err: any) {
      toast.error(parseInkError(err), { id: toastId })
    } finally {
      setPending(false)
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <Button onClick={handleClick} disabled={pending} className='w-full md:w-max'>
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Registering DID…
        </>
      ) : (
        'Create DID for My Team'
      )}
    </Button>
  )
}
