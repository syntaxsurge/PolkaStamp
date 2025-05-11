/**
 * Canonical step-by-step guide for mapping an account on the local chain.
 * Shared by both plain-text error decoding and rich React toast rendering.
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
 * Build a plain-text block suitable for consoles, logs or any
 * renderer that cannot interpret HTML/JSX.
 */
export function buildAccountMappingInstructions(): string {
  return [
    'Your account is not yet mapped on the local chain.',
    ...ACCOUNT_MAPPING_GUIDE_STEPS,
  ].join('\n')
}