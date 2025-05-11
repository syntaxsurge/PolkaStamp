import { stringToU8a } from '@polkadot/util'
import { keccakAsHex } from '@polkadot/util-crypto'

import { toH160Hex } from '@/lib/contract-utils'

/* ------------------------------------------------------------------ */
/*                           A D D R E S S  U T I L S                 */
/* ------------------------------------------------------------------ */

/**
 * Canonical H160 regex – **lower-case** 0x-prefixed 20-byte hex string.
 * All callers must normalise any mixed-case input before validation so the
 * backend operates on a single, predictable representation.
 */
export const H160_REGEX = /^0x[0-9a-f]{40}$/

/** did:polkadot:<H160> pattern derived from the shared H160 regex */
export const POLKADOT_DID_REGEX = new RegExp(`^did:polkadot:${H160_REGEX.source.slice(1, -1)}$`)

/**
 * Extract an Ethereum/Polkadot H160 address from a DID
 * (`did:polkadot:0x…`) or a raw address (`0x…`).
 * Accepts a string, an empty string, or null; returns a **lower-case**
 * address string or null if invalid.
 *
 * @param value - DID, raw address, an empty string, or null.
 * @returns     Lower-case 0x… address string or null.
 */
export function extractAddressFromDid(value: string | null): `0x${string}` | null {
  if (!value) return null

  const trimmed = value.trim()
  if (trimmed === '') return null

  const didMatch = trimmed.match(/^did:(?:polkadot):(0x[0-9a-f]{40})$/)
  if (didMatch) return didMatch[1] as `0x${string}`

  const rawMatch = trimmed.match(H160_REGEX)
  if (rawMatch) return rawMatch[0] as `0x${string}`

  return null
}

/**
 * Normalise any DID / address input into a lower-case 0x-prefixed H160 hex.
 * Supports `did:polkadot:0x…`, raw `0x…` hex and SS58-encoded addresses.
 *
 * @throws Error when the value cannot be parsed.
 */
export function normalizeAddressInput(value: string): `0x${string}` {
  const trimmed = value.trim()
  if (!trimmed) {
    throw new Error('Empty address')
  }
  const extracted = extractAddressFromDid(trimmed)
  try {
    /* toH160Hex already lower-cases; any mixed-case input is normalised here */
    return toH160Hex(extracted ?? trimmed)
  } catch {
    throw new Error('Invalid DID or address')
  }
}

/* ------------------------------------------------------------------ */
/*                         hashing helpers                            */
/* ------------------------------------------------------------------ */

function isHexStringOfLength(hex: string, bytes: number): boolean {
  return /^0x[0-9a-fA-F]+$/.test(hex) && hex.length === 2 + bytes * 2
}

/**
 * Ensures a 32-byte hex string:
 * - If `input` is already a 0x-prefixed 32-byte hex, it’s returned unchanged.
 * - Otherwise, returns the Keccak-256 hash of its UTF-8 bytes.
 *
 * @param input  Any string to hash or a 0x…32-byte hex to pass through.
 * @returns      A 0x…32-byte hex string.
 */
export function toBytes32(input: string): string {
  const trimmed = input.trim()
  return isHexStringOfLength(trimmed, 32)
    ? trimmed.toLowerCase()
    : keccakAsHex(stringToU8a(trimmed), 256)
}

/**
 * Shorten an address for UI display (e.g. 0x1234…abcd).
 */
export function truncateAddress(addr?: string | null): string {
  if (!addr) return '—'
  return addr.length <= 10 ? addr : `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

export function trimAddress(address: string, length = 4) {
  return `${address.slice(0, length)}...${address.slice(-length)}`
}
