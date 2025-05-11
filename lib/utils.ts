import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import { WS_URL } from './config'
import { buildAccountMappingInstructions, renderAccountMappingToast } from './utils/account-mapping'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DECIMALS = 18n
const TEN_POW_DECIMALS = 10n ** DECIMALS

/** Convert wei → human decimal string (trim trailing zeros). */
export function weiToDecimal(wei: bigint | string): string {
  const value = BigInt(wei)
  const whole = value / TEN_POW_DECIMALS
  const fraction = value % TEN_POW_DECIMALS
  if (fraction === 0n) return whole.toString()
  const fractionStr = fraction.toString().padStart(Number(DECIMALS), '0').replace(/0+$/, '')
  return `${whole}.${fractionStr}`
}

/** Convert decimal string → wei; throws for invalid input. */
export function decimalToWei(input: string): bigint {
  const sanitized = input.trim()
  if (!/^\d+(\.\d+)?$/.test(sanitized)) {
    throw new Error('Invalid number format')
  }
  const [whole, frac = ''] = sanitized.split('.')
  if (frac.length > Number(DECIMALS)) {
    throw new Error(`Maximum ${DECIMALS} decimal places allowed`)
  }
  const weiStr = whole + frac.padEnd(Number(DECIMALS), '0')
  return BigInt(weiStr)
}

/**
 * Ensure the user has selected an account before proceeding.
 * Throws an error when the account is null/undefined.
 */
export function ensureSigner(account: { address: string } | null | undefined): asserts account {
  if (!account) throw new Error('Connect a wallet account first.')
}

/* ------------------------------------------------------------------ */
/*                      blockchain-specific helpers                   */
/* ------------------------------------------------------------------ */

/** Build a Polkadot-JS Apps explorer link for a given transaction hash. */
export function buildExplorerLink(hash: string): string {
  return `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(WS_URL)}#/explorer/query/${hash}`
}

export function stringifyWithBigInt(obj: unknown) {
  return JSON.stringify(obj, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
}

/** Format update date/time */
export function formatLastUpdated(date?: Date): string {
  if (!date) return 'Not yet updated'

  const now = new Date()
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success('Copied to clipboard'))
    .catch(() => toast.error('Failed to copy text'))
}

export function buildLink(
  basePath: string,
  init: Record<string, string>,
  overrides: Record<string, unknown>,
) {
  const sp = new URLSearchParams(init)
  Object.entries(overrides).forEach(([k, v]) => sp.set(k, String(v)))
  Array.from(sp.entries()).forEach(([k, v]) => {
    if (v === '') sp.delete(k)
  })
  const qs = sp.toString()
  return `${basePath}${qs ? `?${qs}` : ''}`
}

/**
 * Convert enum-like or snake_case strings to readable text.
 * e.g. "PENDING_APPROVAL" → "pending approval".
 */
export function prettify(text?: string | null): string {
  return text ? text.replaceAll('_', ' ').toLowerCase() : '—'
}

/**
 * Decode a Polkadot dispatch error into human-readable form.
 *
 * **Important**: Always returns a _string_. When `AccountUnmapped`
 * is detected in the browser it fires a rich `toast.custom`
 * containing the JSX guide, while callers still receive a concise
 * message – preventing "[object Object]” artefacts in default
 * `toast.error()` usages throughout the app.
 */
export function decodeDispatchError(error: unknown): string {
  /* ---------------- base decoding logic ------------------ */
  let msg = 'Unknown error'

  if (!error || typeof error !== 'object') return msg
  const err: any = error

  if (err.type === 'Module' && err.value && typeof err.value === 'object') {
    const pallet = err.value.type ?? 'UnknownModule'

    let detail = 'UnknownError'
    if (err.value.value) {
      const inner = err.value.value
      if (typeof inner === 'object' && inner.type) {
        detail = inner.type
      } else if (typeof inner === 'string') {
        detail = inner
      }
    }

    msg = `Module: ${pallet}: ${detail}`
  } else if (err.type && err.type !== 'Module') {
    msg = String(err.type)
  } else if (err.module) {
    const mod = err.module
    const pallet = mod.pallet ?? mod.section ?? mod.type ?? 'UnknownModule'
    const name =
      mod.name ??
      mod.error ??
      (typeof mod.value === 'string' ? mod.value : undefined) ??
      'UnknownError'
    msg = `${pallet}.${name}`
  } else if (err.value && typeof err.value === 'object') {
    const val: any = err.value
    if (val.type) {
      const pallet = String(val.type)
      if (val.value && typeof val.value === 'object') {
        const inner = val.value
        const innerName =
          inner.name ??
          inner.error ??
          (typeof inner === 'string' ? inner : undefined) ??
          'UnknownError'
        msg = `${pallet}.${innerName}`
      } else {
        msg = pallet
      }
    }
  } else {
    msg = 'Module error'
  }

  /* ------------------ unmapped account ------------------- */
  if (/AccountUnmapped/i.test(msg)) {
    /* Fire rich guide toast once per error on the client only */
    if (typeof window !== 'undefined') {
      toast.custom(() => renderAccountMappingToast())
    }
    /* Always return plain text so default toasts work */
    return buildAccountMappingInstructions().split('\n')[0]
  }

  return msg
}

/* ------------------------------------------------------------------ */
/*                         I P F S   H E L P E R S                    */
/* ------------------------------------------------------------------ */

/** Lightweight check if a URL uses the ipfs:// protocol */
export function isIpfs(url: string): boolean {
  return url.startsWith('ipfs://')
}

/**
 * Convert an IPFS URI to a HTTP gateway URL.
 *
 * @example
 * buildIpfsGatewayUrl('ipfs://bafy.../doc.pdf')
 * // → 'https://ipfs.io/ipfs/bafy.../doc.pdf'
 */
export function buildIpfsGatewayUrl(ipfsUrl: string, gateway: string = 'ipfs.io'): string {
  if (!isIpfs(ipfsUrl)) return ipfsUrl
  const [, cidAndPath] = ipfsUrl.split('ipfs://')
  return `https://${gateway}/ipfs/${cidAndPath}`
}

/**
 * Resolve an IPFS URI to a public gateway URL, or return HTTP(S) links unchanged.
 */
export function gatewayUrl(ipfsOrHttp: string): string {
  return isIpfs(ipfsOrHttp) ? buildIpfsGatewayUrl(ipfsOrHttp) : ipfsOrHttp
}
