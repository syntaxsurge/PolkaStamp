import React from 'react'

import { decodeDispatchError } from '@/lib/utils'
import { WS_URL } from '@/lib/config'

/* -------------------------------------------------------------------------- */
/*                          I N K   E R R O R   P A R S E R                   */
/* -------------------------------------------------------------------------- */

/**
 * Convert raw Ink! / Substrate errors into short, human-friendly messages that
 * can be displayed inside toast notifications.
 *
 * - Detects `"Invalid → Payment"` objects returned by `reviveCall` (simulation)
 *   when the caller’s balance is insufficient.
 * - Recognises specific Revive-pallet mapping errors and shows actionable
 *   instructions with a handy "Open mapping ↗” link rendered inside the toast.
 * - Falls back to the improved `decodeDispatchError` helper and finally to a
 *   prettified string representation for unknown cases.
 */
export function parseInkError(err: unknown): string | React.ReactElement {
  /* ---------------------------------------------------------------------- */
  /*                      S T R U C T U R E D   O B J E C T S                */
  /* ---------------------------------------------------------------------- */
  if (
    err &&
    typeof err === 'object' &&
    (err as any).type === 'Invalid' &&
    (err as any).value?.type === 'Payment'
  ) {
    return 'Insufficient balance to pay for gas. Please top up your account and try again.'
  }

  /* ---------------------------------------------------------------------- */
  /*                        S T R I N G   /   E R R O R                      */
  /* ---------------------------------------------------------------------- */
  const raw =
    typeof err === 'string'
      ? err
      : err instanceof Error
        ? err.message
        : JSON.stringify(err ?? '')

  /* Insufficient-funds patterns not caught above */
  if (/Payment/i.test(raw) || /InsufficientBalance/i.test(raw)) {
    return 'Insufficient balance to pay for gas. Please deposit some tokens and retry.'
  }

  /* ---------------------------------------------------------------------- */
  /*               R A W   R E V I V E :   A C C O U N T U N M A P P E D      */
  /* ---------------------------------------------------------------------- */
  if (raw.toLowerCase().includes('revive') && raw.toLowerCase().includes('accountunmapped')) {
    return renderUnmappedToast(raw)
  }

  /* ---------------------------------------------------------------------- */
  /*                    D I S P A T C H   E R R O R   C O D E                */
  /* ---------------------------------------------------------------------- */
  const decoded = decodeDispatchError(err)

  /* Newline guidance for unmapped accounts received from Revive pallet */
  if (
    decoded.toLowerCase().includes('revive') &&
    decoded.toLowerCase().includes('accountunmapped')
  ) {
    return renderUnmappedToast(decoded)
  }

  if (decoded && decoded !== 'Module error') return decoded

  return raw
}

/* -------------------------------------------------------------------------- */
/*                              H E L P E R S                                 */
/* -------------------------------------------------------------------------- */

/**
 * Build a React element summarising the unmapped-account error and include
 * a link that launches Polkadot.js Apps in a new tab so users can map quickly.
 */
function renderUnmappedToast(prefix: string): React.ReactElement {
  const mappingLink = `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(
    WS_URL,
  )}#/extrinsics`
  return React.createElement(
    'span',
    { className: 'flex flex-col gap-1' },
    React.createElement('span', null, prefix),
    React.createElement(
      'span',
      null,
      'Your account is not yet mapped on the local chain.',
    ),
    React.createElement(
      'a',
      {
        href: mappingLink,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-primary underline font-medium',
      },
      'Open mapping ↗',
    ),
  )
}