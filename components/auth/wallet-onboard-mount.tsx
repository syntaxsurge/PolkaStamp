'use client'

import { useEffect, useState } from 'react'

import WalletOnboardModal from '@/components/auth/wallet-onboard-modal'
import { useUser } from '@/lib/auth'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

/**
 * Mount-point component rendered once inside the global <UserProvider/>.
 * It bridges server-derived userPromise and client-side wallet state,
 * feeding both into <WalletOnboardModal/>.
 */
export default function WalletOnboardMount() {
  const { userPromise } = useUser()
  const { selectedAccount } = usePolkadotExtension()

  /* Resolve the userPromise exactly once on the client */
  const [user, setUser] = useState<any | null | undefined>(undefined)

  useEffect(() => {
    let mounted = true
    const maybe = userPromise as unknown
    if (maybe && typeof maybe === 'object' && typeof (maybe as any).then === 'function') {
      ;(maybe as Promise<any>).then(
        (u) => mounted && setUser(u),
        () => mounted && setUser(null),
      )
    } else {
      setUser(maybe as any)
    }
    return () => {
      mounted = false
    }
  }, [userPromise])

  return <WalletOnboardModal isConnected={!!selectedAccount} user={user ?? null} />
}
