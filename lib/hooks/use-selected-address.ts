'use client'

import { toH160Hex } from '@/lib/contract-utils'
import { usePolkadotExtension } from '@/providers/polkadot-extension-provider'

/**
 * React hook that returns the currently selected wallet address
 * as a 0x-prefixed 20-byte hex string, or null when no account
 * is connected/selected.
 */
export function useSelectedAddress(): `0x${string}` | null {
  const { selectedAccount } = usePolkadotExtension()
  if (!selectedAccount) return null
  try {
    return toH160Hex(selectedAccount.address)
  } catch {
    return null
  }
}