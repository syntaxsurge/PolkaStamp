'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useActionState, startTransition, useState } from 'react'

import { ArrowUpRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { rejectCredentialAction, unverifyCredentialAction } from '@/app/(dashboard)/issuer/credentials/actions'
import { Button } from '@/components/ui/button'
import { CredentialStatus } from '@/lib/db/schema/candidate'
import { mintCredential } from '@/lib/credential-nft'
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

  /* ------------------- reject / unverify states ----------------------- */
  const [rejectState, reject, rejecting] = useActionState(
    rejectCredentialAction,
    { error: '', success: '' },
  )
  const [unverifyState, unverify, unverifying] = useActionState(
    unverifyCredentialAction,
    { error: '', success: '' },
  )

  /* ------------------- approve states ----------------------- */
  const [approving, setApproving] = useState(false)

  /* ------------------- toast feedback ----------------------- */
  React.useEffect(() => {
    ;[rejectState, unverifyState].forEach((s) => {
      if (s.error) toast.error(s.error)
      if (s.success) toast.success(s.success)
    })
  }, [rejectState, unverifyState])

  React.useEffect(() => {
    if (rejectState.success || unverifyState.success) {
      router.push('/issuer/requests')
    }
  }, [rejectState.success, unverifyState.success, router])

  /* --------------------- helpers ---------------------------- */
  async function handleApprove(e: React.FormEvent) {
    e.preventDefault()
    if (approving) return

    /* Wallet & account checks */
    try {
      ensureSigner(selectedAccount)
    } catch (err: any) {
      toast.error(err.message)
      return
    }

    /* Extract recipient address */
    const to = extractAddressFromDid(candidateDid)
    if (!to) {
      toast.error('Malformed candidate DID.')
      return
    }

    /* Build VC payload & hash */
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
    const vcJson = JSON.stringify(vcPayload)
    const vcHash = toBytes32(vcJson)

    /* Mint credential NFT */
    const toastId = toast.loading('Signing credential…')
    setApproving(true)
    try {
      const { tokenId, txHash } = await mintCredential({
        account: selectedAccount!,
        to,
        vcHash,
        uri: '',
      })

      toast.loading('Broadcasting transaction…', { id: toastId })

      /* Explorer link action */
      toast.loading(`Tx sent: ${txHash.slice(0, 10)}…`, {
        id: toastId,
        action: {
          label: <ArrowUpRight className="h-4 w-4" />,
          onClick: () => window.open(buildExplorerLink(txHash), '_blank'),
        },
      })

      /* Notify backend */
      const res = await fetch('/api/credentials/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credentialId,
          tokenId: tokenId.toString(),
          txHash,
        }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Backend verification failed.')
      }

      toast.success('Credential verified ✅', { id: toastId })
      router.push('/issuer/requests')
    } catch (err: any) {
      toast.error(err?.message ?? 'Transaction failed.', { id: toastId })
    } finally {
      setApproving(false)
    }
  }

  /* ------------------- UI blocks ---------------------------- */
  const approveLabel = 'Approve & Anchor'

  if (status === CredentialStatus.PENDING || status === CredentialStatus.UNVERIFIED) {
    return (
      <div className="flex flex-wrap gap-4">
        {/* Approve */}
        <form onSubmit={handleApprove}>
          <Button type="submit" disabled={approving}>
            {approving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              approveLabel
            )}
          </Button>
        </form>

        {/* Reject */}
        <form onSubmit={(e) => { e.preventDefault(); startTransition(() => reject(new FormData().set('credentialId', credentialId.toString()) as any)) }}>
          <Button type="submit" variant="destructive" disabled={rejecting}>
            {rejecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              'Reject'
            )}
          </Button>
        </form>
      </div>
    )
  }

  if (status === CredentialStatus.REJECTED) {
    return (
      <form onSubmit={handleApprove}>
        <Button type="submit" disabled={approving}>
          {approving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
      <div className="flex flex-wrap gap-4">
        {/* Unverify */}
        <form onSubmit={(e) => { e.preventDefault(); startTransition(() => unverify(new FormData().set('credentialId', credentialId.toString()) as any)) }}>
          <Button type="submit" variant="outline" disabled={unverifying}>
            {unverifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              'Unverify'
            )}
          </Button>
        </form>

        {/* Reject */}
        <form onSubmit={(e) => { e.preventDefault(); startTransition(() => reject(new FormData().set('credentialId', credentialId.toString()) as any)) }}>
          <Button type="submit" variant="destructive" disabled={rejecting}>
            {rejecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              'Reject'
            )}
          </Button>
        </form>
      </div>
    )
  }

  return null
}