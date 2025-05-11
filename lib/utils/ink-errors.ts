import React from 'react'

import { decodeDispatchError } from '@/lib/utils'
import { renderAccountMappingToast } from './account-mapping'

/* -------------------------------------------------------------------------- */
/*                          I N K   E R R O R   P A R S E R                   */
/* -------------------------------------------------------------------------- */

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

  /* If decodeDispatchError already returned a React element, use it directly */
  if (React.isValidElement(decoded)) {
    return decoded
  }

  /* Unmapped account not caught earlier — ensure rich toast */
  if (/accountunmapped/i.test(raw) || /accountunmapped/i.test(String(decoded))) {
    return renderAccountMappingToast()
  }

  /* Anything else decoded successfully as string */
  if (typeof decoded === 'string' && decoded !== 'Module error') return decoded

  return raw
}