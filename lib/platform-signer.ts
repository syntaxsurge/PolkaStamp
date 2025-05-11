import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { type InjectedPolkadotAccount } from 'polkadot-api/pjs-signer'
import { getPolkadotSigner } from 'polkadot-api/signer'

import { PLATFORM_SIGNER_MNEMONIC } from '@/lib/config'

let cached: InjectedPolkadotAccount | null = null

/**
 * Returns an `InjectedPolkadotAccount` backed by the mnemonic in `.env`.
 * The instance is derived once then cached for subsequent calls.
 */
export async function getPlatformSigner(): Promise<InjectedPolkadotAccount> {
  if (cached) return cached

  await cryptoWaitReady()
  const kr = new Keyring({ type: 'sr25519' })
  const pair = kr.addFromUri(PLATFORM_SIGNER_MNEMONIC.trim())

  const signer = getPolkadotSigner(pair.publicKey, 'Sr25519', (payload) => pair.sign(payload))

  cached = {
    address: pair.address,
    polkadotSigner: signer,
  } as InjectedPolkadotAccount

  return cached
}
