'use client'

import React, { useState, useTransition } from 'react'

import { CheckCircle2, Clipboard, Fingerprint, List, Loader2, XCircle } from 'lucide-react'
import type { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import PageCard from '@/components/ui/page-card'
import { Skeleton } from '@/components/ui/skeleton'
import { StatusBadge } from '@/components/ui/status-badge'
import { hasDid, getDidOwners } from '@/lib/did-registry'
import { normalizeAddressInput } from '@/lib/utils/address'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

/* -------------------------------------------------------------------------- */
/*                               C O M P O N E N T                            */
/* -------------------------------------------------------------------------- */

/** Batch size used when paginating getDidOwners calls. */
const BATCH_SIZE = 50

export default function VerifyDidPage() {
  const { selectedAccount } = usePolkadotExtension()

  /* ----------------------------- check-DID state ------------------------- */
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'verified' | 'unregistered' | 'error' | null>(null)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  /* ---------------------------- owners listing state --------------------- */
  const [owners, setOwners] = useState<string[]>([])
  const [ownersLoading, setOwnersLoading] = useState(false)

  /* ----------------------------- Helpers --------------------------------- */

  function tryNormalise(value: string): string {
    try {
      return normalizeAddressInput(value)
    } catch {
      return value.trim()
    }
  }

  /* ----------------------------- Handlers -------------------------------- */

  /** Verify a single DID / address. */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    /* Validate connected wallet */
    const signer: InjectedPolkadotAccount | null = selectedAccount
    if (!signer) {
      toast.error('Wallet not connected.')
      return
    }

    /* Normalise input to 0x… */
    let owner: `0x${string}`
    try {
      owner = normalizeAddressInput(input)
      /* Reflect normalised value back into the textarea */
      setInput(owner)
    } catch {
      toast.error('Enter a valid Polkadot DID or address.')
      return
    }

    setResult(null)
    setMessage('')

    startTransition(async () => {
      try {
        const exists = await hasDid({ account: signer, owner })

        if (exists) {
          setResult('verified')
          setMessage('This address has minted a DID on-chain.')
          toast.success('DID verified ✅')
        } else {
          setResult('unregistered')
          setMessage('No DID is registered for this address.')
          toast.info('DID not found')
        }
      } catch (err: any) {
        const errMsg = 'Error while querying the contract: ' + String(err?.message || err)
        setResult('error')
        setMessage(errMsg)
        toast.error('Verification failed')
      }
    })
  }

  /** Fetch all verified DID owners in paginated batches. */
  async function handleListOwners() {
    if (ownersLoading) return

    const signer: InjectedPolkadotAccount | null = selectedAccount
    if (!signer) {
      toast.error('Wallet not connected.')
      return
    }

    setOwners([])
    setOwnersLoading(true)

    try {
      let index = 0
      const all: string[] = []
      while (true) {
        const chunk = await getDidOwners({
          account: signer,
          start: index,
          count: BATCH_SIZE,
        })
        if (!chunk.length) break
        all.push(...chunk)
        if (chunk.length < BATCH_SIZE) break
        index += BATCH_SIZE
      }
      setOwners(all)
      toast.success(`Loaded ${all.length} verified DID${all.length === 1 ? '' : 's'}`)
    } catch (err: any) {
      toast.error('Failed to load owners: ' + String(err?.message || err))
    } finally {
      setOwnersLoading(false)
    }
  }

  function pasteFromClipboard() {
    navigator.clipboard
      .readText()
      .then((text) => setInput(tryNormalise(text)))
      .catch(() => toast.error('Clipboard read failed'))
  }

  function handleBlur() {
    setInput((prev) => tryNormalise(prev))
  }

  /* --------------------------------- UI ---------------------------------- */

  return (
    <PageCard
      icon={Fingerprint}
      title='DID Verification'
      description='Check whether a Polkadot Decentralised Identifier is registered on-chain or list all verified DIDs.'
    >
      <div className='space-y-6'>
        {/* explanatory paragraph ------------------------------------------------ */}
        <p className='text-sm leading-relaxed'>
          This tool talks directly to the{' '}
          <code className='bg-muted rounded px-1 py-0.5 text-xs'>DidRegistry</code> smart contract.
          A <strong>verified DID</strong> means the address called{' '}
          <code className='bg-muted rounded px-1 py-0.5 text-xs'>create_did</code> and therefore
          owns a permanent on-chain identifier (<code className='font-mono'>did:polkadot:0x…</code>
          ). If the DID is <em>unregistered</em>, no such transaction exists.
        </p>

        {/* single-check form ---------------------------------------------------- */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={handleBlur}
            rows={3}
            required
            spellCheck={false}
            className='border-border w-full resize-y rounded-md border p-3 font-mono text-xs leading-tight'
            placeholder='did:polkadot:0x1234…  — or —  0x1234…  — or —  5F4Uae…'
          />

          <div className='flex flex-wrap gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Checking…
                </>
              ) : (
                'Check'
              )}
            </Button>

            <Button
              type='button'
              variant='outline'
              onClick={pasteFromClipboard}
              title='Paste from clipboard'
            >
              <Clipboard className='mr-2 h-4 w-4' />
              Paste
            </Button>

            <Button
              type='button'
              variant='secondary'
              onClick={handleListOwners}
              disabled={ownersLoading}
            >
              {ownersLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Loading…
                </>
              ) : (
                <>
                  <List className='mr-2 h-4 w-4' />
                  List Verified DIDs
                </>
              )}
            </Button>
          </div>
        </form>

        {/* single-check result -------------------------------------------------- */}
        {result && (
          <div className='flex items-center gap-2'>
            {result === 'verified' ? (
              <CheckCircle2 className='h-5 w-5 text-emerald-600' />
            ) : result === 'unregistered' ? (
              <XCircle className='h-5 w-5 text-rose-600' />
            ) : (
              <XCircle className='h-5 w-5 text-yellow-600' />
            )}
            <StatusBadge status={result === 'verified' ? 'verified' : 'failed'} />
            <span>{message}</span>
          </div>
        )}

        {/* owners listing ------------------------------------------------------- */}
        {ownersLoading && (
          <div className='space-y-2'>
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className='h-4 w-full' />
            ))}
          </div>
        )}

        {!ownersLoading && owners.length > 0 && (
          <div className='max-h-80 space-y-2 overflow-y-auto'>
            <h3 className='font-medium'>Verified DIDs ({owners.length})</h3>
            <ul className='border-border divide-border max-h-72 space-y-1 overflow-y-auto rounded-md border p-3 font-mono text-xs'>
              {owners.map((addr) => (
                <li key={addr} className='break-all'>
                  did:polkadot:{addr}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageCard>
  )
}
