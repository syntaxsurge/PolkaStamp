import { u8aToHex } from '@polkadot/util'
import { decodeAddress, keccakAsHex } from '@polkadot/util-crypto'
import { FixedSizeBinary, createClient, PolkadotClient } from 'polkadot-api'
import { withPolkadotSdkCompat } from 'polkadot-api/polkadot-sdk-compat'
import { getWsProvider } from 'polkadot-api/ws-provider/web'

/* ------------------------- address / hash helpers ------------------------ */

/**
 * Ensure a lowercase 0x-prefixed 20-byte hex string.
 */
export function normalizeH160(hex: string): `0x${string}` {
  if (!hex.startsWith('0x')) hex = `0x${hex}`
  if (hex.length !== 42) throw new Error(`Expected 20-byte (H160) hex, got ${hex}`)
  return hex.toLowerCase() as `0x${string}`
}

/**
 * Convert any Substrate/Polkadot address (0x…, SS58) into the Frontier-style
 * EVM address used on chain:
 *
 *   1. decode SS58 → 32-byte public key
 *   2. keccak-256 hash of that public key
 *   3. **take the *last* 20 bytes** (bytes 12‥31) – mirrors pallet-ethereum
 *
 * The previous implementation sliced the *first* 20 bytes and therefore
 * produced a mismatching H160.  This update aligns the client-side helper
 * with `account_to_h160` used by the smart contract runtime.
 */
export function toH160Hex(addr: string): `0x${string}` {
  /* Already an H160 ----------------------------------------------------- */
  if (addr.startsWith('0x') && addr.length === 42) return normalizeH160(addr)

  /* Decode SS58/AccountId-32 and hash → H160 ---------------------------- */
  const pubKey = decodeAddress(addr) // Uint8Array(32)
  const hash = keccakAsHex(pubKey, 256) // 0x…64

  /* Frontier & pallet-ethereum keep the *last* 20 bytes (offset 12) */
  const h160 = `0x${hash.slice(-40)}`
  return normalizeH160(h160)
}

/** Convert an address to FixedSizeBinary<20>. */
export const h160Binary = (addr: string) =>
  FixedSizeBinary.fromHex(toH160Hex(addr)) as FixedSizeBinary<20>

/** Convert a 32-byte hex to FixedSizeBinary<32>. */
export const hash32Binary = (hex: string) =>
  FixedSizeBinary.fromHex(hex.startsWith('0x') ? hex : `0x${hex}`) as FixedSizeBinary<32>

/* ----------------------------- misc helpers ----------------------------- */

export const isEmpty = (b: any) =>
  !b || (b instanceof Uint8Array ? b.length === 0 : b.asBytes?.().length === 0)

export function safeDecode<T>(fn: (d: any) => T, data: any, fallback: T): T {
  try {
    return fn(data)
  } catch {
    return fallback
  }
}

/** Convert various binary hash representations into a 0x-prefixed hex. */
export function toHexString(value: unknown): `0x${string}` | null {
  if (!value) return null

  if (typeof value === 'string') {
    return value.startsWith('0x') ? (value as `0x${string}`) : (`0x${value}` as `0x${string}`)
  }

  // FixedSizeBinary & objects exposing toHex()
  if (typeof (value as any).toHex === 'function') return (value as any).toHex()

  // Objects exposing asBytes()
  if (typeof (value as any).asBytes === 'function')
    return u8aToHex((value as any).asBytes()) as `0x${string}`

  if (value instanceof Uint8Array) return u8aToHex(value) as `0x${string}`

  try {
    const str = (value as any).toString()
    if (str && typeof str === 'string')
      return str.startsWith('0x') ? (str as `0x${string}`) : (`0x${str}` as `0x${string}`)
  } catch {
    /* noop */
  }
  return null
}

/* ------------------- singleton Polkadot-API client ---------------------- */

let _client: PolkadotClient | null = null
export function getPapiClient(wsUrl: string) {
  if (!_client) {
    _client = createClient(withPolkadotSdkCompat(getWsProvider(wsUrl)))
  }
  return _client
}
