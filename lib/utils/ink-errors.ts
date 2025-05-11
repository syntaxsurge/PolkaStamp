import React from 'react'

import { WS_URL } from '@/lib/config'
import { decodeDispatchError } from '@/lib/utils'
import { ACCOUNT_MAPPING_GUIDE_STEPS } from './account-mapping'

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
    typeof err === 'string' ? err : err instanceof Error ? err.message : JSON.stringify(err ?? '')

  /* Insufficient-funds patterns not caught above */
  if (/Payment/i.test(raw) || /InsufficientBalance/i.test(raw)) {
    return 'Insufficient balance to pay for gas. Please deposit some tokens and retry.'
  }

  /* ---------------------------------------------------------------------- */
  /*                    D I S P A T C H   E R R O R   C O D E                */
  /* ---------------------------------------------------------------------- */
  const decoded = decodeDispatchError(err)

  /* Unmapped account — return rich toast element */
  if (/accountunmapped/i.test(raw) || /accountunmapped/i.test(decoded)) {
    return renderUnmappedToast()
  }

  /* Anything else decoded successfully */
  if (decoded && decoded !== 'Module error') return decoded

  return raw
}

/* -------------------------------------------------------------------------- */
/*                              H E L P E R S                                 */
/* -------------------------------------------------------------------------- */

/**
 * Build a React element containing the full unmapped-account guide
 * along with a direct link to Polkadot-JS Apps for quick mapping.
 */
function renderUnmappedToast(): React.ReactElement {
  const mappingLink = `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(WS_URL)}#/extrinsics`

  return React.createElement(
    'span',
    { className: 'flex flex-col gap-2 text-sm' },
    React.createElement('strong', null, 'Your account is not yet mapped on the local chain.'),
    React.createElement(
      'ol',
      { className: 'list-decimal ml-4 space-y-1 text-left' },
      ACCOUNT_MAPPING_GUIDE_STEPS.map((step, i) => React.createElement('li', { key: i }, step)),
    ),
    React.createElement(
      'a',
      {
        href: mappingLink,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-primary underline font-medium mt-1',
      },
      'Open mapping ↗',
    ),
  )
}