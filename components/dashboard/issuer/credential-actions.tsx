'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { ArrowUpRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  rejectCredentialAction,
  unverifyCredentialAction,
} from '@/app/(dashboard)/issuer/credentials/actions'
import { Button } from '@/components/ui/button'
import { mintCredential } from '@/lib/credential-nft'
import { CredentialStatus } from '@/lib/db/schema/candidate'
import { ensureSigner, buildExplorerLink } from '@/lib/utils'
import { extractAddressFromDid, toBytes32 } from '@/lib/utils/address'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

interface CredentialActionsProps {
  credentialId: number
  status: CredentialStatus
  /** did:polkadot:0x… of the candidate */
  candidateDid: string
  credentialTitle: string
  credentialType: string
  candidateName: string
  issuerDid: string
}

export function CredentialActions({
  credentialId,
  status,
  candidateDid,
  credentialTitle,
  credentialType,
  candidateName,
  issuerDid,
}: CredentialActionsProps) {
  const router = useRouter()
  const { selectedAccount } = usePolkadotExtension()

  /* Loading toggles */
  const [approving, setApproving] = useState(false)
  const [rejecting, setRejecting] = useState(false)
  const [unverifying, setUnverifying] = useState(false)

  /* ------------------------------------------------------------------ */
  /*                              Reject                               */
  /* ------------------------------------------------------------------ */
  async function handleReject() {
    if (rejecting) return
    setRejecting(true)
    try {
      const fd = new FormData()
      fd.append('credentialId', credentialId.toString())
      const res = (await rejectCredentialAction({}, fd)) as {
        error?: string
        success?: string
      }
      if (res.error) toast.error(res.error)
      if (res.success) {
        toast.success(res.success)
        router.push('/issuer/requests')
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Something went wrong.')
    } finally {
      setRejecting(false)
    }
  }

  /* ------------------------------------------------------------------ */
  /*                             Unverify                              */
  /* ------------------------------------------------------------------ */
  async function handleUnverify() {
    if (unverifying) return
    setUnverifying(true)
    try {
      const fd = new FormData()
      fd.append('credentialId', credentialId.toString())
      const res = (await unverifyCredentialAction({}, fd)) as {
        error?: string
        success?: string
      }
      if (res.error) toast.error(res.error)
      if (res.success) {
        toast.success(res.success)
        router.push('/issuer/requests')
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Something went wrong.')
    } finally {
      setUnverifying(false)
    }
  }

  /* ------------------------------------------------------------------ */
  /*                             Approve                               */
  /* ------------------------------------------------------------------ */
  async function handleApprove(e: React.FormEvent) {
    e.preventDefault()
    if (approving) return

    try {
      ensureSigner(selectedAccount)
    } catch (err: any) {
      toast.error(err.message)
      return
    }

    const to = extractAddressFromDid(candidateDid)
    if (!to) {
      toast.error('Malformed candidate DID.')
      return
    }

    const vcPayload = {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'PolkaStampCredential'],
      issuer: issuerDid,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: candidateDid,
        title: credentialTitle,
        type: credentialType,
        candidateName,
      },
    } as const
    const vcHash = toBytes32(JSON.stringify(vcPayload))

    const toastId = toast.loading('Signing credential…')
    setApproving(true)

    try {
      const txResult: any = await mintCredential({
        account: selectedAccount!,
        to,
        vcHash,
        uri: '',
      })

      const txHash: `0x${string}` | null = txResult?.txHash ?? null
      toast.loading('Broadcasting transaction…', { id: toastId })

      if (txHash) {
        toast.loading(`Tx sent: ${txHash.slice(0, 10)}…`, {
          id: toastId,
          action: {
            label: <ArrowUpRight className='h-4 w-4' />,
            onClick: () => window.open(buildExplorerLink(txHash), '_blank'),
          },
        })
      }

      /* Attempt tokenId extraction from events (best-effort) */
      let tokenId = ''
      try {
        const ev = (txResult?.events ?? []).find(
          (e: any) => e.value?.type === 'CredentialMinted' || e.type === 'CredentialMinted',
        )
        tokenId = ev?.value?.value?.token_id?.toString() ?? ev?.value?.token_id?.toString() ?? ''
      } catch {
        /* ignore */
      }

      /* Backend verification */
      await fetch('/api/credentials/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credentialId,
          tokenId,
          txHash: txHash ?? '',
        }),
      })

      toast.success('Credential verified ✅', { id: toastId })
      router.push('/issuer/requests')
    } catch (err: any) {
      toast.error(err?.message ?? 'Transaction failed.', { id: toastId })
    } finally {
      setApproving(false)
    }
  }

  /* ------------------------------------------------------------------ */
  /*                                UI                                 */
  /* ------------------------------------------------------------------ */
  const approveLabel = 'Approve & Anchor'

  if (status === CredentialStatus.PENDING || status === CredentialStatus.UNVERIFIED) {
    return (
      <div className='flex flex-wrap gap-4'>
        <form onSubmit={handleApprove}>
          <Button type='submit' disabled={approving}>
            {approving ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Processing…
              </>
            ) : (
              approveLabel
            )}
          </Button>
        </form>

        <Button type='button' variant='destructive' disabled={rejecting} onClick={handleReject}>
          {rejecting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing…
            </>
          ) : (
            'Reject'
          )}
        </Button>
      </div>
    )
  }

  if (status === CredentialStatus.REJECTED) {
    return (
      <form onSubmit={handleApprove}>
        <Button type='submit' disabled={approving}>
          {approving ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing…
            </>
          ) : (
            approveLabel
          )}
        </Button>
      </form>
    )
  }

  if (status === CredentialStatus.VERIFIED) {
    return (
      <div className='flex flex-wrap gap-4'>
        <Button type='button' variant='outline' disabled={unverifying} onClick={handleUnverify}>
          {unverifying ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing…
            </>
          ) : (
            'Unverify'
          )}
        </Button>

        <Button type='button' variant='destructive' disabled={rejecting} onClick={handleReject}>
          {rejecting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing…
            </>
          ) : (
            'Reject'
          )}
        </Button>
      </div>
    )
  }

  return null
}
