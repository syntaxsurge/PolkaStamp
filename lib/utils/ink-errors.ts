import { decodeDispatchError } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                          I N K   E R R O R   P A R S E R                   */
/* -------------------------------------------------------------------------- */

/**
 * Map Ink! SDK errors to concise human-readable strings suitable for toast.error().
 * All rich-UI handling (e.g. unmapped-account instructions) is triggered
 * internally by `decodeDispatchError`, so this function never returns JSX.
 */
export function parseInkError(err: unknown): string {
  /* ---------------------------------------------------------------------- */
  /*                      S T R U C T U R E D   P A Y M E N T                */
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
  /*               G E N E R I C   I N S U F F I C I E N T   F U N D S       */
  /* ---------------------------------------------------------------------- */
  const raw =
    typeof err === 'string' ? err : err instanceof Error ? err.message : JSON.stringify(err ?? '')
  if (/Payment/i.test(raw) || /InsufficientBalance/i.test(raw)) {
    return 'Insufficient balance to pay for gas. Please deposit some tokens and retry.'
  }

  /* ---------------------------------------------------------------------- */
  /*                  D I S P A T C H   E R R O R   D E C O D E              */
  /* ---------------------------------------------------------------------- */
  const decoded = decodeDispatchError(err)
  return decoded
}