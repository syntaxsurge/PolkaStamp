'use client'

import * as React from 'react'
import { useState } from 'react'

import { Copy, Loader2, RefreshCcw } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toH160Hex } from '@/lib/contract-utils'
import { hasDid, createDid } from '@/lib/did-registry'
import { buildExplorerLink, copyToClipboard, ensureSigner } from '@/lib/utils'
import { parseInkError } from '@/lib/utils/ink-errors'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

export interface UpdateDidFormProps {
  /** Current stored DID, if any (in env or db). */
  defaultDid?: string
}

/**
 * Admin tool that lets the user (with a connected Polkadot wallet)
 * create a new platform DID or reuse the existing one.
 * All chain interactions are executed client-side with the signer
 * provided by the browser extension – no backend action is required.
 */
export default function UpdateDidForm({ defaultDid }: UpdateDidFormProps) {
  /* ------------------------------------------------------------------ */
  /*                           R E A C T   S T A T E                    */
  /* ------------------------------------------------------------------ */
  const { selectedAccount } = usePolkadotExtension()

  const [currentDid, setCurrentDid] = useState<string>(defaultDid ?? '')
  const [isBusy, setIsBusy] = useState(false)
  const [explorerLink, setExplorerLink] = useState<string | null>(null)

  /* ------------------------------------------------------------------ */
  /*                               H A N D L E R S                      */
  /* ------------------------------------------------------------------ */

  async function handleGenerate() {
    try {
      ensureSigner(selectedAccount)
    } catch (err: any) {
      toast.error(parseInkError(err))
      return
    }

    setIsBusy(true)
    setExplorerLink(null)

    try {
      /** Canonical 0x-prefixed H160 of the selected account */
      const owner = toH160Hex(selectedAccount!.address)

      /* Does a DID already exist for the platform signer address? */
      const exists = await hasDid({
        account: selectedAccount!,
        owner,
      })

      if (exists) {
        toast.success('DID already exists for this address.')
        setCurrentDid(`did:polkadot:${owner}`)
        return
      }

      /* Otherwise create a fresh DID with an empty document hash. */
      const res = await createDid({
        account: selectedAccount!,
        owner,
        docHash: '',
      })

      toast.success('Platform DID created.')
      const txHash = (res as any)?.block?.hash
      if (txHash) setExplorerLink(buildExplorerLink(txHash))

      setCurrentDid(`did:polkadot:${owner}`)
    } catch (err: any) {
      toast.error(parseInkError(err))
    } finally {
      setIsBusy(false)
    }
  }

  /* ------------------------------------------------------------------ */
  /*                                UI                                  */
  /* ------------------------------------------------------------------ */

  return (
    <div className='space-y-6'>
      {/* DID Display ---------------------------------------------------- */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        <Input value={currentDid} readOnly placeholder='No DID yet' className='flex-1 font-mono' />
        <Button
          variant='outline'
          size='icon'
          onClick={() => copyToClipboard(currentDid)}
          disabled={!currentDid}
          className='shrink-0'
          type='button'
        >
          <Copy className='h-4 w-4' />
          <span className='sr-only'>Copy DID</span>
        </Button>
      </div>

      {/* Generate Button ------------------------------------------------- */}
      <Button
        onClick={handleGenerate}
        disabled={isBusy || !selectedAccount}
        className='w-full sm:w-auto'
        type='button'
      >
        {isBusy ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Working…
          </>
        ) : (
          <>
            <RefreshCcw className='mr-2 h-4 w-4' />
            {currentDid ? 'Regenerate DID' : 'Create DID'}
          </>
        )}
      </Button>

      {/* Explorer link --------------------------------------------------- */}
      {explorerLink && (
        <div className='text-sm'>
          <span className='font-medium'>Explorer:&nbsp;</span>
          <a
            href={explorerLink}
            target='_blank'
            rel='noopener noreferrer'
            className='break-all text-blue-500 underline'
          >
            {explorerLink}
          </a>
        </div>
      )}
    </div>
  )
}
