import React from 'react'

import { WS_URL } from '@/lib/config'

/**
 * Canonical step-by-step guide for mapping an account on the local chain.
 */
export const ACCOUNT_MAPPING_GUIDE_STEPS: readonly string[] = [
  'Open "Developer → Extrinsics" in Polkadot-JS Apps.',
  'In "Using the selected account", pick the wallet you wish to map.',
  'In "submit the following extrinsic", choose the "Revive" pallet.',
  'Select the "mapAccount()" function.',
  'Click "Submit Transaction" then "Sign and Submit".',
  'In your extension, hit "Approve".',
  'After the transaction is finalized, your account will be mapped successfully.',
]

/**
 * Plain-text variant used for logs or terminal outputs.
 */
export function buildAccountMappingInstructions(): string {
  return [
    'Your account is not yet mapped on the local chain.',
    ...ACCOUNT_MAPPING_GUIDE_STEPS,
    '',
    `Open mapping ↗  ${getMappingLink()}`,
  ].join('\n')
}

/**
 * Rich JSX variant shown via `toast.custom`.
 * Wrapped in a fixed-width container so Sonner lays it out correctly.
 */
export function renderAccountMappingToast(): React.ReactElement {
  return React.createElement(
    'div',
    {
      className:
        'w-80 max-h-72 overflow-y-auto rounded-md bg-background p-4 shadow-lg flex flex-col gap-3',
    },
    React.createElement(
      'strong',
      { className: 'text-sm font-semibold' },
      'Your account is not yet mapped on the local chain.',
    ),
    React.createElement(
      'ol',
      { className: 'list-decimal ml-5 space-y-1 text-sm leading-relaxed text-left' },
      ACCOUNT_MAPPING_GUIDE_STEPS.map((step, i) =>
        React.createElement('li', { key: i }, step),
      ),
    ),
    React.createElement(
      'a',
      {
        href: getMappingLink(),
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'mt-1 text-primary underline font-medium hover:opacity-80',
      },
      'Open mapping ↗',
    ),
  )
}

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function getMappingLink(): string {
  return `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(
    WS_URL,
  )}#/extrinsics`
}