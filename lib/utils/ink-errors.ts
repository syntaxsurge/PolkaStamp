import { decodeDispatchError, prettify } from '@/lib/utils'
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
 *   instructions only when they are actually returned by the chain.
 * - Falls back to the improved `decodeDispatchError` helper and finally to a
 *   prettified string representation for unknown cases.
 */
export function parseInkError(err: unknown): string {
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
  /*                    D I S P A T C H   E R R O R   C O D E                */
  /* ---------------------------------------------------------------------- */
  const decoded = decodeDispatchError(err)

  /* Newline guidance for unmapped accounts received from Revive pallet */
  if (
    decoded.toLowerCase().includes('revive') &&
    decoded.toLowerCase().includes('accountunmapped')
  ) {
    const mappingLink = `https://polkadot.js.org/apps/?rpc=${WS_URL}#/extrinsics`
    return [
      decoded,
      'Your account is not yet mapped on the local chain.',
      `Open Polkadot.js Apps at ${mappingLink} → revive → mapAccount() → Submit the transaction, then retry.`,
    ].join('\n')
  }

  if (decoded && decoded !== 'Module error') return prettify(decoded)

  /* ---------------------------------------------------------------------- */
  /*                                F A L L B A C K                          */
  /* ---------------------------------------------------------------------- */
  return prettify(raw)
}