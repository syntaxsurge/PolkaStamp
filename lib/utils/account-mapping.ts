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
 * Rich JSX variant rendered inside toast notifications.
 * Uses React.createElement to keep this file as .ts (non-TSX).
 */
export function renderAccountMappingToast(): React.ReactElement {
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
        href: getMappingLink(),
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-primary underline font-medium mt-1',
      },
      'Open mapping ↗',
    ),
  )
}

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function getMappingLink(): string {
  return `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(WS_URL)}#/extrinsics`
}